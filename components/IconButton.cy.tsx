import IconButton from "./IconButton";
import { IconType } from "react-icons";

describe("<IconButton />", () => {
    const MockIcon: IconType = () => {
        return <div>Edit Button</div>;
    };

    it("renders the button with correct properties", () => {
        cy.mount(<IconButton action="edit" Icon={MockIcon} color="" handleClick={cy.stub()} />);
        cy.get("[data-cy='edit']").should("exist");
        cy.get("[data-cy='edit']").contains("Edit Button");
        cy.get("[data-cy='edit'] span").contains("edit").and("have.class", "sr-only");
    });

    context("when the user clicks on the button", () => {
        it("calls the handleClick callback", () => {
            const handleClick = cy.stub().as("handleClick");
            cy.mount(<IconButton action="edit" Icon={MockIcon} color="" handleClick={handleClick} />);
            cy.get('[data-cy="edit"]').click();
            cy.get("@handleClick").should("have.been.calledOnce");
        });
    });
});
