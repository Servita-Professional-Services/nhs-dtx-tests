# NHS DTx - Test Automation Project

## Overview

This repository contains test automation for the NHS Digital Therapeutics (DTx) project, covering E2E UI tests and API tests.


## Tech Stack

| Tool | Purpose |
|---|---|
| **Playwright (TypeScript)** | E2E/UI and API test automation |
| **Node.js** | Runtime environment |
| **Allure** | Test reporting |


## Prerequisites

- Node.js (v24 recommended)
- npm


## Setup

### 1. Universal Tools & Configuration (REQUIRED)

Before proceeding, ensure your environment is configured:

- [Universal macOS Configuration](docs/setup/UNIVERSAL-CONFIG-MAC.md)
- [Universal Windows Configuration](docs/setup/UNIVERSAL-CONFIG-WINDOWS.md)

### 2. Install dependencies

```bash
npm install
```

### 3. Install Playwright browsers

```bash
npx playwright install
```

For fresh environments or CI:

```bash
npx playwright install --with-deps
```

### 4. Environment configuration

Environment-specific configuration is stored in `env/.env.dev`:

```env
BASE_URL=https://dev.example.com
API_BASE_URL=https://your-api-gateway-url/dev
VENDOR_API_KEY=your-api-key-here
```


## Running Tests

| Command | Description |
|---|---|
| `npm run test` | Run all tests |
| `npm run test:e2e` | E2E tests only |
| `npm run test:api` | API tests only |
| `npm run test:headed` | Run with visible browser |
| `npm run test:debug` | Debug mode |


## API Tests

API tests validate the vendor batch ingestion endpoint using Playwright's built-in `APIRequestContext`.

**Endpoint:**
```
POST /pathway-events
```

**Retrieve API key (requires AWS SSO):**
```bash
aws sso login --profile your-profile
aws apigateway get-api-key --api-key <key-id> --include-value \
  --query 'value' --output text \
  --profile your-profile --region eu-west-2
```


## CI / Pipelines

GitHub Actions pipelines are configured for:

| Trigger | Pipeline |
|---|---|
| Pull request | Runs E2E and API tests |
| Push to `main` | Runs E2E and API tests + deploys Allure report |


## Test Reports

| Report | Location |
|---|---|
| **Allure (primary)** | GitHub Pages — link in Actions summary |
| **Playwright HTML** | Download from Actions artifacts |


## Further Reading

- [Playwright Setup — macOS](docs/setup/playwright/PLAYWRIGHT-MAC-SETUP.md)
- [Playwright Setup — Windows](docs/setup/playwright/PLAYWRIGHT-WINDOWS-SETUP.md)
- [Test Tagging](docs/technical/playwright/PLAYWRIGHT-TAGGING.md)
- [Test Implementation](docs/technical/playwright/PLAYWRIGHT-TEST-IMPLEMENTATION.md)
- [Test Execution](docs/setup/playwright/PLAYWRIGHT-EXECUTION.md)
- [Playwright Official Docs](https://playwright.dev/docs/intro)