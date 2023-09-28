import Checkbox from "./Checkbox";

describe("<Checkbox />", () => {
    context("when the item is incomplete", () => {
        it("displays an empty button", () => {
            cy.mount(<Checkbox complete={false} toggleCheckbox={cy.stub()} />);
            cy.get('[data-cy="checkbox"]').should("not.have.descendants", "svg");
        });

        it("displays correct screenreader text", () => {
            cy.mount(<Checkbox complete={false} toggleCheckbox={cy.stub()} />);
            cy.get("[data-cy='checkbox'] span").contains("Mark as complete").and("have.class", "sr-only");
        });
    });

    context("when the item is complete", () => {
        it("displays a checkmark", () => {
            cy.mount(<Checkbox complete={true} toggleCheckbox={cy.stub()} />);
            cy.get('[data-cy="checkbox"]').should("have.descendants", "svg");
        });

        it("displays correct screenreader text", () => {
            cy.mount(<Checkbox complete={true} toggleCheckbox={cy.stub()} />);
            cy.get("[data-cy='checkbox'] span").contains("Mark as incomplete").and("have.class", "sr-only");
        });
    });

    context("when the user clicks on the checkbox", () => {
        it("calls the toggleCheckbox callback", () => {
            const markAsComplete = cy.stub().as("markAsComplete");
            cy.mount(<Checkbox toggleCheckbox={markAsComplete} complete={false} />);
            cy.get('[data-cy="checkbox"]').click();
            cy.get("@markAsComplete").should("have.been.calledOnce");
        });
    });
});
