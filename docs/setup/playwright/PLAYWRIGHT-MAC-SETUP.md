# Playwright Configuration for Mac OS

You can follow the rest of this documentation Given you have completed [Mac Universal Config](docs/setup/UNIVERSAL-CONFIG-MAC.md) step by step configuration for Mac.

You will also need to ensure you have redirected your terminal path into the path you have cloned this GitHub repostitory for the rest of the setup:

`cd your-local-path/wayfinder-tests`

### 1. Environment Variables

Copy the env.example file template from `local.mac.env.example` to `env/local.env` (in the same directory), and then fill in the values in `env/local.env`:

Terminal copy command - `cp env/local.mac.env.example env/local.env`

Source your environment variable file with this command - `source env/local.env`

NOTE: Make sure the files are saved by your IDE/Code Editor in-case auto save is not enabled before the next step.

NOTE: All environment variables for this project should be stored in this doppler instance: https://dashboard.doppler.com/workplace/c5c42b82a4bc63932d52/projects/aggregator-automation-testing as reference.

NOTE: If in any circumstances the doppler instance was deprecated, you can find the variables in the `NHS Digital Wayfinder Patient Care Aggregator dev` AWS instance in which you will need to login with NHS credentials and have your credentials added to IAM policies by an AWS administrator, then you will have to visit this URL and go through the login process: https://d-9c67018f89.awsapps.com/start and once logged in succesfully navigate to this URL to access the https://eu-west-2.console.aws.amazon.com/secretsmanager/secret?name=test-automation-framework-vars&region=eu-west-2 and then click on the 'Retrieve secret value' butoon to reveal all variables.

### 2. Install Node version For Project

Install project node version:

`nvm install v23.1.0` (or whatever version specified in [.nvmrc](https://github.com/Servita-Professional-Services/wayfinder-tests-playwright-poc/blob/main/.nvmrc))

`nvm use`

### 3. Installing Project Dependencies

Clean out any cached npm dependencies

`npm cache clean --force`

Install dependencies needed for this project

`npm ci`

Install the browsers required to launch the tests

`npx playwright install`

## Summary

Once you have accomplished all the steps in this documentation, then you'll be able to successfully implement and execute Playwright tests. Please follow the following guides for test execution and test implementation:

[Playwright Test Execution](/docs/setup/playwright/PLAYWRIGHT-EXECUTION.md)

[Playwright Test Implementation](/docs/technical/playwright/PLAYWRIGHT-TEST-IMPLEMENTATION.md)