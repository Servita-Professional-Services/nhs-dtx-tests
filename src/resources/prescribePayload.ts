export const prescribePayload = {
    resourceType: "ServiceRequest",
    identifier: [
        {
            system: "https://fhir.nhs.uk/Id/UBRN",
            value: "000000070000"
        }
    ],
    status: "active",
    intent: "order"
};