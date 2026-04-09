import {chromium, expect, FullConfig} from '@playwright/test';
import {LoginPage} from './src/pages/e2e/login.page';
import {HomePage} from './src/pages/e2e/home.page';
import {nhsLoginUsers} from './src/test-data/nhsLoginUsers';
import {getEnv} from './src/libraries/env';
import * as fs from 'fs';

const SESSION_PATH = 'src/test-data/session/auth.json';

async function globalSetup() {
    const isApiOnly = process.argv.includes('--project=api')
        || (process.argv.includes('--project') && process.argv.includes('api'));

    if (isApiOnly) {
        console.log('API project only — skipping browser login');
        return;
    }

    const env = getEnv();

    const browser = await chromium.launch({headless: true});
    const context = await browser.newContext({
        baseURL: env.baseUrl,
        ignoreHTTPSErrors: true,
    });
    const page = await context.newPage();

    await page.goto('/');

    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);

    await loginPage.loginAs(nhsLoginUsers.testuserlive);

    await expect(homePage.homeHeading).toBeVisible({timeout: 30_000});
    await page.waitForLoadState('networkidle');

    fs.mkdirSync('src/test-data/session', {recursive: true});
    await context.storageState({path: SESSION_PATH});

    console.log('Session saved successfully');
    await browser.close();
}

export default globalSetup;