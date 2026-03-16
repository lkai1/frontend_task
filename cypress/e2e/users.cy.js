describe("Users App", () => {

    beforeEach(() => {
        cy.visit("/");
    });

    it("loads users page", () => {
        cy.contains("Users App Task").should("be.visible");
    });

    it("loads users from API", () => {
        cy.visit("/");

        cy.get('div.flex.flex-row.flex-wrap')
            .children()
            .should("have.length.greaterThan", 0);
    });

    it("creates a new user", () => {
        cy.get('div.flex.flex-row.flex-wrap').children().then($list => {
            const initialCount = $list.length;

            cy.get('[data-cy="create-user-btn"]').click();
            cy.get('[data-cy="add-user-modal"]').should("be.visible");

            cy.get('[data-cy="input-name"]').type("Test User");
            cy.get('[data-cy="input-username"]').type("testuser");
            cy.get('[data-cy="input-email"]').type("test@test.com");
            cy.get('[data-cy="input-phone"]').type("123456");
            cy.get('[data-cy="input-website"]').type("test.com");

            cy.get('[data-cy="input-street"]').type("Test street");
            cy.get('[data-cy="input-suite"]').type("Suite 1");
            cy.get('[data-cy="input-city"]').type("Test City");
            cy.get('[data-cy="input-zipcode"]').type("12345");

            cy.get('[data-cy="input-latitude"]').type("10");
            cy.get('[data-cy="input-longitude"]').type("20");

            cy.get('[data-cy="input-company-name"]').type("Test Company");
            cy.get('[data-cy="input-catchphrase"]').type("Testing things");
            cy.get('[data-cy="input-bs"]').type("testing bs");

            cy.get('button[type="submit"]').click();

            cy.get('div.flex.flex-row.flex-wrap').children().should('have.length', initialCount + 1);

            cy.contains("Test User").should("exist");
        });
    });

    it("edits a user", () => {
        cy.get('[data-cy="edit-user-btn"]').first().click();

        cy.get('[data-cy="edit-user-modal"]').should("exist").and("be.visible");

        cy.get('[data-cy="input-name"]').clear().type("Updated User");
        cy.get('[data-cy="input-username"]').clear().type("updatedusername");
        cy.get('[data-cy="input-email"]').clear().type("updated@test.com");
        cy.get('[data-cy="input-phone"]').clear().type("987654");
        cy.get('[data-cy="input-website"]').clear().type("updated.com");

        cy.get('[data-cy="input-street"]').clear().type("Updated Street");
        cy.get('[data-cy="input-suite"]').clear().type("Suite 2");
        cy.get('[data-cy="input-city"]').clear().type("Updated City");
        cy.get('[data-cy="input-zipcode"]').clear().type("54321");

        cy.get('[data-cy="input-latitude"]').clear().type("30");
        cy.get('[data-cy="input-longitude"]').clear().type("40");

        cy.get('[data-cy="input-company-name"]').clear().type("Updated Company");
        cy.get('[data-cy="input-catchphrase"]').clear().type("Updated Catchphrase");
        cy.get('[data-cy="input-bs"]').clear().type("Updated BS");

        cy.get('[data-cy="save-changes-btn"]').click();

        cy.contains("Updated User").should("exist");
        cy.contains("Updated Company").should("exist");
    });

    it("deletes a user", () => {
        cy.get('div.flex.flex-row.flex-wrap').children().then($list => {
            const initialCount = $list.length;

            cy.get('[data-cy="delete-user-btn"]').first().click();

            cy.get('div.flex.flex-row.flex-wrap').children().should('have.length', initialCount - 1);
        });
    });
});