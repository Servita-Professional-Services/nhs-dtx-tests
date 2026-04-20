import {test, expect} from '@playwright/test';
import {VendorIngestionClient} from '../../api/clients/vendor-ingestion.client';
import {validVendorBatchPayload} from '../../test-data/api/vendor-batch-payloads';
import {getBatchByCorrelationId} from '../../api/clients/dynamodb.client';

test.describe('Vendor Ingestion API', () => {

    test.describe('happy path', () => {

        test('@DTX-API-001 accepts valid batch payload', async ({request}) => {
            const client = new VendorIngestionClient(request);

            const response = await client.submitBatch(validVendorBatchPayload);
            const body = await response.json();

            expect(response.status()).toBe(201);
            expect(body.resourceType).toBe('OperationOutcome');
            expect(body.issue).toBeDefined();
            expect(body.issue).toHaveLength(1);
            expect(body.issue[0].severity).toBe('information');
            expect(body.issue[0].code).toBe('informational');
            expect(body.issue[0].diagnostics).toBe('Batch accepted');
        });

    });

    test.describe('auth', () => {

        test('@DTX-API-002 returns 403 when api key is missing', async ({request}) => {
            const client = new VendorIngestionClient(request, {omitApiKey: true});

            const response = await client.submitBatch(validVendorBatchPayload);

            expect(response.status()).toBe(403);
        });

        test('@DTX-API-003 returns 403 when api key is invalid', async ({request}) => {
            const client = new VendorIngestionClient(request, {apiKey: 'invalid-key-000'});

            const response = await client.submitBatch(validVendorBatchPayload);

            expect(response.status()).toBe(403);
        });

    });

    test.describe('response contract', () => {

        test('@DTX-API-004 response contains valid OperationOutcome structure', async ({request}) => {
            const client = new VendorIngestionClient(request);

            const response = await client.submitBatch(validVendorBatchPayload);
            const body = await response.json();

            expect(response.status()).toBe(201);
            expect(body).toMatchObject({
                resourceType: 'OperationOutcome',
                issue: expect.arrayContaining([
                    expect.objectContaining({
                        severity: expect.stringMatching(/^(fatal|error|warning|information)$/),
                        code: expect.stringMatching(/^(required|value|structure|exception|informational)$/),
                    }),
                ]),
            });
        });

        test('@DTX-API-005 response contains request ID header', async ({request}) => {
            const client = new VendorIngestionClient(request);
            const response = await client.submitBatch(validVendorBatchPayload);

            expect(response.status()).toBe(201);
            expect(response.headers()['x-amzn-requestid']).toBeDefined();
        });

    });

    test.describe('correlation ID', () => {

        test('@DTX-API-006 accepts valid UUID correlation ID', async ({request}) => {
            const client = new VendorIngestionClient(request, {
                correlationId: '550e8400-e29b-41d4-a716-446655440000',
            });
            const response = await client.submitBatch(validVendorBatchPayload);

            expect(response.status()).toBe(201);
        });

        test('@DTX-API-007 returns 400 when correlation ID is missing', async ({request}) => {
            const client = new VendorIngestionClient(request, {omitCorrelationId: true});
            const response = await client.submitBatch(validVendorBatchPayload);
            const body = await response.json();

            expect(response.status()).toBe(400);
            expect(body.resourceType).toBe('OperationOutcome');
            expect(body.issue[0].severity).toBe('error');
            expect(body.issue[0].code).toMatch(/^(required|value|structure|exception)$/);
        });

        test('@DTX-API-008 returns 400 when correlation ID is not a valid UUID', async ({request}) => {
            const client = new VendorIngestionClient(request, {correlationId: 'not-a-uuid'});
            const response = await client.submitBatch(validVendorBatchPayload);
            const body = await response.json();

            expect(response.status()).toBe(400);
            expect(body.resourceType).toBe('OperationOutcome');
            expect(body.issue[0].severity).toBe('error');
            expect(body.issue[0].code).toMatch(/^(required|value|structure|exception|informational)$/);
        });

    });

    test.describe('payload validation', () => {

        test('@DTX-API-009 returns 400 when body is missing', async ({request}) => {
            const client = new VendorIngestionClient(request);
            const response = await client.submitBatch(null);
            const body = await response.json();

            expect(response.status()).toBe(400);
            expect(body.resourceType).toBe('OperationOutcome');
            expect(body.issue[0].severity).toBe('error');
            expect(body.issue[0].code).toMatch(/^(required|value|structure|exception|informational)$/);
        });

        test('@DTX-API-010 returns 400 when resourceType is not Bundle', async ({request}) => {
            const client = new VendorIngestionClient(request);
            const response = await client.submitBatch({
                resourceType: 'Patient',
                type: 'transaction',
                entry: [{}],
            });
            const body = await response.json();

            expect(response.status()).toBe(400);
            expect(body.resourceType).toBe('OperationOutcome');
            expect(body.issue[0].severity).toBe('error');
            expect(body.issue[0].code).toBe('value');
            expect(body.issue[0].diagnostics).toBe("Bundle.resourceType must be 'Bundle'");
            expect(body.issue[0].expression).toContain('Bundle.resourceType');
        });

        test('@DTX-API-011 returns 400 when entry array is empty', async ({request}) => {
            const client = new VendorIngestionClient(request);
            const response = await client.submitBatch({
                resourceType: 'Bundle',
                type: 'transaction',
                entry: [],
            });
            const body = await response.json();

            expect(response.status()).toBe(400);
            expect(body.resourceType).toBe('OperationOutcome');
            expect(body.issue[0].severity).toBe('error');
            expect(body.issue[0].code).toMatch(/^(required|value|structure|exception|informational)$/);
        });

        test('@DTX-API-012 returns 400 when bundle type is not transaction', async ({request}) => {
            const client = new VendorIngestionClient(request);
            const response = await client.submitBatch({
                resourceType: 'Bundle',
                type: 'batch',
                entry: [{}],
            });
            const body = await response.json();

            expect(response.status()).toBe(400);
            expect(body.resourceType).toBe('OperationOutcome');
            expect(body.issue[0].severity).toBe('error');
            expect(body.issue[0].code).toBe('value');
        });

        test('@DTX-API-013 returns 400 when all required bundle fields are missing', async ({request}) => {
            const client = new VendorIngestionClient(request);
            const response = await client.submitBatch({});
            const body = await response.json();

            expect(response.status()).toBe(400);
            expect(body.resourceType).toBe('OperationOutcome');
            expect(body.issue[0].severity).toBe('error');
            expect(body.issue[0].code).toMatch(/^(required|value|structure|exception|informational)$/);
        });

    });

    test.describe('database persistence', () => {

        test('@DTX-API-014 persists batch with correct correlation ID @local', async ({request}) => {

            const correlationId = crypto.randomUUID();
            const client = new VendorIngestionClient(request, {correlationId});

            const response = await client.submitBatch(validVendorBatchPayload);
            expect(response.status()).toBe(201);

            const record = await getBatchByCorrelationId(correlationId);
            expect(record).not.toBeNull();

            expect(record!.correlationId).toBe(correlationId);

            expect(typeof record!.receivedAt).toBe('string');
            expect(new Date(record!.receivedAt as string).toISOString()).toBe(record!.receivedAt);

            const batchData = JSON.parse(record!.batchData as string);
            expect(batchData.resourceType).toBe('Bundle');
            expect(batchData.type).toBe('transaction');
            expect(batchData.entry).toHaveLength(validVendorBatchPayload.entry.length);
            expect(batchData.entry[0].fullUrl).toBe(validVendorBatchPayload.entry[0].fullUrl);
            expect(batchData.entry[0].resource.resourceType).toBe('Observation');
            expect(batchData.entry[0].resource.status).toBe('final');
            expect(batchData.entry[0].request.method).toBe('POST');
            expect(batchData.entry[0].request.url).toBe('Observation');
        });
    });

});