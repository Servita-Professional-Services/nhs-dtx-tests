// import { test, expect, request } from '@playwright/test';
// import { getEnv } from '../../libraries/env';
// import { validateSchema } from '../../libraries/schemaValidator';
// import { getAuthHeaders } from '../../libraries/apiHelper';
//
// const env = getEnv();
//
// test.describe('@api DTx Contract Tests - Patient API', () => {
//
//     test('GET /patients/{id} - should match JSON schema', async () => {
//         const patientId = '12345';
//
//         // ✅ Create request context ignoring HTTPS errors (sandbox-friendly)
//         const apiContext = await request.newContext({
//             ignoreHTTPSErrors: true
//         });
//
//         // Call the API
//         const response = await apiContext.get(`${env.apiUrl}/patients/${patientId}`, {
//             headers: getAuthHeaders()
//         });
//
//         expect(response.status()).toBe(200);
//
//         const body = await response.json();
//
//         // ✅ Validate JSON api
//         const isValid = validateSchema('patient.schema.json', body);
//         expect(isValid).toBe(true);
//
//         await apiContext.dispose(); // cleanup
//     });
//
//     test('GET /health - service should be healthy', async () => {
//         const apiContext = await request.newContext({ ignoreHTTPSErrors: true });
//
//         const response = await apiContext.get(`${env.apiUrl}/health`);
//
//         expect(response.status()).toBe(200);
//
//         const body = await response.json();
//         expect(body).toHaveProperty('status');
//         expect(body.status).toBe('UP');
//
//         await apiContext.dispose();
//     });
//
// });
