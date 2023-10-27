import EditTodo from "./EditTodo";

describe("<EditTodo />", () => {
    it("edits the existing todo", () => {
        cy.mount(<EditTodo title="Todo" confirmEdit={cy.stub()} setEditMode={cy.stub()} />);
        cy.get("input").should("have.value", "Todo").and("have.focus");
        cy.get("input").type(" new").should("have.value", "Todo new");
    });

    it("calls the confirmEdit callback with edited value if edit confirmed", () => {
        const confirmEdit = cy.stub().as("confirmEdit");
        cy.mount(<EditTodo title="Todo" confirmEdit={confirmEdit} setEditMode={cy.stub()} />);
        cy.get("input").type(" edited");
        cy.get("[data-cy='confirm']").click();
        cy.get("@confirmEdit").should("have.been.calledWith", "Todo edited");
    });

    it("displays an error if editedTodo in blank", () => {
        const confirmEdit = cy.stub().as("confirmEdit");
        cy.mount(<EditTodo title="Todo" confirmEdit={confirmEdit} setEditMode={cy.stub()} />);
        cy.get("input").clear();
        cy.get("[data-cy='confirm']").click();
        cy.get("@confirmEdit").should("not.have.been.called");
        cy.get("input").should("have.attr", "placeholder", "Cannot be blank");
    });

    it("calls the setEditMode callback with false if edit declined", () => {
        const setEditMode = cy.stub().as("setEditMode");
        cy.mount(<EditTodo title="Todo" confirmEdit={cy.stub()} setEditMode={setEditMode} />);
        cy.get("input").type(" new");
        cy.get("[data-cy='decline']").click();
        cy.get("@setEditMode").should("have.been.calledWith", false);
    });
});
