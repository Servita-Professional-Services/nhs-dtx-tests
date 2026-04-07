export const validVendorBatchPayload = {
    resourceType: 'Bundle',
    type: 'transaction',
    entry: [
        {
            fullUrl: 'urn:uuid:observation-1',
            resource: {
                resourceType: 'Observation',
                status: 'final',
                code: {
                    text: 'Test observation',
                },
                subject: {
                    reference: 'Patient/test-patient-001',
                },
            },
            request: {
                method: 'POST',
                url: 'Observation',
            },
        },
    ],
};
