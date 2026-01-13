describe('Basic E2E Test', () => {
  it('should load the home page', () => {
    cy.visit('/');
    cy.url().should('not.include', '/login');
    cy.contains('Soundcult').should('be.visible');
  });

  it('should allow user to login', () => {
    cy.visit('/login');

    // Fill in the login form
    cy.get('input[name="username"]').type('test');
    cy.get('input[name="password"]').type('test');

    // Submit the form
    cy.get('button[type="submit"]').click();

    // Should redirect to product page after successful login
    cy.url().should('not.include', '/login');
    cy.url().should('include', '/product');
  });
});

