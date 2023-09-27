import TodoForm from "./TodoForm";

describe("<TodoForm />", () => {
    it("renders a form with a field to add todo", () => {
        cy.mount(<TodoForm onSubmit={cy.stub()} />);
        cy.get("form").should("exist");
        cy.get("[data-cy='todo-input']").type("New todo");
        cy.get("[data-cy='todo-input']").should("contain.value", "New todo");
    });

    context("when a user submits an empty todo", () => {
        it("calls the onSubmit callback with the todo", () => {
            const onSubmit = cy.stub().as("onSubmit");
            cy.mount(<TodoForm onSubmit={onSubmit} />);
            cy.get('[data-cy="todo-input"]').type("New todo");
            cy.get('[data-cy="todo-submit"]').click();
            cy.get("@onSubmit").should("have.been.calledWith", "New todo");
        });

        it("clears the input field once submitted", () => {
            const onSubmit = cy.stub();
            cy.mount(<TodoForm onSubmit={onSubmit} />);
            cy.get('[data-cy="todo-input"]').type("New todo");
            cy.get('[data-cy="todo-submit"]').click();
            cy.get('[data-cy="todo-input"]').should("have.value", "");
        });
    });

    context("when a user submits an empty todo", () => {
        it("shows an error message and does not submit the form", () => {
            const onSubmit = cy.stub().as("onSubmit");
            cy.mount(<TodoForm onSubmit={onSubmit} />);
            cy.get('[data-cy="todo-submit"]').click();
            cy.get('[data-cy="todo-error"]').should("be.visible");
            cy.get("@onSubmit").should("not.have.been.called");
        });
    });
});
