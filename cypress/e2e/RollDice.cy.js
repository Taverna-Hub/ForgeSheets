// describe('rolling dices', () => {
//     it('negative modifier roll', () =>{
//         cy.visit('/');
//         cy.get('#loginzinho > form > #user').type('Gabriel')
//         cy.get('#loginzinho > form > #password').type('123')
//         cy.get('#loginzinho > form > button').click()

//         cy.get('.diceButton').click()
//         cy.get('#quantityDice').type('2 1')
//         cy.get('#typeDice').type('10 20')
//         cy.get('#modDice').type('-2')
//         cy.get('.rollButton').click()

//         cy.get('#resultDisplay > :nth-child(1)').invoke('text').should('have.string', "Total:")
//         cy.get('#resultDisplay > :nth-child(3)').invoke('text').should('have.string', "Detalhes:")
//         cy.get('#resultDisplay > :nth-child(4)').invoke('text').should('have.string', "-2")
//         cy.get('#resultDisplay > :nth-child(4)').invoke('text').should('have.string', "2d10")
//         cy.get('#resultDisplay > :nth-child(4)').invoke('text').should('have.string', "1d20")
//     })

//     it('positive modifier roll', () =>{
//         cy.visit('/');
//         cy.get('#loginzinho > form > #user').type('Gabriel')
//         cy.get('#loginzinho > form > #password').type('123')
//         cy.get('#loginzinho > form > button').click()

//         cy.get('.diceButton').click()
//         cy.get('#quantityDice').type('2 2')
//         cy.get('#typeDice').type('4 6')
//         cy.get('#modDice').type('3')
//         cy.get('.rollButton').click()

//         cy.get('#resultDisplay > :nth-child(1)').invoke('text').should('have.string', "Total:")
//         cy.get('#resultDisplay > :nth-child(3)').invoke('text').should('have.string', "Detalhes:")
//         cy.get('#resultDisplay > :nth-child(4)').invoke('text').should('have.string', "+3")
//         cy.get('#resultDisplay > :nth-child(4)').invoke('text').should('have.string', "2d4")
//         cy.get('#resultDisplay > :nth-child(4)').invoke('text').should('have.string', "2d6")
//     })
//     it('quantity zero roll', () =>{
//         cy.visit('/');
//         cy.get('#loginzinho > form > #user').type('Gabriel')
//         cy.get('#loginzinho > form > #password').type('123')
//         cy.get('#loginzinho > form > button').click()

//         cy.get('.diceButton').click()
//         cy.get('#quantityDice').type('0 2')
//         cy.get('#typeDice').type('4 6')
//         cy.get('#modDice').type('3')
//         cy.get('.rollButton').click()
//         cy.get('#quantityError').invoke('text').should('have.string', "A quantidade de dados não pode ser zero.")

        
//     })
//     it('non integer roll', () =>{
//         cy.visit('/');
//         cy.get('#loginzinho > form > #user').type('Gabriel')
//         cy.get('#loginzinho > form > #password').type('123')
//         cy.get('#loginzinho > form > button').click()

//         cy.get('.diceButton').click()
//         cy.get('#quantityDice').type('zero dois')
//         cy.get('#typeDice').type('vinte seis')
//         cy.get('#modDice').type('três')
//         cy.get('.rollButton').click()
//         cy.get('#quantityError').invoke('text').should('have.string', "A quantidade de dados deve ser composta apenas por números inteiros.")
//         cy.get('#typeError').invoke('text').should('have.string', "Os tipos dos dados devem ser composto apenas por números inteiros.")
//         cy.get('#modifierError').invoke('text').should('have.string', "Os modificadores devem ser compostos apenas por números inteiros.")
        
//     })
// })