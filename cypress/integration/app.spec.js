describe("Board game", () => {
  it("adds a cell", () => {
    cy.visit("/");
    cy.get('[data-testid="table-body"]').find("tr").should("have.length", 0);
    cy.get('[data-testid="add-cell"]').click();
    cy.get('[data-testid="save-board"]').click();

    cy.get('[data-testid="table-body"]')
      .find("tr")
      .children()
      .should("have.length", 1);
  });

  it("removes a cell", () => {
    cy.visit("/");
    cy.get('[data-testid="table-body"]').find("tr").should("have.length", 0);
    cy.get('[data-testid="add-cell"]').click();
    cy.get('[data-testid="save-board"]').click();

    cy.get('[data-testid="table-body"]').find("tr").should("have.length", 1);

    cy.get('[data-testid="table-body"]').children().first().click();
    cy.get('[data-testid="remove-cell"]').click();

    cy.get('[data-testid="table-body"]')
      .find("tr")
      .children()
      .should("have.length", 0);
  });

  it("blinks with even pattern", () => {
    cy.visit("/");
    cy.get('[data-testid="add-cell"]').click();
    cy.get('[data-testid="save-board"]').click();

    cy.get('[data-testid="add-cell"]').click();
    cy.get('[data-testid="save-board"]').click();

    cy.get('[data-testid="table-body"]')
      .find("tr")
      .children()
      .first()
      .should("not.have.text", "OFF");

    cy.clock();
    cy.get('[data-testid="dropdown-select"]').select("even");
    cy.tick(3000);
    cy.get('[data-testid="table-body"]')
      .find("tr")
      .children()
      .first()
      .should("have.text", "OFF");
  });

  it("switches on all cells", () => {
    cy.visit("/");

    cy.get('[data-testid="add-cell"]').click();
    cy.get('[data-testid="single-switch"]').click();
    cy.get('[data-testid="save-board"]').click();

    cy.get('[data-testid="add-cell"]').click();
    cy.get('[data-testid="single-switch"]').click();
    cy.get('[data-testid="save-board"]').click();

    cy.get('[data-testid="table-body"]')
      .find("tr")
      .children()
      .each(($el, index, $list) => {
        cy.wrap($el).should("have.text", "OFF");
      });

    cy.get('[data-testid="app-switch"]').click();

    cy.get('[data-testid="table-body"]')
      .find("tr")
      .children()
      .each(($el, index, $list) => {
        cy.wrap($el).should("not.have.text", "OFF");
      });
  });

  it("switches on one cell", () => {
    cy.visit("/");

    cy.get('[data-testid="add-cell"]').click();
    cy.get('[data-testid="single-switch"]').click();
    cy.get('[data-testid="save-board"]').click();

    cy.get('[data-testid="add-cell"]').click();
    cy.get('[data-testid="single-switch"]').click();
    cy.get('[data-testid="save-board"]').click();

    cy.get('[data-testid="table-body"]')
      .find("tr")
      .children()
      .each(($el, index, $list) => {
        cy.wrap($el).should("have.text", "OFF");
      });

    cy.get('[data-testid="table-body"]').find("tr").children().first().click();
    cy.get('[data-testid="single-switch"]').click();
    cy.get('[data-testid="save-board"]').click();

    cy.get('[data-testid="table-body"]')
      .find("tr")
      .children()
      .first()
      .should("not.have.text", "OFF");
    cy.get('[data-testid="table-body"]')
      .find("tr")
      .children()
      .last()
      .should("have.text", "OFF");
  });

  it("updates a cell color", () => {
    cy.visit("/");

    cy.get('[data-testid="add-cell"]').click();
    cy.get('[data-testid="save-board"]').click();

    cy.get('[data-testid="table-body"]')
      .find("tr")
      .children()
      .first()
      .should("have.css", "background-color")
      .and("eq", "rgb(255, 0, 0)");

    cy.get('[data-testid="table-body"]').find('tr').children().first().click();
    cy.get('[data-testid="cell-color"]').select("green");
    cy.get('[data-testid="save-board"]').click();

    cy.get('[data-testid="table-body"]')
      .find("tr")
      .children()
      .first()
      .should("have.css", "background-color")
      .and("eq", "rgb(0, 128, 0)");
  });

  it("saves configuration in localStorage", () => {
    cy.visit("/");

    expect(localStorage.getItem('cells')).to.eq(null);

    cy.get('[data-testid="add-cell"]').click();
    cy.get('[data-testid="save-board"]').click();

    cy.get('[data-testid="save-config"]').click().should(() => {
      expect(localStorage.getItem('cells')).to.eq('[{"columns":[{"status":"on","color":"red"}]}]');
    });
  });
});
