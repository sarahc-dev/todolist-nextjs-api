import FilterTodos from "./FilterTodos";

describe("<FilterTodos />", () => {
    it("calls setActive filter with all when All clicked", () => {
        const setActiveFilter = cy.stub().as("setActive");
        cy.mount(<FilterTodos activeFilter="all" setActiveFilter={setActiveFilter} />);
        cy.get('[data-cy="filterAllTodos"]').click();
        cy.get("@setActive").should("have.been.calledWith", "all");
    });

    it("displays All filter selected", () => {
        cy.mount(<FilterTodos activeFilter="all" setActiveFilter={cy.stub()} />);
        cy.get('[data-cy="filterAllTodos"]').should("have.class", "border-b-2");
        cy.get('[data-cy="filterCompletedTodos"]').should("not.have.class", "border-b-2");
        cy.get('[data-cy="filterIncompleteTodos"]').should("not.have.class", "border-b-2");
    });

    it("calls setActive filter with completed when Completed clicked", () => {
        const setActiveFilter = cy.stub().as("setActive");
        cy.mount(<FilterTodos activeFilter="all" setActiveFilter={setActiveFilter} />);
        cy.get('[data-cy="filterCompletedTodos"]').click();
        cy.get("@setActive").should("have.been.calledWith", "completed");
    });

    it("displays Completed filter selected", () => {
        cy.mount(<FilterTodos activeFilter="completed" setActiveFilter={cy.stub()} />);
        cy.get('[data-cy="filterCompletedTodos"]').should("have.class", "border-b-2");
        cy.get('[data-cy="filterAllTodos"]').should("not.have.class", "border-b-2");
        cy.get('[data-cy="filterIncompleteTodos"]').should("not.have.class", "border-b-2");
    });

    it("calls setActive filter with incomplete when Incomplete clicked", () => {
        const setActiveFilter = cy.stub().as("setActive");
        cy.mount(<FilterTodos activeFilter="all" setActiveFilter={setActiveFilter} />);
        cy.get('[data-cy="filterIncompleteTodos"]').click();
        cy.get("@setActive").should("have.been.calledWith", "incomplete");
    });

    it("displays Incomplete filter selected", () => {
        cy.mount(<FilterTodos activeFilter="incomplete" setActiveFilter={cy.stub()} />);
        cy.get('[data-cy="filterIncompleteTodos"]').should("have.class", "border-b-2");
        cy.get('[data-cy="filterAllTodos"]').should("not.have.class", "border-b-2");
        cy.get('[data-cy="filterCompletedTodos"]').should("not.have.class", "border-b-2");
    });
});
