describe('pages', () => {
  it('serves the Nest root', () => {
    cy.visit('/');
    cy.contains('Hello from NestJS');
  });

  it('serves the Next page', () => {
    cy.visit('/home');
    cy.contains('Hello from NextJS');
  });
});
