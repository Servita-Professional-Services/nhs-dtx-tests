# K6 Performance Test Implementation – DTx Project

This documentation covers the K6 performance test scripts for the DTx project, including tests for APIs that may require NHS ID tokens. It also includes a dynamic token refresh mechanism for long-running tests.

---

## 1️⃣ Reporting Service API K6 Tests

### Script 1: Reporting Service API with Events from File

* Loads event data from a text file.
* Sends requests at a constant rate of 25 TPS.

**Example Command**

```bash
K6_WEB_DASHBOARD=true \
K6_WEB_DASHBOARD_EXPORT=reports/report.html \
k6 run -e FILE_PATH=resources/perf-test-data/reporting-events.txt \
src/tests/performance/reporting-endpoint-25tps.js
```

**Key Features**

* **Data Loading:** From `FILE_PATH` environment variable.
* **Headers:** Adds unique correlation IDs.
* **Load Scenario:** Constant arrival rate of 25 TPS.

---

### Script 2: Reporting Service API with Mid-Test Event Injection

* Loads initial events and injects additional events mid-test.
* Useful for simulating dynamic load scenarios.

**Example Command**

```bash
K6_WEB_DASHBOARD=true \
K6_WEB_DASHBOARD_EXPORT=reports/report.html \
FILE_PATH_ONE=resources/perf-test-data/reporting-events.txt \
FILE_PATH_TWO=resources/perf-test-data/reporting-events-additional.txt \
k6 run src/tests/performance/reporting-endpoint-25tps-injection.js
```

**Key Features**

* **Dynamic Data Injection:** Adds new events at runtime (e.g., after 3 minutes).
* **Constant Load:** Maintains 25 TPS during the test.
* **Correlation IDs:** Generated dynamically for each request.

---

## 2️⃣ Aggregator API K6 Tests

### Script 1: Aggregator API in NFT Environment

* Tests the NFT environment (no NHS ID token required).

**Example Script Command**

```bash
k6 run src/tests/performance/aggregator-nft-25tps.js
```

**Key Features**

* Uses `SharedArray` to load NHS numbers from CSV.
* Constant arrival rate scenario at 25 TPS.
* Dynamic `X-Correlation-ID` for each request.

---

### Script 2: Aggregator API in AOS Environment

* Requires an NHS ID token to access the API.

**Example Script Command**

```bash
k6 run -e NHSD_ID_TOKEN=your_nhs_id_token \
src/tests/performance/aggregator-aos-25tps.js
```

**Key Features**

* Token passed via `NHSD_ID_TOKEN` environment variable.
* Constant load scenario with configurable virtual users.
* Headers include `X-Correlation-ID` and `NHSD-ID-Token`.

---

## 3️⃣ K6 Script with Hourly NHS ID Token Refresh

* Long-running tests retrieve the NHS ID token dynamically from a local token server.
* Token server automatically refreshes the token every hour.

**Example Command**

```bash
node src/tests/performance/generateNhsIdToken.js
```

**Key Features**

* **Dynamic Token Retrieval:** K6 scripts fetch token from `http://localhost:3000/token`.
* **Hourly Token Refresh:** Ensures token validity for extended tests.
* **Retry Logic:** Handles temporary server failures gracefully.

**K6 Execution Example**

```bash
k6 run src/tests/performance/aggregator-aos-dynamic-token.js
```

* Retrieves the latest NHS ID token from the token server.
* Sends authenticated requests to the API.
* Validates response status and body.

---

## 4️⃣ Helper Files for Token Management

### `generateNhsIdToken.js`

* Launches the token server (`token-refresh.js`) and K6 tests.
* Handles process management, credentials, and environment variable setup.

### `token-refresh.js`

* Generates a new NHS ID token every 59 minutes and 50 seconds.
* Serves the token via an Express API (`/token`) for K6 scripts.
* Writes the token to `.env` file for reference.

**Dynamic Token Fetch Example in K6 Script**

```javascript
import http from "k6/http";

const TOKEN_SERVER_URL = 'http://localhost:3000/token';

function fetchToken() {
    const response = http.get(TOKEN_SERVER_URL);
    if (response.status === 200) {
        return JSON.parse(response.body).token;
    }
    return null;
}
```

> Use `fetchToken()` in your K6 scripts to dynamically retrieve the NHS ID token.

---

## 5️⃣ Notes for DTx Project Usage

1. All scripts are located in:

```
src/tests/performance/
```

2. Performance test data is in:

```
resources/perf-test-data/
```

3. K6 reports can be exported to:

```
reports/
```

4. Environment variables used:

* `FILE_PATH` / `FILE_PATH_ONE` / `FILE_PATH_TWO`
* `NHSD_ID_TOKEN`
* `CORRELATION_ID_PREFIX`
* `REPORTING_SERVICE_AUTH_KEY`

5. For long-running tests with token refresh, **always start the token server first** using:

```bash
node src/tests/performance/generateNhsIdToken.js
```