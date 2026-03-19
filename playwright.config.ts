import {defineConfig, devices} from '@playwright/test';
import {getEnv} from './src/libraries/env';

const env = getEnv();
const isCI = Boolean(process.env.CI);

export default defineConfig({
    testDir: './src/tests',
    fullyParallel: !isCI,
    forbidOnly: isCI,
    retries: isCI ? 1 : 0,
    workers: isCI ? 2 : undefined,
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
            ['allure-playwright'],
        ]
        : [
            ['list'],
            ['html', {outputFolder: 'playwright-report', open: 'on-failure'}],
            ['allure-playwright'],
        ],
    use: {
        baseURL: env.baseUrl || 'http://localhost:3000',
        headless: isCI,
        viewport: {width: 1280, height: 720},
        actionTimeout: 30_000,
        navigationTimeout: 30_000,
        ignoreHTTPSErrors: true,
        trace: 'retain-on-failure',
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
    },

    projects: [
        {
            name: 'chromium',
            use: {
                ...devices['Desktop Chrome'],
            },
        },
        {
            name: 'Mobile Safari',
            use: {
                ...devices['iPhone 12'],
            },
        },
    ],

    // webServer: {
    //   command: 'npm run start',
    //   url: env.baseUrl,
    //   reuseExistingServer: !isCI,
    //   timeout: 120_000,
    // },
});