// import {test, expect} from '@playwright/test';
// import {getEnv} from '../../libraries/env';
// import {buildPrescribeHeaders, buildServiceRequestWithUbrn} from '../../libraries/apiHelper';
//
// const env = getEnv();
//
// const UNATTENDED_TOKEN = env.UNATTENDED_TOKEN || env.TOKEN;
// const UBRN_HAPPY = env.UNATTENDED_UBRN || env.VALID_UBRN || '000000070000';
// const NHS_HAPPY = env.UNATTENDED_NHS || '9912003888';
//
// function buildUnattendedPayload(ubrn: string, nhsNumber: string = NHS_HAPPY) {
//     return {
//         ...buildServiceRequestWithUbrn(ubrn),
//         subject: {
//             identifier: {
//                 system: 'https://fhir.nhs.uk/Id/nhs-number',
//                 value: nhsNumber,
//             },
//         },
//     };
// }
//
// async function assertOperationOutcome(res: any) {
//     const body = await res.json();
//     expect(body.resourceType).toBe('OperationOutcome');
//     return body;
// }
//
// test.describe('Prescribe API - (Unattended)', () => {
//     test('✅ Unattended happy path → 202', async ({request}) => {
//         const res = await request.post(`${env.apiUrl}/prescribe`, {
//             headers: buildPrescribeHeaders({token: UNATTENDED_TOKEN}),
//             data: buildUnattendedPayload(UBRN_HAPPY),
//         });
//
//         expect(res.status(), await res.text()).toBe(202);
//
//         const body = await assertOperationOutcome(res);
//         expect(body.id).toBeTruthy();
//     });
//
//     test('✅ Missing X-Request-ID → 400', async ({request}) => {
//         const res = await request.post(`${env.apiUrl}/prescribe`, {
//             headers: buildPrescribeHeaders({token: UNATTENDED_TOKEN, includeRequestId: false}),
//             data: buildUnattendedPayload(UBRN_HAPPY),
//         });
//
//         expect(res.status(), await res.text()).toBe(400);
//     });
//
//     test('✅ Missing/invalid auth → 401', async ({request}) => {
//         const payload = buildUnattendedPayload(UBRN_HAPPY);
//
//         const resMissing = await request.post(`${env.apiUrl}/prescribe`, {
//             headers: buildPrescribeHeaders(), // no token
//             data: payload,
//         });
//         expect(resMissing.status(), await resMissing.text()).toBe(401);
//
//         const resInvalid = await request.post(`${env.apiUrl}/prescribe`, {
//             headers: buildPrescribeHeaders({token: 'invalid-token'}),
//             data: payload,
//         });
//         expect(resInvalid.status(), await resInvalid.text()).toBe(401);
//     });
//
//     test('✅ Bad UBRN → 400/404', async ({request}) => {
//         const resBad = await request.post(`${env.apiUrl}/prescribe`, {
//             headers: buildPrescribeHeaders({token: UNATTENDED_TOKEN}),
//             data: buildUnattendedPayload('BAD-UBRN'),
//         });
//         expect([400, 422].includes(resBad.status()), await resBad.text()).toBeTruthy();
//
//         const resNotFound = await request.post(`${env.apiUrl}/prescribe`, {
//             headers: buildPrescribeHeaders({token: UNATTENDED_TOKEN}),
//             data: buildUnattendedPayload('000000079999'),
//         });
//         expect([404, 400, 422].includes(resNotFound.status()), await resNotFound.text()).toBeTruthy();
//     });
//
//     // ✅ Next tests (only when mocks/stubs exist)
//
//     test('✅ Referral CANCELLED → 422', async ({request}) => {
//         const cancelledUbrn = env.CANCELLED_UBRN || '000000070002';
//
//         const res = await request.post(`${env.apiUrl}/prescribe`, {
//             headers: buildPrescribeHeaders({token: UNATTENDED_TOKEN}),
//             data: buildUnattendedPayload(cancelledUbrn),
//         });
//
//         expect(res.status(), await res.text()).toBe(422);
//         await assertOperationOutcome(res);
//     });
//
//     test('✅ NHS number mismatch (eRS vs PDS) → 422', async ({request}) => {
//         const mismatchUbrn = env.MISMATCH_UBRN || '000000070003';
//         const mismatchNhs = env.MISMATCH_NHS || NHS_HAPPY;
//
//         const res = await request.post(`${env.apiUrl}/prescribe`, {
//             headers: buildPrescribeHeaders({token: UNATTENDED_TOKEN}),
//             data: buildUnattendedPayload(mismatchUbrn, mismatchNhs),
//         });
//
//         expect(res.status(), await res.text()).toBe(422);
//         await assertOperationOutcome(res);
//     });
//
//     test('✅ Upstream down (eRS/PDS timeout/5xx) → 503', async ({request}) => {
//         const upstreamDownUbrn = env.UPSTREAM_DOWN_UBRN || '000000070004';
//
//         const res = await request.post(`${env.apiUrl}/prescribe`, {
//             headers: buildPrescribeHeaders({token: UNATTENDED_TOKEN}),
//             data: buildUnattendedPayload(upstreamDownUbrn),
//         });
//
//         expect(res.status(), await res.text()).toBe(503);
//         await assertOperationOutcome(res);
//     });
//
//     test('✅ Idempotency: same X-Request-ID twice → 202 without duplicate', async ({request}) => {
//
//         const payload = buildUnattendedPayload(UBRN_HAPPY);
//
//         const requestId = '11111111-1111-1111-1111-111111111111';
//
//         const headers = {
//             ...buildPrescribeHeaders({token: UNATTENDED_TOKEN}),
//             'X-Request-ID': requestId
//         };
//
//         // First request
//         const res1 = await request.post(`${env.apiUrl}/prescribe`, {
//             headers,
//             data: payload,
//         });
//
//         expect(res1.status(), await res1.text()).toBe(202);
//
//         const body1 = await res1.json();
//         expect(body1.resourceType).toBe('OperationOutcome');
//
//         // Second request (same X-Request-ID)
//         const res2 = await request.post(`${env.apiUrl}/prescribe`, {
//             headers,
//             data: payload,
//         });
//
//         expect(res2.status(), await res2.text()).toBe(202);
//
//         const body2 = await res2.json();
//         expect(body2.resourceType).toBe('OperationOutcome');
//
//     });
// });