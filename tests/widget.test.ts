import { test } from "@playwright/test";
import { SideNavigationBar } from "../pages/side-navigation-bar/side.navigation.bar";
import { InboxPage } from "../pages/inbox-page/inbox.page";
import { PopUpChatWindow } from "../pages/inbox-page/pop-up-chat-window/pop.up.chat.window";
import { chatBotMessages } from "../chat-messages/chat.messages";

test.describe("Widget tests", () => {
  let sideNavigationBar: SideNavigationBar;
  let inboxPage: InboxPage;
  let popUpChatWindow: PopUpChatWindow;

  test.beforeEach(async ({ page }) => {
    sideNavigationBar = new SideNavigationBar(page);
    inboxPage = new InboxPage(page);
    popUpChatWindow = new PopUpChatWindow(page);
    await page.goto(
      `https://www.tidio.com/panel/?project_public_key=${process.env.PROJECT_PUBLIC_KEY}&api_token=${process.env.API_TOKEN}`
    );
  });

  test.afterEach(async () => {
    await inboxPage.goToMyOpenTab();
    await inboxPage.openConversationOptions(chatBotMessages.email);
    await inboxPage.clickDeleteButton();
    await inboxPage.confirmDelete();
    await inboxPage.assertConversationWasDeleted(chatBotMessages.email);
  });

  test("Send message from widget to panel and from panel to widget", async ({}) => {
    let popup;
    await test.step("Simulate visitor and send message from widget to panel", async () => {
      //Arrange
      const testMessage = chatBotMessages.testMessage;
      const emailAddress = chatBotMessages.email;

      //Act Send message
      await sideNavigationBar.goToInbox();
      await inboxPage.assertInboxPageIsOpen();
      popup = await inboxPage.clickSimulateAConversationButtonAndGetThePopUp();
      await popUpChatWindow.proceedToChatWindow(popup);
      await popUpChatWindow.typeAMessageInChatBotInputField(popup, testMessage);
      await popUpChatWindow.sendMessageToChatBot(popup);
      await popUpChatWindow.enterYourEmailAddress(popup, emailAddress);
      await popUpChatWindow.sendYourEmailAddressToTheChatBot(popup);

      //Assert your message is visible in the chat window and in the user panel
      await popUpChatWindow.assertTestMessageOrResponseIsVisibleInTheChat(
        popup,
        testMessage
      );
      await inboxPage.goToUnassignedMessages();
      await inboxPage.assertMessageIsVisibleInUserPanelMessageWindow(
        testMessage
      );
      await inboxPage.assertEmailIsVisibleInUserPanelMessageWindow(
        emailAddress
      );
    });
    await test.step("Send a reply message from the panel", async () => {
      //Arrange
      const responseMessage = chatBotMessages.responseMessage;

      //Act
      await inboxPage.clickJoinConversationButton();
      await inboxPage.typeResponseMessageInUserPanel(responseMessage);
      await inboxPage.sendTheResponseMessageInUserPanel();

      //Assert your response is visible in the chat window and in the user panel
      await popUpChatWindow.assertTestMessageOrResponseIsVisibleInTheChat(
        popup,
        responseMessage
      );
      await inboxPage.assertMessageIsVisibleInUserPanelMessageWindow(
        responseMessage
      );
    });
  });
});
