// describe('test suite spells', () => {
//     it('succesfully added spell', () => {
//             cy.visit('/');

//             cy.get('.registerAnchor').click()
//             cy.get('#cadastrinho > form > #user').type('login1')
//             cy.get('#email').type('login1@login1.com')
//             cy.get('#cadastrinho > form > #password').type('login1')

//             cy.get('#loginzinho > form > #user').type('login1')
//             cy.get('#loginzinho > form > #password').type('login1')
//             cy.get('#loginzinho > form > button').click()
//             cy.get('.createSheet').click()
//             cy.get('.container > :nth-child(2) > a').click()
//             cy.get('.openMagicModalBtn').click()
//             cy.get('.magicModal > .modal > form > .magicName > input').type('Rajada Mística')
//             cy.get('.magicModal > .modal > form > .magicDescription > textarea').type('Um feixe de energia estalante')
//             // cy.get('.magicModal > .modal > form > :nth-child(4) > .magicDiceType > #diceType').select('D10')
//             // cy.get('.magicModal > .modal > form > :nth-child(4) > .magicDiceQuant > input').type('1')
//             cy.get('.magicModal > .modal > form > .magicDamage > input').type('1D10')
//             cy.get('.magicModal > .modal > form > :nth-child(5) > .magicAttribute > select').select('Carisma')
//             cy.get('.magicModal > .modal > form > :nth-child(5) > .magicElement > input').type('Energia')
//             cy.get('#addMagicBtn').click()

//             cy.get('.magicList > li').invoke('text').should('have.string', 'Rajada Mística')
//     })
    
//     it('treating spell errors', () => {
//         cy.visit('/');
//             cy.get('#loginzinho > form > #user').type('login1')
//             cy.get('#loginzinho > form > #password').type('login1')
//             cy.get('#loginzinho > form > button').click()
//             cy.get('.createSheet').click()
//             cy.get('.container > :nth-child(2) > a').click()
//             cy.get('.openMagicModalBtn').click()
//             cy.get('#addMagicBtn').click()
//             cy.get('.magicModal > .modal > form > .magicName > input').type('Tempestade de Fogo')

//             cy.get('.magicName > span').invoke('text').should('have.string', 'Esse campo não pode ser vazio')
//             // cy.get('.magicDiceQuant > span').invoke('text').should('have.string', 'A quantidade não pode ser inferior a 1')
//             // cy.get('.magicElement > span').invoke('text').should('have.string', 'Esse campo não pode ser vazio')
//     })

//     // it('adding spell with same name', () => {
//     //     cy.visit('/');
//     //     cy.get('#loginzinho > form > #user').type('login1')
//     //     cy.get('#loginzinho > form > #password').type('login1')
//     //     cy.get('#loginzinho > form > button').click()
//     //     cy.get('.sheetCard > [style=""]').click()
//     //     cy.get('.openMagicModalBtn').click()
//     //     cy.get('.magicModal > .modal > form > .magicName > input').type('Onda Trovejante')
//     //     cy.get('.magicModal > .modal > form > .magicDescription > textarea').type('Atira uma onda de raios')
//     //     cy.get('.magicDamage > input').type('2d8')
//     //     cy.get('.magicModal > .modal > form > :nth-child(5) > .magicAttribute > select').select('Inteligência')
//     //     cy.get('.magicModal > .modal > form > :nth-child(5) > .magicElement > input').type('Trovejante')
//     //     cy.get('#addMagicBtn').click()
        
//     // })

// })