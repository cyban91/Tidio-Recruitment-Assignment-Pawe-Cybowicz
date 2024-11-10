import { Page, expect } from "@playwright/test";

export class PopUpChatWindow {
  readonly page: Page;
  readonly iframeLocator: string;
  readonly iframeMessageWIndow: string;
  readonly inpuField: string;
  readonly sendButton: string;
  readonly emailAddressPlaceholder: string;
  readonly sendEmailButton: string;
  readonly messageLogContent: string;

  constructor(page: Page) {
    this.page = page;
    this.iframeLocator = 'iframe[title="Tidio Chat"]';
    this.iframeMessageWIndow = "flyNewMessageButton";
    this.inpuField = "newMessageTextarea";
    this.sendButton = "widgetButtonBody";
    this.emailAddressPlaceholder = "Enter your email...";
    this.sendEmailButton = "Send";
    this.messageLogContent = "messagesLog";
  }

  async proceedToChatWindow(popup: Page) {
    await popup
      .locator(this.iframeLocator)
      .contentFrame()
      .getByTestId(this.iframeMessageWIndow)
      .click();
  }

  async typeAMessageInChatBotInputField(popup: Page, message: string) {
    await popup
      .locator(this.iframeLocator)
      .contentFrame()
      .getByTestId(this.inpuField)
      .fill(message);
  }

  async sendMessageToChatBot(popup: Page) {
    await popup
      .locator(this.iframeLocator)
      .contentFrame()
      .getByTestId(this.sendButton)
      .click();
  }

  async enterYourEmailAddress(popup: Page, emailAddress: string) {
    await popup
      .locator(this.iframeLocator)
      .contentFrame()
      .getByPlaceholder(this.emailAddressPlaceholder)
      .fill(emailAddress);
  }

  async sendYourEmailAddressToTheChatBot(popup: Page) {
    await popup
      .locator(this.iframeLocator)
      .contentFrame()
      .getByRole("button", { name: this.sendEmailButton })
      .click();
  }

  async assertTestMessageOrResponseIsVisibleInTheChat(
    popup: Page,
    message: string
  ) {
    await expect(
      popup
        .locator(this.iframeLocator)
        .contentFrame()
        .getByTestId(this.messageLogContent)
        .getByText(message)
    ).toBeVisible();
  }
}
