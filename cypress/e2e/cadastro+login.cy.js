describe('test suite Sheet', () => {
    it('criando conta e fazendo o login', () => {
        cy.visit('/');
        cy.get('.registerAnchor').click()
        cy.get('#cadastrinho > form > #user').type('Gabriel')
        cy.get('#email').type('gabriel@gmail.com')
        cy.get('#cadastrinho > form > #password').type('123')
        cy.get('#cadastrinho > form > button').click()
        cy.get('#loginzinho > form > #user').type('Gabriel')
        cy.get('#loginzinho > form > #password').type('123')
        cy.get('#loginzinho > form > button').click()
    })
})