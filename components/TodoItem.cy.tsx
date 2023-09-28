import TodoItem from "./TodoItem";

describe("<TodoItem />", () => {
    const todo = {
        _id: "1",
        title: "New todo",
        completed: false,
    };

    it("displays the todo item with correct components", () => {
        cy.mount(<TodoItem todo={todo} editTodo={cy.stub()} deleteTodo={cy.stub()} />);
        cy.get("li").should("include.text", "New todo");
        cy.get('[data-cy="checkbox"]').should("exist");
        cy.get('[data-cy="edit"]').should("exist");
        cy.get('[data-cy="delete"]').should("exist");
    });

    it("calls the editTodo callback when text is clicked", () => {
        const editTodo = cy.stub().as("editTodo");
        cy.mount(<TodoItem todo={todo} editTodo={editTodo} deleteTodo={cy.stub()} />);
        cy.get("li p").click();
        cy.get("@editTodo").should("have.been.calledWith", "1", { completed: true });
    });

    it("displays the correct components when edit button is clicked", () => {
        cy.mount(<TodoItem todo={todo} editTodo={cy.stub()} deleteTodo={cy.stub()} />);
        cy.get('[data-cy="edit"]').click();
        cy.get('[data-cy="confirm"]').should("exist");
        cy.get('[data-cy="decline"]').should("exist");
        cy.get('[data-cy="edit"]').should("not.exist");
    });

    it("calls the deleteTodo callback when delete button is clicked", () => {
        const deleteTodo = cy.stub().as("deleteTodo");
        cy.mount(<TodoItem todo={todo} editTodo={cy.stub()} deleteTodo={deleteTodo} />);
        cy.get('[data-cy="delete"]').click();
        cy.get("@deleteTodo").should("have.been.calledWith", "1");
    });
});
