describe("todolist app", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000");
    });
    it("fetches todos and displays a message if there are no todos", () => {
        cy.contains("TODO");
        cy.contains("There's nothing to do.");
    });
});
