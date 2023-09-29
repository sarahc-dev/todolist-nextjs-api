import ErrorMessage from "./ErrorMessage";

describe("<ErrorMessage />", () => {
    it("displays correct error when can't add todo", () => {
        cy.mount(<ErrorMessage errorMessage="Error adding todo" />);
        cy.get("p").should("contain.text", "There was an error adding the todo. Please try again.");
    });

    it("displays correct error when can't edit todo", () => {
        cy.mount(<ErrorMessage errorMessage="Error editing todo" />);
        cy.get("p").should("contain.text", "There was an error updating the todo. Please try again.");
    });

    it("displays correct error when can't edit todo", () => {
        cy.mount(<ErrorMessage errorMessage="Error deleting todo" />);
        cy.get("p").should("contain.text", "There was an error deleting the todo. Please try again.");
    });

    it("displays correct error when can't edit todo", () => {
        cy.mount(<ErrorMessage errorMessage="Something else" />);
        cy.get("p").should("contain.text", "Oops, there's been an error. Please try again.");
    });
});
