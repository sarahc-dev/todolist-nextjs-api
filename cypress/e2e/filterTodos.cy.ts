describe("filters todolist", () => {
    beforeEach(() => {
        cy.intercept("http://localhost:8080/api/todos").as("todos");
        cy.request("POST", "http://localhost:8080/api/test/deleteAll");
        cy.visit("http://localhost:3000");
    });

    it("filters completed todos", () => {
        cy.wait("@todos", { timeout: 10000 });
        cy.get('[data-cy="todo-input"]').type("New todo");
        cy.get('[data-cy="todo-submit"]').click();
        cy.get('[data-cy="todo-input"]').type("New todo2");
        cy.get('[data-cy="todo-submit"]').click();
        cy.get('[data-cy="checkbox"]').eq(0).click();
        cy.get('[data-cy="filterCompletedTodos"]').click();
        cy.get('[data-cy="todolist"]').should("contain", "New todo").and("not.contain", "New todo2");
    });

    it("filters incomplete todos", () => {
        cy.wait("@todos", { timeout: 10000 });
        cy.get('[data-cy="todo-input"]').type("New todo");
        cy.get('[data-cy="todo-submit"]').click();
        cy.get('[data-cy="todo-input"]').type("Another todo");
        cy.get('[data-cy="todo-submit"]').click();
        cy.get('[data-cy="checkbox"]').eq(0).click();
        cy.get('[data-cy="filterIncompleteTodos"]').click();
        cy.get('[data-cy="todolist"]').should("contain", "Another todo").and("not.contain", "New todo");
    });

    it("correctly filters newly added todo when completed selected", () => {
        cy.wait("@todos", { timeout: 10000 });
        cy.get('[data-cy="todo-input"]').type("New todo");
        cy.get('[data-cy="todo-submit"]').click();
        cy.wait("@todos");
        cy.get('[data-cy="checkbox"]').eq(0).click();
        cy.get('[data-cy="filterCompletedTodos"]').click();
        cy.get('[data-cy="todo-input"]').type("Incomplete todo");
        cy.get('[data-cy="todo-submit"]').click();
        cy.wait("@todos");
        cy.get('[data-cy="todolist"]').children().should("have.length", 1).and("contain", "New todo").and("not.contain", "Incomplete todo");
    });

    it("correctly filters newly added todo when incomplete selected", () => {
        cy.wait("@todos", { timeout: 10000 });
        cy.get('[data-cy="todo-input"]').type("New todo");
        cy.get('[data-cy="todo-submit"]').click();
        cy.wait("@todos");
        cy.get('[data-cy="checkbox"]').eq(0).click();
        cy.get('[data-cy="filterIncompleteTodos"]').click();
        cy.get('[data-cy="todo-input"]').type("Another todo");
        cy.get('[data-cy="todo-submit"]').click();
        cy.wait("@todos");
        cy.get('[data-cy="todolist"]').children().should("have.length", 1).and("contain", "Another todo").and("not.contain", "New todo");
    });
});
