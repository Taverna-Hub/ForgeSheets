Cypress.Commands.add('deleteAllUsers', () => {
    cy.exec('python delete_users.py', { failOnNonZeroExit: false })
});

Cypress.Commands.add('registerLoginCreateCampaign', () => {
    cy.deleteAllUsers();

    cy.get('.registerAnchor').click()
    cy.get('#cadastrinho > form > #user').type('manageraces')
    cy.get('#email').type('manageraces@manageraces.com')
    cy.get('#cadastrinho > form > #password').type('manageraces')
    cy.get('#cadastrinho > form > button').click()

    cy.get('#loginzinho > form > #user').type('manageraces')
    cy.get('#loginzinho > form > #password').type('manageraces')
    cy.get('#loginzinho > form > button').click()

    cy.get('.campaign > a').click()
    cy.get('.createCampaign').click()

    cy.get('#image').type('https://image.api.playstation.com/vulcan/ap/rnd/202308/1519/95cce955dc59d04e2ea5ab624a823ace14e9c5f7e24dfb8f.png')
    cy.get('#title').type('Baldur´s Gate III')
    cy.get('#description').type('Baldur´s Gate III é um RPG baseado em Dungeons & Dragons, que vem com uma mecânica facilitada e simples para Jogadores Iniciantes')
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
        cy.get('#intelligence_buff').type('1')
        cy.get('#charisma_buff').type('2')
        cy.get('#submit_button').click()

        cy.get('tbody > tr > :nth-child(1)').invoke('text').should('have.string', 'Tiefling')
        cy.get('p').invoke('text').should('have.string', '0')
    })

    it('error creating race', () => {
        cy.visit('/');
        cy.exec('python manage.py migrate');
        cy.deleteAllUsers();
        cy.registerLoginCreateCampaign();

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
        
        cy.get('.addRace').click()
        cy.get('#name').type('Humano')
        cy.get('#submit_button').click()
        cy.get('.RaceName > span').invoke('text').should('have.string', 'Uma raça com esse nome já existe');

        

    })

    it('successfully deleting a race', () => {
        cy.visit('/');
        cy.exec('python manage.py migrate')
        cy.deleteAllUsers();
        cy.registerLoginCreateCampaign()

        cy.get('#manageRaces').click()
        cy.get('.addRace').click()
        cy.get('#name').type('Anão')
        cy.get('#strength_buff').type('1')
        cy.get('#intelligence_buff').type('1')
        cy.get('#wisdom_buff').type('1')
        cy.get('#charisma_buff').type('1')
        cy.get('#constitution_buff').type('1')
        cy.get('#speed_buff').type('1')
        cy.get('#submit_button').click()

        cy.get('.delete_race_button').click()
        cy.get('#deleteRaceModal > .modal > form > .actions > [type="submit"]').click()
        cy.get('.raceList').contains('Anão').should('not.exist')
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
        cy.get('.raceList').contains('Humano').should('not.exist')
    })
})