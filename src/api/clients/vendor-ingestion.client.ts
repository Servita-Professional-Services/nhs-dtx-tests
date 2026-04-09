import {APIRequestContext, APIResponse} from '@playwright/test';
import {ApiClient} from './api-clients';

interface VendorIngestionClientOptions {
    apiKey?: string;
    omitApiKey?: boolean;
}

export class VendorIngestionClient {
    private apiClient: ApiClient;
    private options: VendorIngestionClientOptions;

    constructor(request: APIRequestContext, options: VendorIngestionClientOptions = {}) {
        this.apiClient = new ApiClient(request);
        this.options = options;
    }

    async submitBatch(payload: unknown, extraHeaders: Record<string, string> = {}): Promise<APIResponse> {
        const headers: Record<string, string> = {
            'Content-Type': 'application/fhir+json',
            ...extraHeaders,
        };

        if (!this.options.omitApiKey) {
            headers['x-api-key'] = this.options.apiKey ?? process.env.VENDOR_API_KEY ?? '';
        }

        return this.apiClient.post(
            `${process.env.API_BASE_URL}/pathway-events`,
            payload,
            headers,
        );
    }
}