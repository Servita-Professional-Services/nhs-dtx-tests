# NHS DTx – Playwright Test Implementation

---

# 1. Purpose

This document describes the automated test framework used for the NHS Digital Therapeutics (DTx) platform.

The framework validates:

* API behaviour and contract compliance
* End-to-End (E2E) user workflows
* Performance characteristics
* Environment stability across Dev, QA, Staging, and Beta

The architecture is modular, maintainable, and designed for long-term scalability.

---

# 2. Test Architecture Overview

The framework is structured around four pillars:

1. **API Validation**
2. **UI / E2E Automation**
3. **Schema Contract Enforcement**
4. **Tagged & Environment-Based Execution**

Execution is environment-agnostic and controlled via configuration variables.

---

# 3. Project Structure

```
nhs-dtx-tests/
│
├── .github/                  # CI workflows
├── docs/                     # Documentation & governance artefacts
├── env/                      # Environment configs
├── resources/                # Static test data
│
├── src/
│   ├── config/               # Centralised environment configuration
│   ├── libraries/            # Helpers & reusable utilities
│   ├── pages/                # Page Object Model classes
│   ├── schemas/              # JSON schemas for API validation
│   └── tests/
│       ├── api/              # API tests
│       ├── e2e/              # End-to-End journeys
│       └── performance/      # Performance tests
│
├── reports/
├── playwright-report/
├── test-results/
│
├── Dockerfile
├── dockerised-test-run.sh
├── playwright.config.ts
└── README.md
```

This structure enforces separation of concerns and clean scalability.

---

# 4. Environment Configuration

All environment switching is controlled via environment variables.

Example:

```
DTX_API_BASE_URL
DTX_UI_BASE_URL
DTX_USERNAME
DTX_PASSWORD
```

Optional improvement:

`src/config/env.ts`

```ts
export const config = {
  apiBaseUrl: process.env.DTX_API_BASE_URL!,
  uiBaseUrl: process.env.DTX_UI_BASE_URL!,
  username: process.env.DTX_USERNAME!,
  password: process.env.DTX_PASSWORD!,
};
```

This ensures:

* No hardcoded URLs
* No environment-specific logic inside tests
* Easy switching between QA → Beta → Production-like

---

# 5. API Testing Implementation

Location:

```
src/tests/api/
```

## 5.1 API Coverage Includes

* Status code validation
* Required headers validation
* Negative and positive scenarios
* Response payload structure
* Schema validation
* Error object validation
* Correlation ID handling

---

## 5.2 API Test Example

```typescript
import { test, expect } from '@playwright/test';
import { runApiTestCase } from '@libs/api-test-helper';

test('@DTX-API-001 @api @smoke Invalid Patient Identifier', async () => {

  await runApiTestCase({
    endpoint: `/patients?identifier=invalid`,
    schemaPath: 'src/schemas/operation-outcome-schema.json',
    testId: 'DTX-API-001',
    assertions: (data) => {
      expect(data.resourceType).toBe("OperationOutcome");
      expect(data.issue[0].severity).toBe("error");
    },
  });
});
```

---

# 6. API Helper Pattern

Centralised helper ensures consistency.

`src/libraries/api-test-helper.ts`

Responsibilities:

* Inject correlation ID (auto-generate if missing)
* Execute request
* Validate schema (AJV)
* Store response artifact
* Execute custom assertions
* Standardise error handling

Example structure:

```typescript
export async function runApiTestCase({
  endpoint,
  schemaPath,
  testId,
  assertions,
}: {
  endpoint: string;
  schemaPath?: string;
  testId: string;
  assertions: (data: any) => void;
}) {
  const response = await request.get(endpoint);

  if (schemaPath) {
    validateSchema(response.data, schemaPath);
  }

  writeArtifact(`test-results/api/${testId}.json`, response.data);

  assertions(response.data);
}
```

This reduces duplication and enforces consistency.

---

# 7. Schema Validation Strategy

Schemas are stored in:

```
src/schemas/
```

Validation uses AJV.

Purpose:

* Enforce API contract stability
* Detect breaking changes early
* Gate CI failures
* Provide audit traceability

If schema validation fails, execution stops and logs structured errors.

---

# 8. End-to-End (E2E) Implementation

Location:

```
src/tests/e2e/
```

## 8.1 E2E Coverage Includes

* Authentication flows
* Critical user journeys
* Role-based behaviour
* Alert visibility
* UI validation messages
* Cross-service interaction

---

# 9. Page Object Model (POM)

Location:

```
src/pages/
```

Each UI screen is abstracted into a class.

Example:

```typescript
import { Page, Locator } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}

  usernameInput: Locator = this.page.getByTestId('username');
  passwordInput: Locator = this.page.getByTestId('password');
  loginButton: Locator = this.page.getByRole('button', { name: 'Login' });

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}
```

Benefits:

* UI abstraction
* Maintainability
* Reusability
* Reduced duplication
* Clean test logic
---

# 10. Tagging Strategy

Simple and transparent tagging approach:

Examples:

```
@api
@e2e
@performance
@smoke
@DTX-API-001
```

Execution examples:

```
npx playwright test --grep @smoke
npx playwright test --grep @api
npx playwright test --grep @DTX-API-001
```

No complex configuration objects required.

---

# 11. Cross-Browser Readiness

Configured in `playwright.config.ts`:

```ts
projects: [
  { name: 'chromium', use: { browserName: 'chromium' } },
  { name: 'firefox', use: { browserName: 'firefox' } },
  { name: 'webkit', use: { browserName: 'webkit' } },
]
```

Can be enabled when required via CI matrix.

---

# 12. CI/CD Integration

CI workflow supports:

* Tagged execution
* Smoke-only runs on PR
* Full regression on main branch
* Artifact retention
* HTML report publishing

Reports stored in:

```
playwright-report/
test-results/
```

---

# 13. Dockerised Execution

Ensures consistent execution across environments.

Run:

```bash
./dockerised-test-run.sh
```

Or:

```bash
docker build -t nhs-dtx-tests .
docker run nhs-dtx-tests
```

---

# 14. Governance & Traceability

The framework provides:

* Unique Test IDs
* Response artifact storage
* Schema validation logs
* CI execution evidence
* Structured documentation

This supports:

* Requirement traceability
* Contract assurance
* Audit readiness
* Controlled test execution

---

# Final Summary

The NHS DTx Playwright framework is:

* Modular
* Environment-neutral
* Contract-enforcing
* CI-ready
* Dockerised
* Scalable
* Maintainable
* Governance-aligned

It supports structured execution across multiple environments without architectural changes.
