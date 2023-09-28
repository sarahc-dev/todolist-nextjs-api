import TodoList from "./TodoList";

describe("<TodoList />", () => {
    const todoItems = [
        {
            _id: "1",
            title: "New todo",
            completed: false,
        },
        {
            _id: "2",
            title: "Feed cat",
            completed: false,
        },
    ];

    it("displays a list of todos", () => {
        cy.mount(<TodoList items={todoItems} editTodo={cy.stub()} />);
        cy.get("ul").children().should("have.length", 2);
        cy.get("li:first").contains("New todo");
        cy.get("li:last").contains("Feed cat");
    });

    it("displays a message when there are no todos", () => {
        cy.mount(<TodoList items={[]} editTodo={cy.stub()} />);
        cy.contains("There's nothing here.");
    });
});
