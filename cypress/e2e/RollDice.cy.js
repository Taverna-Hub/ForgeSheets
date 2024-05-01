describe('rolling dices', () => {
    it('negative modifier roll', () =>{
        cy.visit('/');
        cy.get('#loginzinho > form > #user').type('Gabriel')
        cy.get('#loginzinho > form > #password').type('123')
        cy.get('#loginzinho > form > button').click()

        cy.get('.diceButton').click()
        cy.get('#quantityDice').type('2 1')
        cy.get('#typeDice').type('10 20')
        cy.get('#modDice').type('-2')
        cy.get('.rollButton').click()

        cy.get('#resultDisplay > :nth-child(1)').invoke('text').should('have.string', "Total:")
        cy.get('#resultDisplay > :nth-child(3)').invoke('text').should('have.string', "Detalhes:")
        cy.get('#resultDisplay > :nth-child(4)').invoke('text').should('have.string', "-2")
    })

    it('positive modifier roll', () =>{
        cy.visit('/');
        cy.get('#loginzinho > form > #user').type('Gabriel')
        cy.get('#loginzinho > form > #password').type('123')
        cy.get('#loginzinho > form > button').click()

        cy.get('.diceButton').click()
        cy.get('#quantityDice').type('2 2')
        cy.get('#typeDice').type('4 6')
        cy.get('#modDice').type('3')
        cy.get('.rollButton').click()

        cy.get('#resultDisplay > :nth-child(1)').invoke('text').should('have.string', "Total:")
        cy.get('#resultDisplay > :nth-child(3)').invoke('text').should('have.string', "Detalhes:")
        cy.get('#resultDisplay > :nth-child(4)').invoke('text').should('have.string', "+3")
    })
})