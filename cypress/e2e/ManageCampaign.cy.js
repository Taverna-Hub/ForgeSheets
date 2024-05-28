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

describe('manage campaign tests', () => {
    it('editing campaign successfuly', () => {
        cy.visit('/');
        cy.exec('python manage.py migrate')
        cy.deleteAllUsers();
        cy.registerLoginCreateCampaign()

        cy.get('#menu').click()
        cy.get('#edit-title').click()
        cy.get('#new-title').clear().type('Uma peça')
        cy.get('#modal-title > .modal-content > form > [type="submit"]').click()

        cy.get('#menu').click()
        cy.get('#edit-description').click()
        cy.get('#new-description').clear().type('The One Peak is Real')
        cy.get('#modal-description > .modal-content > form > [type="submit"]').click()

        cy.get('#menu').click()
        cy.get('#edit-image').click()
        cy.get('#image').clear().type('https://sm.ign.com/t/ign_br/tv/o/one-piece-/one-piece-2_1xby.1200.jpg')
        cy.get('#modal-image > .modal-content > form > [type="submit"]').click()

        cy.get('.campaign > a').click()

        cy.get(':nth-child(1) > h2').invoke('text').should('have.string', 'Uma peça')

        cy.get('body > main > section.listCampaignContainer > section > a:nth-child(2) > div > div > div > p').invoke('text').should('have.string', 'The One Peak is Real')
    });

    it('empty fields', () => {
        cy.visit('/');
        cy.exec('python manage.py migrate')
        cy.deleteAllUsers();
        cy.registerLoginCreateCampaign()

        cy.get('#menu').click()
        cy.get('#edit-title').click()
        cy.get('#new-title').clear().type(' ')
        cy.get('#modal-title > .modal-content > form > [type="submit"]').click()
        cy.get('#titleError').invoke('text').should('have.string', 'Este campo não pode ser vazio')
    })
})