// describe('test suite campaign', () => {
//   it('successfully create sheet', () => {
//     cy.visit('/');
//     cy.get('#loginzinho > form > #user').type('sophia')
//     cy.get('#loginzinho > form > #password').type('123')
//     cy.get('#loginzinho > form > button').click()
    
//     cy.get('.campaign > a').click()
//     cy.get('.createCampaign').click()
//     cy.get('#image').type('https://avatars.githubusercontent.com/u/67246528?v=4')
//     cy.get('#title').type('Sophia')
//     cy.get('#description').type('uma descrição')
//     cy.get('.actions > button').click()

//     cy.get(':nth-child(7) > [style=""]').should('have.string', 'Sophia')
//   })
// })