import {Page, Locator} from '@playwright/test';

export class YourHealthPage {
    readonly page: Page;
    readonly yourHealthHeading: Locator;
    readonly digitalTherapeuticsHeading: Locator;
    readonly goToHealthStoreButton: Locator;
    readonly availableAppsNav: Locator;
    readonly healthStoreHeading: Locator;
    readonly accessApprovedText: Locator;

    constructor(page: Page) {
        this.page = page;

        this.yourHealthHeading = page.getByRole('heading', {name: 'Your health'});
        this.digitalTherapeuticsHeading = page.getByRole('heading', {
            name: 'Your digital therapeutics',
        });
        this.goToHealthStoreButton = page.getByRole('button', {
            name: 'Go to health store',
        });
        this.availableAppsNav = page.getByRole('navigation', {name: 'Available apps'});
        this.healthStoreHeading = page.getByRole('heading', {name: 'HealthStore'});
        this.accessApprovedText = page.getByText('Access approved digital');
    }

    async clickGoToHealthStore() {
        await this.goToHealthStoreButton.click();
    }
}