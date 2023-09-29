describe("todolist", () => {
    beforeEach(() => {
        cy.intercept("http://localhost:8080/api/todos").as("todos");
        cy.request("POST", "http://localhost:8080/api/test/deleteAll");
        cy.visit("http://localhost:3000");
    });

    it("fetches todos and displays a message if there are no todos", () => {
        cy.contains("TODO");
        cy.wait("@todos");
        cy.contains("There's nothing here.");
    });

    it("adds a new todo to the todolist", () => {
        cy.wait("@todos");
        cy.get('[data-cy="todo-input"]').type("New todo");
        cy.get('[data-cy="todo-submit"]').click();
        cy.wait("@todos");
        cy.get('[data-cy="todolist"]').should("contain", "New todo");
        cy.get('[data-cy="todo-input"]').should("have.value", "");
    });

    it("adds multiple todos to the list", () => {
        cy.wait("@todos");
        cy.get('[data-cy="todo-input"]').type("New todo");
        cy.get('[data-cy="todo-submit"]').click();
        cy.wait("@todos");
        cy.get('[data-cy="todo-input"]').type("New todo2");
        cy.get('[data-cy="todo-submit"]').click();
        cy.wait("@todos");
        cy.get('[data-cy="todo-input"]').type("New todo3");
        cy.get('[data-cy="todo-submit"]').click();
        cy.wait("@todos");
        cy.get('[data-cy="todolist"]').children().should("have.length", 3).and("contain", "New todo").and("contain", "New todo2").and("contain", "New todo3");
    });

    it("displays a loading icon while fetching todos", () => {
        cy.get('[aria-label="oval-loading"]').should("be.visible");
        cy.contains("There's nothing to do.").should("not.exist");
        cy.get('[data-cy="todos"]').should("not.exist");
        cy.wait("@todos");
        cy.contains("There's nothing here.");
    });

    it("displays an error if cannot add todo", () => {
        cy.intercept("POST", "http://localhost:8080/api/todos", req => {
            req.reply(400, { success: false });
        }).as("addTodo");
        cy.wait("@todos");
        cy.get('[data-cy="todo-input"]').type("New todo");
        cy.get('[data-cy="todo-submit"]').click();
        cy.wait("@addTodo");
        cy.contains("New todo").should("not.exist");
        cy.contains("There was an error adding the todo. Please try again.");
    });
});

describe("todolist GET errors", () => {
    it("displays an error if cannot fetch todos", () => {
        cy.intercept("http://localhost:8080/api/todos", req => {
            req.reply(400, { success: false });
        }).as("todos");
        cy.visit("http://localhost:3000");
        cy.wait("@todos");
        cy.get('[data-cy="todos"]').should("not.exist");
        cy.contains("Oops, there's been an error. Please try again.");
    });

    it("displays a 404 error for an invalid route", () => {
        cy.request({ url: "http://localhost:3000/invalid", failOnStatusCode: false }).then(res => {
            expect(res.status).to.eq(404);
            expect(res.body).to.contain("This page could not be found");
        });
    });
});
