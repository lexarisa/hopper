describe('CityDashboard component test', () => {
  it('Should have a working search', () => {
    cy.visit('http://localhost:19006');
    cy.wait(3000)
    expect(cy.findByText('Zurich')).to.not.be.null;
    cy.findByRole('textbox').type('Par')
    expect(cy.findByText('Parma')).to.not.be.null;
    expect(cy.findByText('Paramaribo')).to.not.be.null;
    cy.findByText('Zurich').should('not.exist');
  })
});