import {APIRequestContext, APIResponse} from '@playwright/test';
import {ApiClient} from './api-clients';

export class VendorIngestionClient {
    private apiClient: ApiClient;

    constructor(request: APIRequestContext) {
        this.apiClient = new ApiClient(request);
    }

    async submitBatch(payload: unknown): Promise<APIResponse> {
        return this.apiClient.post(
            `${process.env.API_BASE_URL}/pathway-events`,
            payload,
            {
                'Content-Type': 'application/fhir+json',
                'x-api-key': process.env.VENDOR_API_KEY ?? '',
            }
        );
    }
}