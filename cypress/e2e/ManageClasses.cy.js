Cypress.Commands.add('deleteAllUsers', () => {
    cy.exec('python delete_users.py', { failOnNonZeroExit: false })
});

Cypress.Commands.add('registerLoginCreateCampaign', () => {
    cy.deleteAllUsers();

    cy.get('.registerAnchor').click()
    cy.get('#cadastrinho > form > #user').type('managecampaigns')
    cy.get('#email').type('managecampaigns@managecampaigns.com')
    cy.get('#cadastrinho > form > #password').type('managecampaigns')
    cy.get('#cadastrinho > form > button').click()

    cy.get('#loginzinho > form > #user').type('managecampaigns')
    cy.get('#loginzinho > form > #password').type('managecampaigns')
    cy.get('#loginzinho > form > button').click()

    cy.get('.campaign > a').click()
    cy.get('.createCampaign').click()

    cy.get('#image').type('https://t.ctcdn.com.br/R1B1UyqFyVPjlBqLihqGRZ2eEkE=/1280x720/smart/i521738.jpeg')
    cy.get('#title').type('One Piece')
    cy.get('#description').type('Kaizoku ou ni ore wa naru!')
    cy.get('#submit_button').click()

    cy.get('.campaignCard > :nth-child(1)').click()
})

Cypress.on('uncaught:exception', (err, runnable) => {
    return false
  })

  describe('test suite manage races', () => {
    it ('successfully creating class', () => {
        cy.visit('/');
        cy.exec('python manage.py migrate')
        cy.deleteAllUsers();
        cy.registerLoginCreateCampaign()

        
    })
  })