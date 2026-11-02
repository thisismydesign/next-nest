describe('pages', () => {
  it('serves the Nest root', () => {
    cy.visit('/');
    cy.contains('Hello from NestJS');
  });

  it('serves the Next page', () => {
    cy.visit('/home');
    cy.contains('Hello from NextJS');
  });

  it('lists the seeded things from GraphQL', () => {
    cy.visit('/things');
    cy.contains('this is a thing you can order');
  });
});

describe('private pages', () => {
  it('reject visitors without a session', () => {
    cy.request({ url: '/profile', failOnStatusCode: false })
      .its('status')
      .should('eq', 401);
  });
});
