describe("edit a todo", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000");
    });

    it("clicks checkbox and marks a todo as complete", () => {
        cy.get('[data-cy="todo-input"]').type("New todo");
        cy.get('[data-cy="todo-submit"]').click();
        cy.get('[data-cy="todolist"]').should("contain", "New todo");
        cy.get('[data-cy="checkbox"]').should("not.have.descendants", "svg");
        cy.get('[data-cy="checkbox"]').click();
        cy.get('[data-cy="checkbox"]').should("have.descendants", "svg");
        cy.get('[data-cy="todolist"] li:first p').should("have.class", "line-through");
    });

    it("clicks todo text and marks a todo as complete", () => {
        cy.get('[data-cy="todo-input"]').type("New todo");
        cy.get('[data-cy="todo-submit"]').click();
        cy.get('[data-cy="todolist"]').should("contain", "New todo");
        cy.get('[data-cy="checkbox"]').should("not.have.descendants", "svg");
        cy.get('[data-cy="todolist"] li:first p').click();
        cy.get('[data-cy="checkbox"]').should("have.descendants", "svg");
        cy.get('[data-cy="todolist"] li:first p').should("have.class", "line-through");
    });

    it("edits the content of a todo", () => {
        cy.get('[data-cy="todo-input"]').type("To edit");
        cy.get('[data-cy="todo-submit"]').click();
        cy.get('[data-cy="edit"]').click();
        cy.get('[data-cy="todo-edit"]').type(" edited");
        cy.get('[data-cy="confirm"]').click();
        cy.get('[data-cy="todolist"]').should("contain", "edited");
    });
});
