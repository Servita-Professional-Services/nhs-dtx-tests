import {test, expect} from '@playwright/test';
import {LoginPage} from '../../pages/e2e/login.page';
import {HomePage} from '../../pages/e2e/home.page';
import {YourHealthPage} from '../../pages/e2e/your-health.page';
import {nhsLoginUsers} from '../../test-data/nhsLoginUsers';

test('@DTX-E2E-001 Login to DTx apps @e2e @smoke', async ({page}) => {
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);
    const yourHealthPage = new YourHealthPage(page);
    const user = nhsLoginUsers.testuserlive;

    await test.step('Open NHS app', async () => {
        await page.goto('/');
        await loginPage.acceptCookiesIfVisible();
    });

    await test.step('Log in with valid NHS login user', async () => {
        await loginPage.loginAs(user);
    });

    await test.step('Verify Home page is displayed', async () => {
        await expect(homePage.homeHeading).toBeVisible();
        await expect(homePage.welcomeText).toBeVisible();
        await expect(homePage.nhsDigitalTherapeuticsLink).toBeVisible();
    });

    await test.step('Navigate to Your Health', async () => {
        await homePage.clickYourHealth();
        await expect(yourHealthPage.yourHealthHeading).toBeVisible();
        await expect(yourHealthPage.digitalTherapeuticsHeading).toBeVisible();
    });

    await test.step('Open Health Store', async () => {
        await yourHealthPage.clickGoToHealthStore();
    });

    await test.step('Verify Health Store page is displayed', async () => {
        await expect(yourHealthPage.availableAppsNav).toBeVisible();
        await expect(yourHealthPage.healthStoreHeading).toBeVisible();
        await expect(yourHealthPage.accessApprovedText).toBeVisible();
    });
});