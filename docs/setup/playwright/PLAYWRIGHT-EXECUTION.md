# Playwright Test Execution

This section explains how to execute individual or sets of tests using the scripts configured in the `package.json` file.

Before running these commands, ensure the project has been properly configured following the step-by-step documentation:

* [macOS Setup & Config](docs/MAC-SETUP.md) for macOS machines
* [Windows Setup & Config](docs/WINDOWS-SETUP.md) for Windows machines

> **Note:** All terminal commands must be run from the root folder of this project.

---

## Commands for Running DTx Tests

### Non-Docker Test Execution

You can run DTx tests directly via npm scripts without Docker:

| Test Type          | Command                 |
| ------------------ | ----------------------- |
| All Tests          | `npm run test`          |
| UI / E2E Tests     | `npm run test:e2e`      |
| API Contract Tests | `npm run test:contract` |
| Performance Tests  | `npm run test:perf`     |

These scripts use the following tags in your tests:

* `@ui` → UI / E2E tests
* `@contract` → API contract tests
* `@performance` → Load/performance tests

---

### Running Specific Tests by Tag

To run a specific test or group of tests, use:

```bash
TAG=@specific-tag npm run test
```

> Replace `@specific-tag` with the tag defined in your test, for example `@dtx-api` or `@ui`.

---

### Passing Additional Arguments

You can pass additional arguments to Playwright via your npm scripts:

#### Headed Mode

See tests running in the browser:

```bash
# Run all E2E/UI tests in headed mode
npm run test:e2e -- --headed

# Run specific tagged test in headed mode
TAG=@specific-tag npm run test -- --headed
```

#### Debug Mode

Open the Playwright Inspector for debugging:

```bash
# Run all E2E/UI tests in debug mode
npm run test:e2e -- --debug

# Run specific tagged test in debug mode
TAG=@specific-tag npm run test -- --debug
```

> In debug mode, `--headed` is not required, as Playwright automatically opens the browser in interactive mode.

---

### Dockerised Test Execution (Optional)

If Docker is required for CI-like execution:

1. Launch Docker Desktop.
2. Build the Docker image:

```bash
docker build -t nhs-dtx-tests .
```

3. Make the helper script executable:

```bash
chmod +x dockerised-test-run.sh
```

4. Run tests with optional shards and tags:

```bash
# Run all tests with 2 shards
./dockerised-test-run.sh --shards 2 --tag @ui

# Run API contract tests
./dockerised-test-run.sh --shards 2 --tag @contract

# Run performance tests
./dockerised-test-run.sh --shards 2 --tag @performance
```

> You can change `--shards 2` to any number depending on how many parallel workers you want.

---

This setup ensures all DTx tests can be executed via **CLI**, **tags**, **headed/debug modes**, or **Docker**, fully aligned with your `nhs-dtx-tests` project.