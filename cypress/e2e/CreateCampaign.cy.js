// describe('test suite campaign', () => {
//   it('criação de campanha - com imagem', () => {
//     cy.visit('/');
//     cy.get('.registerAnchor').click()
//     cy.get('#cadastrinho > form > #user').type('sophia')
//     cy.get('#email').type('sophia@gmail.com')
//     cy.get('#cadastrinho > form > #password').type('123')
//     cy.get('#cadastrinho > form > button').click()
//     cy.get('#loginzinho > form > #user').type('sophia')
//     cy.get('#loginzinho > form > #password').type('123')
//     cy.get('#loginzinho > form > button').click()
    
//     cy.get('.campaign > a').click()
//     cy.get('.createCampaign').click()
//     cy.get('#image').type('https://avatars.githubusercontent.com/u/67246528?v=4')
//     cy.get('#title').type('Sophia')
//     cy.get('#description').type('uma descrição')
//     cy.get('.actions > button').click()

//     cy.get(':nth-child(1) > h2').last().invoke('text').should('have.string', 'Sophia')
//     cy.get(':nth-child(1) > .campaignInfo > p').last().invoke('text').should('have.string', ' uma descrição')
//   })
//   it('criação de campanha - sem imagem', () => {
//     cy.visit('/');
//     cy.get('#loginzinho > form > #user').type('sophia')
//     cy.get('#loginzinho > form > #password').type('123')
//     cy.get('#loginzinho > form > button').click()
    
//     cy.get('.campaign > a').click()
//     cy.get('.createCampaign').click()
//     cy.get('#title').type('Sophia Gallindo')
//     cy.get('#description').type('uma descrição linda')
//     cy.get('.actions > button').click()
//     cy.get(':nth-child(1) > h2').last().invoke('text').should('have.string', 'Sophia Gallindo')
//     cy.get(':nth-child(1) > .campaignInfo > p').last().invoke('text').should('have.string', ' uma descrição linda')
//   })
//   it('criação de campanha - mensagens de erro', () => {
//     cy.visit('/');
//     cy.get('#loginzinho > form > #user').type('sophia')
//     cy.get('#loginzinho > form > #password').type('123')
//     cy.get('#loginzinho > form > button').click()
    
//     cy.get('.campaign > a').click()
//     cy.get('.createCampaign').click()
//     cy.get('.actions > button').click()
//     cy.get('.modal > form > :nth-child(3) > span').invoke('text').should('have.string', 'Este campo não pode ser vazio')
//   })
// })