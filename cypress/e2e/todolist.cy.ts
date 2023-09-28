describe("todolist", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000");
    });

    it("fetches todos and displays a message if there are no todos", () => {
        cy.contains("TODO");
        cy.contains("There's nothing here.");
    });

    it("adds a new todo to the todolist", () => {
        cy.get('[data-cy="todo-input"]').type("New todo");
        cy.get('[data-cy="todo-submit"]').click();
        cy.get('[data-cy="todolist"]').should("contain", "New todo");
        cy.get('[data-cy="todo-input"]').should("have.value", "");
    });

    it("adds multiple todos to the list", () => {
        cy.get('[data-cy="todo-input"]').type("New todo");
        cy.get('[data-cy="todo-submit"]').click();
        cy.get('[data-cy="todo-input"]').type("New todo2");
        cy.get('[data-cy="todo-submit"]').click();
        cy.get('[data-cy="todo-input"]').type("New todo3");
        cy.get('[data-cy="todo-submit"]').click();
        cy.get('[data-cy="todolist"]').children().should("have.length", 3).and("contain", "New todo").and("contain", "New todo2").and("contain", "New todo3");
    });
});
