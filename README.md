
# NHS DTx Test Automation Repository

A centralized **Test Automation Mono-repository** designed to consolidate all test automation artefacts for the **NHS Digital Therapeutics (DTx)** project.

This repository leverages:

* **Playwright** with Node.js and TypeScript for comprehensive functional testing of backend and frontend components.
* **K6** (JavaScript + Go bindings) for performance and load testing to ensure system robustness and reliability.

---

## Universal Tools & Configuration (REQUIRED)

Before proceeding with any framework-specific setup, ensure you have completed the **universal configuration** for your operating system:

* [Universal macOS Configuration](docs/setup/UNIVERSAL-CONFIG-MAC.md)
* [Universal Windows Configuration](docs/setup/UNIVERSAL-CONFIG-WINDOWS.md)

---

## Playwright Tests

### 1. Playwright Setup and Configuration

To execute Playwright tests, follow the setup guides based on your OS:

* [Playwright macOS Setup & Configuration](docs/setup/playwright/PLAYWRIGHT-MAC-SETUP.md)
* [Playwright Windows Setup & Configuration](docs/setup/playwright/PLAYWRIGHT-WINDOWS-SETUP.md)

### 2. Playwright Tagging Mechanism

Understanding the **tagging mechanism** is essential for both local and CI environments. Refer to:

* [Playwright Tagging](docs/technical/playwright/PLAYWRIGHT-TAGGING.md)

This document explains how the tagging system works, and how you can modify or leverage it for your tests.

### 3. Playwright Test Implementation

For details on the **structure and implementation** of Playwright tests in this project, refer to:

* [Playwright Test Implementation](docs/technical/playwright/PLAYWRIGHT-TEST-IMPLEMENTATION.md)

### 4. Playwright Test Execution

To run Playwright tests via CLI, follow:

* [Playwright Test Execution](docs/setup/playwright/PLAYWRIGHT-EXECUTION.md)

### 5. Playwright CI Configuration

We currently have **four GitHub Actions YAML configurations** to execute Playwright tests in CI:

* **PR Pipeline** – runs tests against pull requests:
  [PR Check Test Pipeline](https://github.com/Servita-Professional-Services/dtx-tests/blob/main/.github/workflows/pr-check-test-jobs.yml)

* **Main Branch Pipeline** – triggers daily tests and allows manual triggers against the main branch:
  [Main Branch Test Pipeline](https://github.com/Servita-Professional-Services/dtx-tests/blob/main/.github/workflows/main-check-test-jobs.yml)

### 6. Playwright Test Report

After execution, Playwright generates a report directory:

```text
reports/playwright-report/playwright-report-${timestamp}/index.html
```

* `${timestamp}` is the execution timestamp.
* Open the `index.html` file in a browser to view detailed results.

---

## K6 Tests

### 1. K6 Setup and Configuration

To execute K6 performance tests:

* [K6 Setup & Configuration](docs/setup/k6/K6-SETUP.md)

### 2. K6 Test Script Implementation

For guidance on the **structure and implementation** of K6 scripts:

* [K6 Test Implementation](docs/technical/k6/K6-TEST-IMPLEMENTATION.md)

### 3. K6 Test Script Execution

To run K6 scripts locally:

* [K6 Test Execution](docs/setup/k6/K6-TEST-EXECUTION.md)

### 4. Postman to K6 Conversion

Convert Postman API collections to K6 scripts:

```bash
postman-to-k6 path/to/postman/collection.json -o path/to/output/script.js
k6 run path/to/output/script.js
```

* Replace paths with your actual collection and script file locations.

### 5. K6 Load Configurations

* [K6 Load Configurations](docs/technical/k6/K6-LOAD-CONFIGS.md) – predefined load profiles
* [Load Testing with Postman Collections](https://grafana.com/blog/2020/04/19/load-testing-your-api-with-postman/)

---

## Resources

* [Playwright Official Documentation](https://playwright.dev/docs/intro)
* [Dynamic Tagging in Playwright](https://medium.com/@mahtabnejad/how-dynamic-tagging-in-playwright-can-transform-your-test-automation-e97e968fae95)
* [Unified Test Automation Using Playwright](https://medium.com/@mahtabnejad/a-unified-approach-to-api-database-and-e2e-testing-with-playwright-daa900908333)
* [Playwright Plugins](https://mxschmitt.github.io/awesome-playwright/)
* [K6 Learn](https://github.com/grafana/K6-learn)
* [K6 Examples](https://k6.io/docs/examples/)
* [Load Testing Toolkit](https://github.com/aliesbelik/load-testing-toolkit)
* [Authenticating K6 Scripts via Playwright & Shell Scripting](https://medium.com/@mahtabnejad/automating-authentication-in-load-testing-with-playwright-shell-scripting-and-k6-149ec7ca0739)

---
