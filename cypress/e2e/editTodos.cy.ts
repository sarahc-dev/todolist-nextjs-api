describe("edit a todo", () => {
    beforeEach(() => {
        cy.intercept("http://localhost:8080/api/todos").as("todos");
        cy.request("POST", "http://localhost:8080/api/test/deleteAll");
        cy.visit("http://localhost:3000");
    });

    it("clicks checkbox and marks a todo as complete", () => {
        cy.intercept("PATCH", "http://localhost:8080/api/todos").as("editTodo");

        cy.wait("@todos");
        cy.get('[data-cy="todo-input"]').type("New todo");
        cy.get('[data-cy="todo-submit"]').click();
        cy.wait("@todos");
        cy.get('[data-cy="todolist"]').should("contain", "New todo");
        cy.get('[data-cy="checkbox"]').should("not.have.descendants", "svg");
        cy.get('[data-cy="checkbox"]').click();
        cy.get('[data-cy="checkbox"]').should("have.descendants", "svg");
        cy.get('[data-cy="todolist"] li:first p').should("have.class", "line-through");
    });

    it("clicks todo text and marks a todo as complete", () => {
        cy.wait("@todos");
        cy.get('[data-cy="todo-input"]').type("New todo");
        cy.get('[data-cy="todo-submit"]').click();
        cy.wait("@todos");
        cy.get('[data-cy="todolist"]').should("contain", "New todo");
        cy.get('[data-cy="checkbox"]').should("not.have.descendants", "svg");
        cy.get('[data-cy="todolist"] li:first p').click();
        cy.get('[data-cy="checkbox"]').should("have.descendants", "svg");
        cy.get('[data-cy="todolist"] li:first p').should("have.class", "line-through");
    });

    it("edits the content of a todo", () => {
        cy.wait("@todos");
        cy.get('[data-cy="todo-input"]').type("To edit");
        cy.get('[data-cy="todo-submit"]').click();
        cy.wait("@todos");
        cy.get('[data-cy="edit"]').click();
        cy.get('[data-cy="todo-edit"]').type(" edited");
        cy.get('[data-cy="confirm"]').click();
        cy.get('[data-cy="todolist"]').should("contain", "edited");
    });

    it("deletes a todo", () => {
        cy.wait("@todos");
        cy.get('[data-cy="todo-input"]').type("To delete");
        cy.get('[data-cy="todo-submit"]').click();
        cy.wait("@todos");
        cy.get('[data-cy="delete"]').click();
        cy.contains("There's nothing here.");
    });

    it("displays an error if cannot edit todo", () => {
        cy.intercept("POST", "http://localhost:8080/api/todos").as("addTodo");

        cy.wait("@todos");
        cy.get('[data-cy="todo-input"]').type("New todo");
        cy.get('[data-cy="todo-submit"]').click();
        cy.wait("@addTodo").then(res => {
            const id = res.response?.body._id;
            // cy.log("New todo id: ", id);

            cy.intercept("PATCH", `http://localhost:8080/api/todos/${id}`, req => {
                req.reply(400, { success: false });
            }).as("editTodo");

            cy.get('[data-cy="todolist"]').should("contain", "New todo");
            cy.get('[data-cy="checkbox"]').click();
            cy.wait("@editTodo");
            cy.contains("There was an error updating the todo. Please try again.");
        });
    });

    it("displays an error if cannot delete todo", () => {
        cy.intercept("POST", "http://localhost:8080/api/todos").as("addTodo");

        cy.wait("@todos");
        cy.get('[data-cy="todo-input"]').type("New todo");
        cy.get('[data-cy="todo-submit"]').click();
        cy.wait("@addTodo").then(res => {
            const id = res.response?.body._id;
            // cy.log("New todo id: ", id);

            cy.intercept("DELETE", `http://localhost:8080/api/todos/${id}`, req => {
                req.reply(400, { success: false });
            }).as("deleteTodo");

            cy.get('[data-cy="todolist"]').should("contain", "New todo");
            cy.get('[data-cy="delete"]').click();
            cy.wait("@deleteTodo");
            cy.contains("There was an error deleting the todo. Please try again.");
        });
    });
});
