import TodoItem from "./TodoItem";

describe("<TodoItem />", () => {
    const todo = {
        _id: "1",
        title: "New todo",
        completed: false,
    };

    it("displays the todo item with correct components", () => {
        cy.mount(<TodoItem todo={todo} editTodo={cy.stub()} />);
        cy.get("li").should("include.text", "New todo");
    });
});
