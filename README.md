# NHS DTx - Test Automation Project

## Overview

This repository contains initial test automation for the NHS Digital Therapeutics (DTx) project.

The repository is designed to support End-to-End (E2E), API, and performance testing using Playwright and k6. 

The current implementation focuses on Playwright-based E2E automation to validate core user journeys, with API and performance testing to be introduced incrementally.

## Tech Stack

* **Playwright (TypeScript)** – E2E/UI test automation
* **Node.js** – Runtime environment

## Prerequisites

Ensure the following are installed:

* Node.js (v18+ recommended)
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

### Install dependencies

```bash
npm install
```

### Run all tests

```bash
npm run test
```

### Run E2E tests

```bash
npm run test:e2e
```

### Run by tag

```bash
npx playwright test --grep @smoke
```

### Run in headed mode

```bash
npm run test:e2e --headed
```

### Run in debug mode

```bash
npm run test:e2e --debug
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

The framework is currently minimal and focused on:

* E2E test flows (login → HealthStore)
* Page Object Model (POM) structure
* Clean and maintainable test design

Refer to:

* [Playwright Test Implementation](docs/technical/playwright/PLAYWRIGHT-TEST-IMPLEMENTATION.md)


### 4. Playwright Test Execution

Detailed execution options:

* [Playwright Test Execution](docs/setup/playwright/PLAYWRIGHT-EXECUTION.md)


## Environment Configuration

Environment-specific configuration is stored in:

```text
env/.env.dev
```

### Example

```env
BASE_URL=https://dev.example.com
API_URL=https://dev.api.example.com
```

### Set environment (optional)

```bash
export TEST_ENV=dev
```

### 5. Playwright CI Configuration

GitHub Actions pipelines are configured for:

* **PR Pipeline** – runs smoke tests on pull requests
* **Main Branch Pipeline** – scheduled and manual runs


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
