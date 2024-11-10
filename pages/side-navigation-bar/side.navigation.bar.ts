import { Locator, Page } from "@playwright/test";

export class SideNavigationBar {
  readonly page: Page;
  readonly inboxButton: Locator;
  readonly dashboardHeader: Locator;

  constructor(page: Page) {
    this.page = page;
    this.inboxButton = page.locator('[data-test-id="inbox-section-button"]');
  }

  async goToInbox() {
    await this.inboxButton.click();
  }
}
