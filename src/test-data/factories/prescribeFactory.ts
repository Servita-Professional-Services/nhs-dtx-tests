export function createPrescribePayload(ubrn: string, nhsNumber: string) {
    return {
        resourceType: 'ServiceRequest',
        identifier: [
            {
                system: 'https://fhir.nhs.uk/Id/UBRN',
                value: ubrn,
            },
        ],
        subject: {
            identifier: {
                system: 'https://fhir.nhs.uk/Id/nhs-number',
                value: nhsNumber,
            },
        },
        status: 'active',
        intent: 'order',
    };
}