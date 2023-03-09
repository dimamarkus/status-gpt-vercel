import ChatInput, { ChatFormFields } from "./ChatInput";

describe("<ChatInput />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(
      <h1></h1>,
      // <ChatInput
      //   onSubmit={function (chatInput: ChatFormFields): void {
      //     console.log(chatInput);
      //   }}
      //   inputFormContext={null}
      // />,
    );
    cy.get("[class^=ChatInput_]").should("exist");
  });
});
