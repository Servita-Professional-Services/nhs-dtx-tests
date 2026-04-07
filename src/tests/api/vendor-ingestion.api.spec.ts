import {test, expect} from '@playwright/test';
import {VendorIngestionClient} from '../../api/clients/vendor-ingestion.client';
import {validVendorBatchPayload} from '../../test-data/api/vendor-batch-payloads';

test.describe('Vendor Ingestion API', () => {

    test('accepts valid batch payload', async ({request}) => {
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

});
