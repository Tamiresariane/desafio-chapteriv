/// <reference types="cypress" />

context('Cadastro', () => {
    beforeEach(() => {
      cy.visit('http://automationpractice.com/index.php');
    })
  
  
    it('Deve realizar o cadastro', () => {

      cy.intercept('POST', 'http://automationpractice.com/index.php').as('CreateAnAccountRequest')

      //clicar botão Sign in
      cy.get('.header_user_info > .login').click();
      cy.url().should('include', '/index.php?controller=authentication&back=my-account');
      //digitar um endereço de email 
      cy.get('.form-group > #email_create').should('be.visible').type('tamires1@example.com');
      cy.get('.submit > #SubmitCreate').should('be.visible').click();


      cy.wait('@CreateAnAccountRequest').then((res) => {
        expect(res.response.statusCode).to.equal(200);
      });

      //cadastro
      cy.get('#id_gender2').should('be.visible').check();
      cy.get('#customer_firstname').type('Tamires');
      cy.get('#customer_lastname').type('QA');
      cy.get('#passwd').type('123456');
      cy.get('#days').select('16');
      cy.get('#months').select('August');
      cy.get('#years').select('1997');
      cy.get('#newsletter').check();
      cy.get('#optin').check();

      //address
      cy.get('#firstname').type('Tamires');
      cy.get('#lastname').type('QA');
      cy.get('#address1').type('rua felipe'); 
      cy.get('#city').type('Russas');
      cy.get('#postcode').type('12345');
      cy.get('#id_state').select('New York');
      cy.get('#phone_mobile').type('00 00000-0000');
      cy.get('#alias').type('casa');
      cy.get('#submitAccount').click();

      cy.pause();

    });


  })