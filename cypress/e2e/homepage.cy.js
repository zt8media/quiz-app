describe('Homepage Tests', () => {
    const baseUrl = 'http://localhost:5173';
  
    it('should load the homepage successfully', () => {
      cy.visit(baseUrl);
      cy.get('img[alt="Logo"]').should('be.visible');
      cy.contains('Your guided path to programming enlightenment').should('be.visible');
      cy.get('nav').should('be.visible');
      cy.get('footer').should('be.visible');
    });
  
    it('should navigate to the generate page when Begin Journey is clicked', () => {
      cy.visit(baseUrl);
      cy.contains('Begin Journey').click();
      cy.url().should('include', '/generate');
    });
  
    it('should display personalized quizzes section', () => {
      cy.visit(baseUrl);
      cy.contains('Personalized Quizzes').should('be.visible');
    });
  
    it('should display correctly on mobile', () => {
      cy.viewport('iphone-6');
      cy.visit(baseUrl);
      cy.get('nav').should('be.visible');
      cy.get('footer').should('be.visible');
    });
  });