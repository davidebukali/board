describe("Board game", () => {
  it("adds a cell", () => {
    cy.visit("http://localhost:8080");
    cy.get(".tableBody").should(($el) => {
      expect($el.text().trim()).equal("");
    });
    cy.get(".addBulb").click();
    cy.get(".saveBoard").click();

    cy.get(".tableBody").should("have.length", 1);
  });
});
