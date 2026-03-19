## DTx Test Tagging Mechanism

### 1. Overview

This document describes the tagging and test identification strategy used in the DTx Playwright automation framework.

At the current stage, the framework is focused on **E2E testing only**, with a minimal and working implementation.

The tagging mechanism allows tests to be grouped and executed selectively using Playwright's built-in filtering capabilities.

This approach enables:

* Controlled execution of test groups
* Simple CI/CD filtering
* Selective test runs (currently E2E-focused)
* Easier debugging and isolation of failures
* Basic traceability of automated tests

Tags are added directly to the test title, making them easy to filter using Playwright CLI options.

---

### 2. Purpose of the Tagging Strategy

The tagging mechanism is currently designed to:

* Enable execution of E2E tests
* Control which tests run in local and CI environments
* Reduce CI runtime by running only required test groups
* Provide simple and consistent test categorisation
* Support debugging using unique test identifiers

This strategy will expand as more test types (API, UI, regression) are introduced.

---

### 3. Tag Categories

The DTx automation framework uses a small set of consistent tags to categorise tests.

| Tag         | Purpose                                      |
| ----------- | -------------------------------------------- |
| @api        | API and integration tests *(planned)*        |
| @ui         | UI level tests *(planned)*                   |
| @e2e        | End-to-end system tests *(currently in use)* |
| @smoke      | Critical validation tests                    |
| @regression | Full regression test suite *(planned)*       |

At this stage, only **E2E tests are implemented**, with tagging kept minimal.
Additional tags will be used as the framework evolves.

---

### 4. Mandatory Test ID Convention

Every automated test includes a unique Test ID at the beginning of the test name.

This ensures:

* Basic traceability
* Easier debugging
* Clear identification of test cases

Example Test IDs:

* @DTX-E2E-001

---

### 5. Example Test Structure

```ts
test('@DTX-E2E-001 - User login to HealthStore @e2e @smoke', async ({ page }) => {
    // test logic
});
```

This structure provides:

* Clear behavioural description
* Unique test identifier
* Tag-based grouping for execution

---

### 6. Running Tagged Tests

Playwright allows tests to be filtered using the `--grep` option.

Run E2E tests:

```bash
npx playwright test --grep @e2e
```

Run smoke tests:

```bash
npx playwright test --grep @smoke
```

Run a specific test:

```bash
npx playwright test --grep DTX-E2E-001
```

---

### 7. CI/CD Integration

Currently, CI focuses on minimal E2E validation.

Example pipeline stages:

| Pipeline Stage | Tests Executed |
| -------------- | -------------- |
| PR validation  | Smoke tests    |

Example CI command:

```bash
npx playwright test --grep @smoke
```

This will expand as more test coverage is added.

---

### 8. Reporting

Test results are generated using Playwright HTML reports.

Reports provide:

* Test execution status
* Error messages
* Screenshots on failure
* Trace files and videos

Additional reporting tools (e.g. Allure) may be integrated later.

---

### 9. Benefits for the DTx Project

This tagging strategy provides:

* Simple and maintainable setup
* Reduced CI runtime
* Clear test categorisation
* Easy debugging and failure isolation
* Scalable approach as the project evolves

---

### 10. Summary

The current DTx tagging strategy is intentionally minimal and focused on **working E2E tests only**.

This ensures:

* Controlled and reliable test execution
* Simple CI integration
* Clean and maintainable framework

