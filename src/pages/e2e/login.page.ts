import {Page, Locator, expect} from '@playwright/test';
import {NhsLoginUser} from '../test-data/nhs-login-users';

export class LoginPage {
    readonly page: Page;
    readonly signInButton: Locator;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly continueButton: Locator;
    readonly otpHeading: Locator;
    readonly securityCodeInput: Locator;
    readonly acceptCookiesButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.signInButton = page.getByRole('button', {name: 'Sign in'});
        this.emailInput = page.getByRole('textbox', {name: 'Email address'});
        this.passwordInput = page.getByRole('textbox', {name: 'Password'});
        this.continueButton = page.getByRole('button', {name: 'Continue'});
        this.otpHeading = page.getByRole('heading', {name: 'Enter the security code'});
        this.securityCodeInput = page.getByRole('textbox', {name: 'Security code'});
        this.acceptCookiesButton = page.getByRole('button', {name: 'Accept all cookies'});
    }

    async goto() {
        await this.page.goto('http://localhost:3000/');
    }

    async acceptCookiesIfVisible() {
        if (await this.acceptCookiesButton.isVisible().catch(() => false)) {
            await this.acceptCookiesButton.click();
        }
    }

    async login(email: string, password: string) {
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.continueButton.click();
    }

    async enterOtp(code: string) {
        await expect(this.otpHeading).toBeVisible();
        await this.securityCodeInput.fill(code);
        await this.continueButton.click();
    }

    async loginAs(user: NhsLoginUser) {
        await this.login(user.email, user.password);
        await this.enterOtp(user.otpCode);
        await this.page.waitForLoadState('networkidle')
    }
}