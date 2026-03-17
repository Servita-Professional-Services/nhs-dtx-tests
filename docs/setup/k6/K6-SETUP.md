# K6 Setup and Configuration

## 1. Requirements

Prior to following the rest of this documentation, you will need to follow the universal setup and config files for your system's OS as mentioned below:

- [Universal Mac Config](/docs/setup/UNIVERSAL-CONFIG-MAC.md)
- [Universal Windows Config](/docs/setup/UNIVERSAL-CONFIG-WINDOWS.md)

## 2. K6 Installation

### Mac

You can use Homebrew to install K6 by executing the `brew install k6` command on your terminal 

### Windows

For windows you can use the chocolotey or MSI installer to install K6

#### Install via Chocolatey package manager

`choco install k6`

#### Install via MSI installer

Navigate to this link on your browser to download the MSI installer: https://dl.k6.io/msi/k6-latest-amd64.msi

## 3. Postman API Tests Setup (OPTIONAL)

- Install postman-to-K6 via NPM
  - `npm install -g postman-to-K6`
    - Note: You might need certain libraries to install/re-install this package such `icu4c` for macOS via `brew install icu4c` or `brew reinstall icu4c` commands.

## 4. Environment Variables and Authorisation

### Static Environment Variables

In most cases you will need specific tokens for test execution explicitly on the AOS environment. For everything except for the `NHSD_ID_TOKEN`, you can access this doppler instance: https://dashboard.doppler.com/workplace/c5c42b82a4bc63932d52/projects/aggregator-automation-testing to download the necessary environment variables and copy them into you `.env` file. To create a new `.env` file, you will need to follow the relevant command below:

- Mac OS Terminal command - `cp env/local.k6.mac.env.example env/.env`
- Windows OS terminal command - `copy env\local.k6.windows.env.example env\.env`

### Dynamic Token Variable Retreival


#### Singular Token Retreival

To retreive the `NHSD_ID_TOKEN`, you can run a Playwright test already implemented. When scripting your performance test and require to pass on the `NHSD_ID_TOKEN`, you will need to define it as `__ENV.NHSD_ID_TOKEN`. Prior to execting the test command, you need to ensure that you have followed the below documentations below based on your operating system:

- [Playwright Mac Setup & Config](/docs/setup/playwright/PLAYWRIGHT-MAC-SETUP.md)
- [Playwright Windows Setup & Config](/docs/setup/playwright/PLAYWRIGHT-WINDOWS-SETUP.md)

Given that the Playwright framework is configured and setup correctly within your local machine, you will need to use this [K6 Test Script Template](../../../src/tests/k6/aos/aos-refresh-token-script-template.js) or similar to update the relevant areas within the K6 script to be able to use the JS script file to generate and refresh a token for your test. The next set of steps will retreive a NHSD-ID-TOKEN via Playwright and relevant helper files, run your K6 test script and refresh the NHS-ID-TOKEN every hour for the K6 test that is in mid execution: 

1. Ensure you have navigated to this project’s directory in the terminal via `cd`.

  - **Note: if you are using Windows OS, please use the Git Bash terminal for all the commands**
 
2. Enter `npm run generate-nhs-token` within terminal.
3. You should get a `Enter the full path to your K6 script: ` prompt on the terminal.
4. Enter the full and actual K6 test script path following prompt outputed in step 3.

 - **Note: Copy the full path based on your operating system format such as the below examples:**

       - Windows: C:\Users\TestUser\your-path\wayfinder-tests\src\tests\k6\tactical-sus\tactical-sus-25tps-test.js
       - Mac: /Users/TestUser/you-path/wayfinder-tests-playwright/src/tests/k6/nft/constant-25-tps-nft.js

5. Press enter.
6. You should get a `Enter email: ` prompt on the terminal.
7. Enter the NHS test patient user which you will like to generate the token from following prompt outputed in step 6 and press enter.
8. You should get a `Enter password: ` prompt on the terminal.
9. Enter the NHS test patient password which for the test user utilised from step 10 following prompt outputed in step 8 and press enter.
10. You should get a `Enter OTP: ` prompt on the terminal.
11. Enter the NHS test patient OTP for the test user utilised from step 10 following prompt outputed in step 10 and press enter.
12. You should get a `Enter NHS Patient Number: ` prompt on the terminal.
13. Enter the NHS test patient's NHS Number for the test user utilised from step 10 following prompt outputed in step 12 and press enter.
14. Wait until the Playwright test is complete and all output information is provided in the terminal.
15. You should see the multiple console logs stating the logging of the token, the nhs number as well as where the report is to be saved on your machine
16. Immediatly after the console logs, you should see the K6 performance test being executed and token being refreshed every one hour.


-----

