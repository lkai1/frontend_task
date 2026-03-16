import { API_BASE_URL } from "../../api/config";

describe("Users App", () => {

    let createdUserId;

    const testUser = {
        name: "Test User",
        username: "testuser",
        email: "test@test.com",
        phone: "123456",
        website: "test.com",
        street: "Test Street",
        suite: "Suite 1",
        city: "Test City",
        zipcode: "12345",
        lat: "10",
        lng: "20",
        companyName: "Test Company",
        catchphrase: "Testing things",
        bs: "testing bs"
    };

    beforeEach(() => {
        cy.visit("/");
    });

    it("loads users page", () => {
        cy.contains("Users App Task").should("be.visible");
    });

    it("loads users from API", () => {
        cy.get('div.flex.flex-row.flex-wrap')
            .children()
            .should("have.length.greaterThan", 0);
    });

    it("creates a new user", () => {
        cy.intercept("POST", `${API_BASE_URL}/users`).as("createUser");

        cy.get('div.flex.flex-row.flex-wrap').children().then($list => {
            const initialCount = $list.length;

            cy.get('[data-cy="create-user-btn"]').click();
            cy.get('[data-cy="add-user-modal"]').should("be.visible");

            cy.get('[data-cy="input-name"]').type(testUser.name);
            cy.get('[data-cy="input-username"]').type(testUser.username);
            cy.get('[data-cy="input-email"]').type(testUser.email);
            cy.get('[data-cy="input-phone"]').type(testUser.phone);
            cy.get('[data-cy="input-website"]').type(testUser.website);

            cy.get('[data-cy="input-street"]').type(testUser.street);
            cy.get('[data-cy="input-suite"]').type(testUser.suite);
            cy.get('[data-cy="input-city"]').type(testUser.city);
            cy.get('[data-cy="input-zipcode"]').type(testUser.zipcode);
            cy.get('[data-cy="input-latitude"]').type(testUser.lat);
            cy.get('[data-cy="input-longitude"]').type(testUser.lng);

            cy.get('[data-cy="input-company-name"]').type(testUser.companyName);
            cy.get('[data-cy="input-catchphrase"]').type(testUser.catchphrase);
            cy.get('[data-cy="input-bs"]').type(testUser.bs);

            cy.get('button[type="submit"]').click();

            cy.wait("@createUser").then(({ response }) => {
                createdUserId = response.body.id;
            });

            cy.get('div.flex.flex-row.flex-wrap').children().should('have.length', initialCount + 1);
            cy.contains(testUser.name).should("exist");
        });
    });

    it("edits the created user", () => {
        cy.contains(`ID: ${createdUserId}`)
            .parent()
            .find('[data-cy="edit-user-btn"]')
            .click();

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

    it("deletes the updated user", () => {
        cy.get('div.flex.flex-row.flex-wrap').children().then($list => {
            const initialCount = $list.length;

            cy.contains(`ID: ${createdUserId}`)
                .parent()
                .find('[data-cy="delete-user-btn"]')
                .click();

            cy.get('div.flex.flex-row.flex-wrap').children().should('have.length', initialCount - 1);
            cy.contains("Updated User").should("not.exist");
        });
    });
});