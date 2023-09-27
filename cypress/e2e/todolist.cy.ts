describe("todolist app", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000");
    });

    it("fetches todos and displays a message if there are no todos", () => {
        cy.contains("TODO");
        cy.contains("There's nothing to do.");
    });

    it("adds a new todo to the todolist", () => {
        cy.get('[data-cy="todo-input"]').type("New todo");
        cy.get('[data-cy="todo-submit"]').click();
        cy.get('[data-cy="todos"]').should("contain", "New todo");
        cy.get('[data-cy="todo-input"]').should("have.value", "");
    });
});
