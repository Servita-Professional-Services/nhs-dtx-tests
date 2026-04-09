import {test, expect} from '@playwright/test';
import {VendorIngestionClient} from '../../api/clients/vendor-ingestion.client';
import {validVendorBatchPayload} from '../../test-data/api/vendor-batch-payloads';

test.describe('Vendor Ingestion API', () => {

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
        expect(body.issue[0].diagnostics).toBe('Stub response');
    });

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
                    code: expect.any(String),
                }),
            ]),
        });
    });

});