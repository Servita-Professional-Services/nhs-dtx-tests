import {randomUUID} from 'crypto';

export type PrescribeAuthMode = 'attended' | 'unattended';

export const buildServiceRequestWithUbrn = (ubrn: string) => ({
    resourceType: 'ServiceRequest',
    identifier: [{system: 'https://fhir.nhs.uk/Id/UBRN', value: ubrn}],
    status: 'active',
    intent: 'order',
});

export const buildPrescribeHeaders = (opts?: {
    token?: string;
    includeRequestId?: boolean;
    correlationId?: string;
}) => {
    const includeRequestId = opts?.includeRequestId ?? true;

    const headers: Record<string, string> = {
        'Content-Type': 'application/fhir+json',
    };

    // REQUIRED by OpenAPI
    if (includeRequestId) headers['X-Request-ID'] = randomUUID();

    // Optional trace header
    if (opts?.correlationId) headers['X-Correlation-ID'] = opts.correlationId;

    // Auth
    if (opts?.token) headers['Authorization'] = `Bearer ${opts.token}`;

    return headers;
};