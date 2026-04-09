import {Page, Locator, expect} from '@playwright/test';
import {NhsLoginUser} from "../../test-data/nhsLoginUsers";

export class LoginPage {
    readonly page: Page;
    readonly signInButton: Locator;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly continueButton: Locator;
    readonly otpHeading: Locator;
    readonly securityCodeInput: Locator;
    readonly acceptCookiesButton: Locator;
    readonly errorSummary: Locator;
    readonly emailError: Locator;
    readonly continueLink: Locator;
    readonly accessNhsServicesText: Locator;

    constructor(page: Page) {
        this.page = page;
        this.signInButton = page.getByRole('button', {name: 'Sign in'});
        this.emailInput = page.getByRole('textbox', {name: 'Email address'});
        this.passwordInput = page.getByRole('textbox', {name: 'Password'});
        this.continueButton = page.getByRole('button', {name: 'Continue'});
        this.otpHeading = page.getByRole('heading', {name: 'Enter the security code'});
        this.securityCodeInput = page.getByRole('textbox', {name: 'Security code'});
        this.acceptCookiesButton = page.getByRole('button', { name: 'Accept all cookies' });
        this.errorSummary = page.getByRole('alert', { name: 'There is a problem' })
        this.emailError = page.getByText('Error: Check your details and');
        this.continueLink = page.getByRole('link', { name: 'Continue' });
        this.accessNhsServicesText = page.getByText('Access your NHS services');
    }

    async acceptCookiesIfVisible() {
        try {
            await this.acceptCookiesButton.waitFor({state: 'visible', timeout: 3000});
            await this.acceptCookiesButton.click();
        } catch {
        }
    }

    async login(email: string, password: string) {
        await this.acceptCookiesIfVisible();
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.continueButton.click();
    }

    async enterOtp(code: string) {
        await this.page.waitForLoadState('networkidle')
        await expect(this.otpHeading).toBeVisible();
        await this.securityCodeInput.fill(code);
        await this.continueButton.click();
    }

    async loginAs(user: NhsLoginUser) {
        await expect(this.accessNhsServicesText).toBeVisible();
        await this.continueLink.click()
        await this.login(user.email, user.password);
        await this.enterOtp(user.otpCode);
        await this.page.waitForLoadState('networkidle')
    }
}