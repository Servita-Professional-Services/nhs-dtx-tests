export const prescribeScenarios = {
    happyPath: {
        ubrn: '000000070001',
        nhsNumber: '9912003888',
        expectedStatus: 202,
        reportLabel: 'Unattended prescribe happy path',
    },

    cancelledReferral: {
        ubrn: '000000070002',
        nhsNumber: '9912003888',
        expectedStatus: 422,
        reportLabel: 'Cancelled referral',
    },

    nhsMismatch: {
        ubrn: '000000070003',
        nhsNumber: '9912003888',
        expectedStatus: 422,
        reportLabel: 'NHS number mismatch',
    },

    upstreamDown: {
        ubrn: '000000070004',
        nhsNumber: '9912003888',
        expectedStatus: 503,
        reportLabel: 'Upstream unavailable',
    },

    notFound: {
        ubrn: '000000079999',
        nhsNumber: '9912003888',
        expectedStatus: 404,
        reportLabel: 'Referral not found',
    },
} as const;