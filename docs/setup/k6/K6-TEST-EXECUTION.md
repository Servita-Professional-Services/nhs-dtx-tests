# K6 Test Script Execution

You can run the K6 script in multiple ways depending on your needs.

---

## 1. Basic Execution

Runs the K6 script without generating a report.

```bash
k6 run path/to/script.js
```

> Replace `path/to/script.js` with the actual path to your K6 script file.

---

## 2. Live Web Dashboard and Report Generation

Runs the K6 script with a live web dashboard and generates an HTML report.

```bash
K6_WEB_DASHBOARD=true K6_WEB_DASHBOARD_EXPORT=path/to/html-report.html k6 run path/to/script.js
```

* `path/to/script.js` → path to your K6 script
* `path/to/html-report.html` → path and filename for the generated HTML report

> This allows you to monitor test execution in real time and review a detailed report after completion.

---

## 3. Dynamic Execution

The `dynamic-script-executor.js` helper in `src/libraries/k6/` allows you to run K6 scripts **dynamically**, for example by selecting scripts, passing environment variables, or configuring load parameters at runtime.

Usage example:

```bash
node src/libraries/k6/dynamic-script-executor.js --script path/to/script.js --vus 50 --duration 2m
```

* `--script` → path to the K6 script
* `--vus` → number of virtual users to simulate
* `--duration` → duration of the test

> This utility makes it easier to integrate K6 tests into CI/CD pipelines or trigger them programmatically with custom parameters.