Relevant files for the token refresh approach are located in the paths mentioned below:
- [Top Level Management Script](/src/libraries/playwright/helpers/generateNhsIdToken.js)
- [Token Refresh helper File](/src/libraries/playwright/helpers/token-refresh.js)
- [Playwright Test Spec File for Process & Token Retreival](/src/tests/playwright/integration/nhs-app-login.spec.ts)
- [Test Runner Helper File](/src/libraries/playwright/helpers/run-test-with-credentials.js)

#### Multi Token Retreival

To test against multiple NHS numbers and retreive multiple NHSD_ID_TOKENs, you can run a customised browser session token retreival approach via CLI and Playwright. When scripting your performance test and require to pass on the `NHSD_ID_TOKEN`, you will need to define it as such example`__ENV.VARIABLE_NAME` (see [this script](../../../src/tests/k6/aos/example-integrated-perf-test-multi-users.js) as example). Prior to execting the test command, you need to ensure that you have followed the below documentations below based on your operating system:

- [Playwright Mac Setup & Config](/docs/setup/playwright/PLAYWRIGHT-MAC-SETUP.md)
- [Playwright Windows Setup & Config](/docs/setup/playwright/PLAYWRIGHT-WINDOWS-SETUP.md)

Given that the Playwright framework is configured and setup correctly within your local machine, you will need to use the same convention as this [this script](../../../src/tests/k6/aos/example-integrated-perf-test-multi-users.js) or similar to update the relevant areas within the K6 script to be able to use the JS script file to generate and refresh multiple tokens for your test. The next set of steps will retreive a NHSD-ID-TOKENss via Playwright and relevant helper files, run your K6 test script and refresh the NHS-ID-TOKENs every hour for the given K6 test that is in mid execution: 

1. Navigate to the Project Directory

Open your terminal and use `cd` to navigate to the root directory of your project.

> **Note (Windows Users):** Use **Git Bash** for executing all commands.

---

2. Run the Token Generation Script

Run the following command in the terminal:
```bash
generate-multi-nhs-token
```

3. Enter K6 Script Path When Prompted

You will be prompted: `Enter the full path to your K6 script:`

4. Provide the full path to your K6 test script.

Path Format Examples:

- Windows: C:\Users\TestUser\your-path\wayfinder-tests\src\tests\k6\tactical-sus\tactical-sus-25tps-test.js
- Mac: /Users/TestUser/your-path/wayfinder-tests-playwright/src/tests/k6/nft/constant-25-tps-nft.js

5. Use Existing Credentials File (Optional)

If a credentials.json file exists in the env/ directory, the CLI will ask: `Credentials file already exists. Use existing credentials? (y/n):`

- Enter y to reuse saved credentials.
- Enter n to input new user details (this will overwrite the existing file).

**Note: you can create a `credentials.json` file by copying the example template by running these commands:**

Mac Terminal copy command - `cp env/credentials.json.template.example env/credentials.json`

Powershell terminal copy command: `copy env\credentials.json.template.example env\credentials.json`

**Note: If you're generating a `credentials.json` file from the above commands, make sure you replace the placeholder values with the actual test patient/s credential values**

6. Enter Number of NHS Test Users (If Entering New Credentials)

If creating new credentials, you'll be prompted: `Enter the number of NHS test users:`

7. Enter Test User Details

For each user, the CLI will request:

- `Enter email:`
- `Enter password:`
- `Enter OTP:`
- `Enter NHS Patient Number:`

8. Token Server Starts Automatically

After credentials are confirmed or saved, the Playwright token server starts and begins generating tokens.


-----

Relevant files for the token refresh approach are located in the paths mentioned below:
- [Top Level Management Script](/src/libraries/playwright/helpers/generateMultiNhsIdTokens.js)
- [Token Refresh helper File](/src/libraries/playwright/helpers/token-refresh-multi.js)
- [Playwright Test Spec File for Process & Token Retreival](/src/tests/playwright/integration/nhs-app-login.spec.ts)
- [Test Runner Helper File](/src/libraries/playwright/helpers/run-test-with-credentials-multi.js)

## 5. Test Data Setup

There are some tests that require large number of test data, please download them from this Microsoft sharepoint space: [Servita Sharepoint Link](https://servitaconsultingltd.sharepoint.com/:f:/s/C358-APIAggregator/ErixPmIPpaJErjOr3OYS4tYBZOVBir_Hdhl8nnSQ2X7hTQ?e=2jUjcs) or [NHS Sharepoint](https://nhs.sharepoint.com/:f:/s/Mission5-ProgrammeFiles/EvQQ4Yh-4_9FtzStnXz4AhwBYJ3ZBJeVJFdDWU3I4l2Rhw?e=l6yUju) (NHS access required) and store each file in `src/data` directory.

## Summary

One complete, you can follow how to execute or implement a K6 test script.

- [K6 Test Implementation](/docs/technical/k6/K6-TEST-IMPLEMENTATION.md)
- [K6 Test Execution](/docs/setup/k6/K6-TEST-EXECUTION.md)