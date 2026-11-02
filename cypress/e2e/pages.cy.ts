describe('pages', () => {
  it('serves the landing page', () => {
    cy.visit('/');
    cy.contains('h1', 'next-nest');
    cy.contains('a', '/graphql');
  });

  it('lists the seeded things from GraphQL', () => {
    cy.visit('/things');
    cy.contains('this is a thing you can order');
  });

  it('serves REST', () => {
    cy.request('/api').its('body.hello').should('eq', 'from NestJS');
  });

  it('passes GET /graphql on to GraphQL', () => {
    cy.request({
      url: '/graphql?query={things{name}}',
      headers: { 'apollo-require-preflight': 'true' },
    })
      .its('body.data.things')
      .should('have.length.greaterThan', 0);
  });

  it('rejects private pages without a session', () => {
    cy.request({ url: '/profile', failOnStatusCode: false })
      .its('status')
      .should('eq', 401);
  });
});
