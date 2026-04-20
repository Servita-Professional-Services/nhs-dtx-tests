import {APIRequestContext, APIResponse} from '@playwright/test';
import {ApiClient} from './api-clients';

interface VendorIngestionClientOptions {
    apiKey?: string;
    omitApiKey?: boolean;
    correlationId?: string;
    omitCorrelationId?: boolean;
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
            const key = this.options.apiKey ?? process.env.VENDOR_API_KEY;
            if (!key) {
                throw new Error('VENDOR_API_KEY is not set and no apiKey option was provided');
            }
            headers['x-api-key'] = key;
        }

        if (!this.options.omitCorrelationId) {
            headers['X-Correlation-Id'] = this.options.correlationId ?? crypto.randomUUID();
        }

        return this.apiClient.post(
            `/pathway-events`,
            payload,
            headers,
        );
    }
}