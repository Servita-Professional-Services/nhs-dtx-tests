# NHS DTx - Test Automation Project

## Overview

This repository contains test automation for the NHS Digital Therapeutics (DTx) project, covering E2E UI tests and API tests.

## Tech Stack

* **Playwright (TypeScript)** – E2E/UI and API test automation
* **Node.js** – Runtime environment
* **AJV** – JSON schema validation (API contract tests)

## Prerequisites

Ensure the following are installed:

* Node.js (v24 recommended)
* npm

## Universal Tools & Configuration (REQUIRED)

Before proceeding, ensure your environment is configured:

* [Universal macOS Configuration](docs/setup/UNIVERSAL-CONFIG-MAC.md)
* [Universal Windows Configuration](docs/setup/UNIVERSAL-CONFIG-WINDOWS.md)

### Install project dependencies
```bash
npm install
```

### Install Playwright browsers
```bash
npx playwright install
```

For fresh environments or CI:
```bash
npx playwright install --with-deps
```

## How to Run Tests

Run all commands from the root of the repository.

### Run all tests
```bash
npm run test
```

### Run in headed mode
```bash
npm run test:headed
```

### Run in debug mode
```bash
npm run test --debug
```

## Playwright Tests

### 1. Playwright Setup and Configuration

Follow setup guides based on your OS:

* [Playwright macOS Setup & Configuration](docs/setup/playwright/PLAYWRIGHT-MAC-SETUP.md)
* [Playwright Windows Setup & Configuration](docs/setup/playwright/PLAYWRIGHT-WINDOWS-SETUP.md)

### 2. Playwright Tagging Mechanism

Basic tagging is used for test execution and filtering.

Refer to:

* [Playwright Tagging](docs/technical/playwright/PLAYWRIGHT-TAGGING.md)

### 3. Playwright Test Implementation

The framework currently covers:

* E2E test flows (login → HealthStore)
* API tests (vendor ingestion endpoint)
* Page Object Model (POM) structure
* Clean and maintainable test design

Refer to:

* [Playwright Test Implementation](docs/technical/playwright/PLAYWRIGHT-TEST-IMPLEMENTATION.md)

### 4. Playwright Test Execution

Detailed execution options:

* [Playwright Test Execution](docs/setup/playwright/PLAYWRIGHT-EXECUTION.md)

### Run E2E tests only
```bash
npx playwright test --project=chromium
```

### Run API tests only
```bash
npx playwright test --project=api
```

## API Tests

API tests validate the vendor batch ingestion endpoint using Playwright's built-in `APIRequestContext`.

### Endpoint
```
POST /pathway-events
```

### What is tested

* Valid FHIR R4 Bundle payload returns expected response
* Invalid payloads are rejected with correct status codes

### API environment variables

Ensure the following are set in `env/.env.dev`:
```env
API_BASE_URL=https://your-api-gateway-url/dev
VENDOR_API_KEY=your-api-key-here
```

To retrieve the API key (requires AWS SSO):
```bash
aws sso login --profile your-profile
aws apigateway get-api-key --api-key <key-id> --include-value --query 'value' --output text --profile your-profile --region eu-west-2
```

## Environment Configuration

Environment-specific configuration is stored in:
```text
env/.env.dev
```

### Example
```env
BASE_URL=https://dev.example.com
API_BASE_URL=https://your-api-gateway-url/dev
VENDOR_API_KEY=your-api-key-here
```

### 5. Playwright CI Configuration

GitHub Actions pipelines are configured for:

* **PR Pipeline** – runs smoke tests on pull requests to main
* **Main Branch Pipeline** – runs on every push to main

## Test Reports

After execution, the following reports are generated:

### Playwright HTML Report (Debugging)
```text
playwright-report/index.html
```

### Allure Report (Primary CI Report)

Allure report is generated in CI and available as:

* **GitHub Pages (preferred)** – shareable stakeholder link
* **Artifact download** – open locally
```text
allure-report/index.html
```

## Resources

* [Playwright Official Documentation](https://playwright.dev/docs/intro)