# NHS DTx – Playwright Test Implementation

## 1. Purpose

This document describes the current automated test framework for the NHS Digital Therapeutics (DTx) platform.

At this stage, the framework focuses on validating:

* End-to-End (E2E) user workflows
* Basic UI behaviour (login → HealthStore navigation)
* Environment stability in local setup and AWS-hosted integration environment

The implementation is intentionally minimal and will evolve incrementally.

---

## 2. Test Architecture Overview

The current framework is focused on:

* UI / E2E Automation
* Simple tagging and execution

Future capabilities such as API validation, schema enforcement, and performance testing are planned but not yet implemented.

---

## 3. Project Structure

```text
nhs-dtx-tests/
│
├── .github/                  # CI workflows
├── docs/                     # Documentation
├── env/                      # Environment configs
├── src/
│   ├── libraries/            # Reusable helpers/utilities
│   ├── pages/                # Page Object Model (POM)
│   ├── test-data/            # Test users and data
│   └── tests/                # E2E tests (current focus)
│
├── playwright-report/        # HTML reports (generated)
├── test-results/             # Test artifacts (generated)
├── allure-report/            # Allure report (generated)
├── allure-results/           # Allure raw results (generated)
├── playwright.config.ts      # Playwright configuration
├── package.json              # Project dependencies
├── tsconfig.json             # TypeScript config
└── README.md
```

**Notes:**

* Current implementation focuses on **E2E tests only**
* Reporting folders are **generated artifacts (not source-controlled)**
* Structure is intentionally minimal and will expand as the framework evolves

---

## 4. Environment Configuration

Environment configuration is controlled via environment variables.

Example:

* BASE_URL
* TEST_ENV

This ensures:

* No hardcoded values
* Easy switching between environments
* Clean separation of config from tests

---

## 5. End-to-End (E2E) Implementation

**Location:**
`src/tests/`

### Current Coverage

* NHS Login flow (email, password, OTP)
* Navigation to HealthStore
* Basic UI validation

Example:

```ts
test('@DTX-E2E-001 - User login to HealthStore @e2e @smoke', async ({ page }) => {
  // test logic
});
```

---

## 6. Page Object Model (POM)

**Location:**
`src/pages/`

Each page contains only:

* Locators
* Actions

Example:

```ts
export class LoginPage {
  constructor(private page: Page) {}

  emailInput = this.page.getByRole('textbox', { name: 'Email address' });
  passwordInput = this.page.getByRole('textbox', { name: 'Password' });

  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
  }
}
```

Assertions are kept in test files.

---

## 7. Tagging Strategy

Simple and minimal tagging is used.

**Current tags:**

* @e2e
* @smoke
* @DTX-E2E-001

Run tests:

```bash
npx playwright test --grep @smoke
```

Tagging will expand as more test types are introduced.

---

## 8. CI/CD Integration

CI currently supports:

* Smoke test execution
* Basic reporting

Example:

```bash
npx playwright test --grep @smoke
```

This will expand as coverage increases.

---

## 9. Reporting

Playwright HTML reports are used.

Reports include:

* Test results
* Screenshots on failure
* Traces for debugging
* Video on failure
