import { expect, Locator, Page } from "@playwright/test";

export class InboxPage {
  readonly page: Page;
  readonly simulateAConversationButton: Locator;
  readonly inboxHeader: Locator;
  readonly goToUnassignedButton: Locator;
  readonly conversationWindow: Locator;
  readonly joinConversationButton: Locator;
  readonly userPanelChatInputField: Locator;
  readonly userPanelChatReplyButton: Locator;
  readonly myOpenTab: Locator;
  readonly conversationOptionsButton: Locator;
  readonly conversationOptionsDelete: Locator;
  readonly conversationOptionsConfirmDelete: Locator;
  readonly messageLine: Locator;

  constructor(page: Page) {
    this.page = page;
    this.simulateAConversationButton = page.getByRole("button", {
      name: "Simulate a conversation",
    });
    this.inboxHeader = page.locator("h2", { hasText: "Inbox" });
    this.goToUnassignedButton = page.getByRole("button", {
      name: "Go to Unassigned",
    });
    this.conversationWindow = page.locator(".conversation");
    this.joinConversationButton = page.getByRole("button", {
      name: "Join conversation",
    });
    this.userPanelChatInputField = page.locator(
      '[data-test-id="new-message-textarea"]'
    );
    this.userPanelChatReplyButton = page.getByRole("button", { name: "Reply" });
    this.myOpenTab = page
      .locator("#inbox-live-conversations-folders")
      .getByText("My open");
    this.conversationOptionsButton = page.getByLabel(
      "Conversation options button"
    );
    this.conversationOptionsDelete = page.getByRole("button", {
      name: "Delete",
    });
    this.messageLine = page.getByRole("link");
    this.conversationOptionsConfirmDelete = page.getByRole("button", {
      name: "Yes, remove it",
    });
  }

  async assertInboxPageIsOpen() {
    await expect(this.inboxHeader).toBeVisible();
  }

  async clickSimulateAConversationButtonAndGetThePopUp() {
    const popupPromise = this.page.waitForEvent("popup");
    await this.simulateAConversationButton.click();
    const popup = await popupPromise;
    return popup;
  }

  async goToUnassignedMessages() {
    await this.goToUnassignedButton.click();
  }

  async assertMessageIsVisibleInUserPanelMessageWindow(message: string) {
    const conversationWIndow = this.conversationWindow;
    const messageInTheConversationWindow =
      conversationWIndow.getByText(message);
    await expect(messageInTheConversationWindow).toBeVisible();
  }

  async assertEmailIsVisibleInUserPanelMessageWindow(email: string) {
    const conversationWIndow = this.conversationWindow;
    const emailInTheConversationWindow = conversationWIndow.getByText(email);
    await expect(emailInTheConversationWindow).toBeVisible();
  }

  async clickJoinConversationButton() {
    await this.joinConversationButton.click();
  }

  async typeResponseMessageInUserPanel(responseMessage: string) {
    await this.userPanelChatInputField.fill(responseMessage);
  }

  async sendTheResponseMessageInUserPanel() {
    await this.userPanelChatReplyButton.click();
  }

  async goToMyOpenTab() {
    await this.myOpenTab.click();
  }

  async openConversationOptions(email: string) {
    const link = await this.messageLine;
    const message = link.getByText(email);
    await message.hover();
    await this.conversationOptionsButton.click();
  }

  async clickDeleteButton() {
    await this.conversationOptionsDelete.click();
  }

  async confirmDelete() {
    await this.conversationOptionsConfirmDelete.click();
  }

  async assertConversationWasDeleted(email: string) {
    const link = await this.messageLine;
    const message = link.getByText(email);
    await expect(message).not.toBeVisible();
  }
}
