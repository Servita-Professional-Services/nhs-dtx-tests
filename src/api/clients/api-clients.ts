import {APIRequestContext, APIResponse} from '@playwright/test';

export class ApiClient {
    constructor(private request: APIRequestContext) {
    }

    async post(
        url: string,
        data?: unknown,
        headers?: Record<string, string>
    ): Promise<APIResponse> {
        return this.request.post(url, {
            data,
            headers,
        });
    }
}