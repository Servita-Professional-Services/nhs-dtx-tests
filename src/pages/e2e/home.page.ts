import {Page, Locator, expect} from '@playwright/test';

export class HomePage {
    readonly page: Page;
    readonly homeHeading: Locator;
    readonly welcomeText: Locator;
    readonly nhsDigitalTherapeuticsLink: Locator;
    readonly yourHealthButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.homeHeading = page.getByRole('heading', {name: 'Home'});
        this.welcomeText = page.getByText('Welcome to the NHS app. Use');
        this.nhsDigitalTherapeuticsLink = page.getByRole('link', {name: 'NHS Digital therapeutics'});
        this.yourHealthButton = page.getByRole('button', {name: 'Your health'});
    }

    async clickYourHealth() {
        await this.yourHealthButton.click();
    }
}