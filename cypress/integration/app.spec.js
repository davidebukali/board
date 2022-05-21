describe("Board game", () => {
  it("adds a cell", () => {
    cy.visit("http://localhost:8080");
    cy.get('[data-testid="table-body"]').find('tr').should("have.length", 0);
    cy.get('[data-testid="add-cell"]').click();
    cy.get('[data-testid="save-board"]').click();

    cy.get('[data-testid="table-body"]').find('tr').children().should("have.length", 1);
  });

  it("removes a cell", () => {
    cy.visit("http://localhost:8080");
    cy.get('[data-testid="table-body"]').find('tr').should("have.length", 0);
    cy.get('[data-testid="add-cell"]').click();
    cy.get('[data-testid="save-board"]').click();

    cy.get('[data-testid="table-body"]').find('tr').should("have.length", 1);

    cy.get('[data-testid="table-body"]').children().first().click();
    cy.get('[data-testid="remove-cell"]').click();

    cy.get('[data-testid="table-body"]').find('tr').children().should("have.length", 0);
  });

  it("blinks with even pattern", () => {
    cy.visit("http://localhost:8080");
    cy.get('[data-testid="add-cell"]').click();
    cy.get('[data-testid="save-board"]').click();

    cy.get('[data-testid="add-cell"]').click();
    cy.get('[data-testid="save-board"]').click();

    cy.clock();
    cy.get('[data-testid="dropdown-select"]').select('even');
    cy.tick(3000);
    cy.get('[data-testid="table-body"]').find('tr').children().first().should("have.text", "OFF");
  });

  it("switches off all cells", () => {
    cy.visit("http://localhost:8080");

    cy.get('[data-testid="add-cell"]').click();
    cy.get('[data-testid="single-switch"]').click();
    cy.get('[data-testid="save-board"]').click();

    cy.get('[data-testid="add-cell"]').click();
    cy.get('[data-testid="single-switch"]').click();
    cy.get('[data-testid="save-board"]').click();

    cy.get('[data-testid="table-body"]').find('tr').children().each(($el, index, $list) => {
      cy.wrap($el).should("have.text", "OFF");
    });

    cy.get('[data-testid="app-switch"]').click();

    cy.get('[data-testid="table-body"]').find('tr').children().each(($el, index, $list) => {
      cy.wrap($el).should("not.have.text", "OFF");
    });
  });
});
