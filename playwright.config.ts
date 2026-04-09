import {defineConfig, devices} from '@playwright/test';
import {getEnv} from './src/libraries/env';

const env = getEnv();
const isCI = Boolean(process.env.CI);

export default defineConfig({
    globalSetup: './global-setup.ts',
    forbidOnly: isCI,
    retries: isCI ? 1 : 0,
    failOnFlakyTests: isCI,
    timeout: 60_000,

    expect: {
        timeout: 10_000,
    },

    outputDir: 'test-results/artifacts',

    reporter: isCI
        ? [
            ['line'],
            ['html', {outputFolder: 'playwright-report', open: 'never'}],
            ['allure-playwright', {resultsDir: 'allure-results'}],
        ]
        : [
            ['list'],
            ['html', {outputFolder: 'playwright-report', open: 'on-failure'}],
            ['allure-playwright', {resultsDir: 'allure-results'}],
        ],

    projects: [
        {
            name: 'chromium',
            testDir: './src/tests/e2e',
            fullyParallel: true,
            use: {
                ...devices['Desktop Chrome'],
                baseURL: env.baseUrl,
                storageState: 'src/test-data/session/auth.json',
                headless: isCI,
                viewport: {width: 1280, height: 720},
                actionTimeout: 30_000,
                navigationTimeout: 30_000,
                ignoreHTTPSErrors: true,
                trace: 'retain-on-failure',
                screenshot: 'only-on-failure',
                video: 'retain-on-failure',
            },
        },

        {
            name: 'api',
            testDir: './src/tests/api',
            fullyParallel: false,
            use: {
                baseURL: env.apiBaseUrl,
            },
        },
    ],
});