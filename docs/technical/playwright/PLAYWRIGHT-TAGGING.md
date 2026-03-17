# DTx Test Tagging Mechanism

## 1. Overview

This document describes the tagging and test identification strategy used in the **DTx Playwright automation framework**.

The tagging mechanism allows tests to be grouped and executed selectively using **Playwright's built-in tagging and filtering capabilities**.

This approach enables:

* Controlled execution of test groups
* Flexible CI/CD pipelines
* Selective test runs (API, UI, E2E, smoke, regression)
* Easier debugging and isolation of failures
* Clear traceability of automated tests

Tags are added directly to the **test title**, making them easy to filter using Playwright CLI options.

---

# 2. Purpose of the Tagging Strategy

The tagging mechanism is designed to:

* Enable execution of specific test categories (API, UI, E2E)
* Control which tests run in different environments (local, CI, Alpha, Beta)
* Reduce CI runtime by running only required test groups
* Provide structured test categorisation
* Support targeted debugging using unique test identifiers
* Improve traceability between automated tests and requirements

---

# 3. Tag Categories

The DTx automation framework uses a **small set of consistent tags** to categorise tests.

| Tag           | Purpose                                |
| ------------- | -------------------------------------- |
| `@api`        | API and integration tests              |
| `@ui`         | UI level tests                         |
| `@e2e`        | End-to-end system tests                |
| `@smoke`      | Critical validation tests              |
| `@regression` | Full regression test suite             |
| `@negative`   | Negative/error scenarios               |
| `@security`   | Authentication and authorization tests |

This structure keeps tagging **simple, readable, and maintainable**.

---

# 4. Mandatory Test ID Convention

Every automated test **must include a unique Test ID** at the beginning of the test name.

This ensures:

* Traceability to requirements and RTM
* Easier debugging
* CI pipeline filtering
* Clear reporting for governance and audit

### Example Test IDs

```
@DTX-API-001
@DTX-UI-010
@DTX-E2E-005
```

---

# 5. Example Test Structure

Example API test:

```ts
test('@DTX-API-001 - Unattended prescribe happy path @api @smoke', async ({ request }) => {
    // test logic
});
```

Example UI test:

```ts
test('@DTX-UI-010 - Patient login via NHS Login @ui @smoke', async ({ page }) => {
    // test logic
});
```

Example end-to-end test:

```ts
test('@DTX-E2E-005 - COPD patient referral to DTx activation flow @e2e @regression', async ({ page }) => {
    // test logic
});
```

This structure provides:

* Clear behavioural description
* Unique test identifier
* Tag-based grouping for execution

---

# 6. Running Tagged Tests

Playwright allows tests to be filtered using the `--grep` option.

### Run smoke tests

```
npx playwright test --grep @smoke
```

### Run API tests

```
npx playwright test --grep @api
```

### Run UI tests

```
npx playwright test --grep @ui
```

### Run E2E tests

```
npx playwright test --grep @e2e
```

### Run a specific test

```
npx playwright test --grep DTX-API-001
```

---

# 7. CI/CD Integration

The tagging strategy enables flexible CI pipelines.

Example pipeline stages:

| Pipeline Stage       | Tests Executed   |
| -------------------- | ---------------- |
| PR validation        | Smoke tests      |
| Integration pipeline | API tests        |
| Nightly build        | Regression suite |
| Release validation   | Full E2E suite   |

Example CI command:

```
npx playwright test --grep @smoke
```

---

# 8. Reporting

Test results are generated automatically using **Playwright HTML reports**.

Reports provide:

* Test case execution status
* Error messages
* Screenshots on failure
* Trace files
* Video recordings for failed tests

Additional reporting tools such as **Allure or Testmo** may be integrated later for enhanced business-readable reporting.

---

# 9. Benefits for the DTx Project

This tagging strategy provides:

* Clear test categorisation
* Reduced CI runtime
* Improved traceability
* Structured test execution
* Easy debugging and failure isolation
* Scalable automation as the project moves from **Alpha → Beta → Production**

---

# 10. Summary

The DTx tagging strategy uses **consistent test IDs and lightweight Playwright tags** to manage automated test execution.

This ensures:

* Controlled test execution
* Flexible CI filtering
* Clear governance traceability
* Maintainable and scalable automation

The approach aligns with **Playwright best practices while supporting the governance and traceability requirements of the NHS DTx programme.**