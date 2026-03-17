# Playwright Configiguration for Windows Os

You can follow the rest of this documentation Given you have completed [Windows Universal Config](docs/setup/UNIVERSAL-CONFIG-WINDOWS.md) step by step configuration for Windows.

You will also need to ensure you have redirected your terminal path into the path you have cloned this GitHub repostitory for the rest of the setup:

`cd your-local-path/wayfinder-tests`

## 1. Environment Variables

Assuming your terminal is directed to `wayfinder-tests` project directory, follow the below terminal commands to copy the example environment variable file into your local environment variable file and source it as well:

This will generate a `local.env` file in the `env` directory:

Powershell terminal copy command: `copy env\local.windows.env.example env\local.env`

Make sure the files are saved by your IDE/Code Editor incase auto save is not enabled before the next step.

Source the `local.env` with this powershell command: 

```powershell
Get-Content .\env\local.env | ForEach-Object {
    $pair = $_ -split '=',2
    [System.Environment]::SetEnvironmentVariable($pair[0], $pair[1], [System.EnvironmentVariableTarget]::Process)
}
```
NOTE: Make sure the files are saved by your IDE/Code Editor in-case auto save is not enabled before the next step.

NOTE: All environment variables for this project should be stored in this doppler instance: https://dashboard.doppler.com/workplace/c5c42b82a4bc63932d52/projects/aggregator-automation-testing as reference.

NOTE: If in any circumstances the doppler instance was deprecated, you can find the variables in the `NHS Digital Wayfinder Patient Care Aggregator dev` AWS instance in which you will need to login with NHS credentials and have your credentials added to IAM policies by an AWS administrator, then you will have to visit this URL and go through the login process: https://d-9c67018f89.awsapps.com/start and once logged in succesfully navigate to this URL to access the https://eu-west-2.console.aws.amazon.com/secretsmanager/secret?name=test-automation-framework-vars&region=eu-west-2 and then click on the 'Retrieve secret value' butoon to reveal all variables.

## 2. Setup node version specified for Project

Set project node version

1. `nvm use v23.1.0`

## 3. Installing Project Dependencies

Clean out any cached npm dependencies

1. `npm cache clean --force`

Install dependencies needed for this project

2. `npm ci`

Install the browsers required to launch the tests

3. `npx playwright install`

## Summary

Once you have accomplished all the steps in this documentation, then you'll be able to successfully implement and execute Playwright tests. Please follow the following guides for test execution and test implementation:

[Playwright Test Execution](/docs/setup/playwright/PLAYWRIGHT-EXECUTION.md)

[Playwright Test Implementation](/docs/technical/playwright/PLAYWRIGHT-TEST-IMPLEMENTATION.md)
