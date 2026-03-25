import {test, expect} from '@playwright/test';
import {LoginPage} from '../../pages/e2e/login.page';
import {HomePage} from '../../pages/e2e/home.page';
import {YourHealthPage} from '../../pages/e2e/your-health.page';
import {nhsLoginUsers} from '../../test-data/nhsLoginUsers';

test.describe('DTx Login & Health Store', () => {
    let loginPage: LoginPage;
    let homePage: HomePage;
    let yourHealthPage: YourHealthPage;

    test.beforeEach(async ({page}) => {
        loginPage = new LoginPage(page);
        homePage = new HomePage(page);
        yourHealthPage = new YourHealthPage(page);

        //await page.goto('/');
        await page.goto('https://ddjc0dec27n24.cloudfront.net');
        await loginPage.acceptCookiesIfVisible();
    });

    test('@DTX-E2E-001 User can log in and open Health Store', async () => {
        const user = nhsLoginUsers.testuserlive;

        await test.step('Log in with valid NHS login user', async () => {
            await loginPage.loginAs(user);
        });

        await test.step('Verify Home page is displayed', async () => {
            await expect(homePage.homeHeading).toBeVisible();
            await expect(homePage.welcomeText).toBeVisible();
        });

        await test.step('Navigate to Your Health', async () => {
            await homePage.clickYourHealth();
            await expect(yourHealthPage.yourHealthHeading).toBeVisible();
        });

        await test.step('Open Health Store', async () => {
            await yourHealthPage.clickGoToHealthStore();
        });

        await test.step('Verify Health Store page is displayed', async () => {
            await expect(yourHealthPage.healthStoreHeading).toBeVisible();
        });
    });

    test('@DTX-E2E-002 User sees error message with invalid password', async () => {
        const user = nhsLoginUsers.testuserlive1;

        await test.step('Enter valid email and invalid password', async () => {
            await loginPage.emailInput.fill(user.email);
            await loginPage.passwordInput.fill('WrongPassword12');
            await loginPage.continueButton.click();
        });

        await test.step('Validate login error is displayed', async () => {
            await expect(loginPage.errorSummary).toBeVisible();
            await expect(loginPage.errorSummary).toContainText('There is a problem');

            await expect(loginPage.emailError).toBeVisible();
            await expect(loginPage.emailError).toContainText('Check your details and');
        });
    });
});