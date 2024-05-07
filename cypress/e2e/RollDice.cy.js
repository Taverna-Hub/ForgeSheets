Cypress.Commands.add('removeDatabase', () => {
    cy.exec('rm ./db.sqlite3')
    cy.exec('python3 manage.py migrate')
})

Cypress.Commands.add('registerLogin', () => {
    cy.removeDatabase()

    cy.get('.registerAnchor').click()
    cy.get('#cadastrinho > form > #user').type('rolldice')
    cy.get('#email').type('roll@dice.com')
    cy.get('#cadastrinho > form > #password').type('rolldice')
    cy.get('#cadastrinho > form > button').click()
    
    cy.get('#loginzinho > form > #user').type('rolldice')
    cy.get('#loginzinho > form > #password').type('rolldice')
    cy.get('#loginzinho > form > button').click()

})

describe('rolling dices', () => {
    it('successful dice roll', () =>{
        cy.visit('/');
        cy.exec('rm ./db.sqlite3')
        cy.exec('python3 manage.py migrate')

        cy.get('.registerAnchor').click()
        cy.get('#cadastrinho > form > #user').type('rolldice')
        cy.get('#email').type('roll@dice.com')
        cy.get('#cadastrinho > form > #password').type('rolldice')
        cy.get('#cadastrinho > form > button').click()
        
        cy.get('#loginzinho > form > #user').type('rolldice')
        cy.get('#loginzinho > form > #password').type('rolldice')
        cy.get('#loginzinho > form > button').click()
    
        cy.get('.diceButton').click()
        cy.get('#quantityDice').type('2 3')
        cy.get('#typeDice').type('6 8')
        cy.get('#modDice').type('2')
        cy.get('.rollButton').click()
    
        cy.get('#resultDisplay > :nth-child(1)').invoke('text').should('have.string', "Total:")
        cy.get('#resultDisplay > :nth-child(3)').invoke('text').should('have.string', "Detalhes:")
        cy.get('#resultDisplay > :nth-child(4)').invoke('text').should('have.string', "+2")
        cy.get('#resultDisplay > :nth-child(4)').invoke('text').should('have.string', "2d6")
        cy.get('#resultDisplay > :nth-child(4)').invoke('text').should('have.string', "3d8")
    })

    it('trying to submit an out-of-scope modifier', () =>{
        cy.visit('/');

        cy.registerLogin()

        cy.get('.diceButton').click()
        cy.get('#quantityDice').type('2 3')
        cy.get('#typeDice').type('6 8')
        cy.get('#modDice').type('-800')
        cy.get('.rollButton').click()

        cy.get('#modifierError > span').invoke('text').should('have.string', 'Insira um número entre -20 e 20.')
    })

    it('trying to submit different quantities of types and dice', () =>{
        cy.visit('/');
        
        cy.registerLogin()

        cy.get('.diceButton').click()
        cy.get('#quantityDice').type('2 3 6')
        cy.get('#typeDice').type('6 8')
        cy.get('#modDice').type('2')
        cy.get('.rollButton').click()

        cy.get('#quantityError > span').invoke('text').should('have.string', 'Adicione a quantidade de dados rolados para cada tipo de dado.')  
    })

    it('trying to submit ouf-of-scope dice type', () =>{
        cy.visit('/');
        
        cy.registerLogin()

        cy.get('.diceButton').click()
        cy.get('#quantityDice').type('2 4 6')
        cy.get('#typeDice').type('5 13 2')
        cy.get('#modDice').type('2')
        cy.get('.rollButton').click()

        cy.get('#typeError > span').invoke('text').should('have.string', 'Somente D4, D6, D8, D10, D12, D20, e D100 são permitidos.')
    })
})