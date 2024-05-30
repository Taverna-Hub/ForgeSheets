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
    it('successfully creating race', () => {
        cy.visit('/');
        cy.exec('python manage.py migrate')
        cy.deleteAllUsers();
        cy.registerLoginCreateCampaign()

        cy.get('#manageRaces').click()
        cy.get('.addRace').click()
        cy.get('#name').type('Tiefling')
        cy.get('#strength_buff').type('0')
        cy.get('#intelligence_buff').type('1')
        cy.get('#wisdom_buff').type('0')
        cy.get('#charisma_buff').type('2')
        cy.get('#constitution_buff').type('0')
        cy.get('#speed_buff').type('0')
        cy.get('#submit_button').click()

        cy.get('tbody > tr > :nth-child(1)').invoke('text').should('have.string', 'Tiefling')
    })

    it('successfully editing race', () => {
        cy.visit('/');
        cy.exec('python manage.py migrate')
        cy.deleteAllUsers();
        cy.registerLoginCreateCampaign()

        cy.get('#manageRaces').click()
        cy.get('.addRace').click()
        cy.get('#name').type('Humano')
        cy.get('#strength_buff').type('1')
        cy.get('#intelligence_buff').type('1')
        cy.get('#wisdom_buff').type('1')
        cy.get('#charisma_buff').type('1')
        cy.get('#constitution_buff').type('1')
        cy.get('#speed_buff').type('1')
        cy.get('#submit_button').click()
        cy.get('.back').click()

        cy.get('#manageRaces').click()
        cy.get('.editRace').click()
        cy.get('#edit_name').clear()
        cy.get('#edit_name').type('Anão')
        cy.get('#submitEditButton').click()
        cy.get('tbody > tr > :nth-child(1)').invoke('text').should('have.string', 'Anão')
    })
})