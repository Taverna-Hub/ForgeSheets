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

Cypress.Commands.add('createCampaignRaceClass', () => {
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

    cy.get('#manageClasses').click()
    cy.get('.addClass').click()
    cy.get('.classNameContainer > input').type('Guerreiro')
    cy.get('#physicalDamage').check()
    cy.get('.actions > [type="submit"]').click()
    cy.get('.back').click()
});

Cypress.Commands.add('createCampaignSheet', () => {
    cy.get('.code').invoke('text').then((text) => {
        const copiedText = text;
        cy.get('.sheets > a').click()
        cy.get('.createSheet').click()
        cy.get(':nth-child(1) > form > div > input').type(copiedText)
        cy.get(':nth-child(1) > form > button').click()
        
    })
    cy.get('.sheetHeader > :nth-child(1) > input').type('Roronoa Zoro')
    cy.get('#race').select('Humano')
    cy.get('#class').select('Guerreiro')
    cy.get('#strength').type('1')
    cy.get('#intelligence').type('1')
    cy.get('#wisdom').type('1')
    cy.get('#charisma').type('1')
    cy.get('#constitution').type('1')
    cy.get('#speed').type('1')
    cy.get('.openImageBtn').click()
    cy.get('.image').type('https://i.pinimg.com/originals/9d/da/91/9dda91ebc1300a11f8d8ad05bbdbf92e.jpg')
    cy.get('#addImageBtn').click()
    cy.get('#healthPointMax').type('100')
    cy.get('#manaMax').type('100')
    cy.get('#exp').type('0')
    cy.get('#description').type('Gosto de espada')
    cy.get('#submit_button').click()

    cy.get('.campaign > a').click()
    cy.get('.campaignCard > :nth-child(1)').click()
});


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

    it('hp and mana management in campaign sheet', () => {
        cy.visit('/');
        cy.exec('python manage.py migrate')
        cy.deleteAllUsers();
        cy.registerLoginCreateCampaign()
        cy.createCampaignRaceClass()
        cy.createCampaignSheet()

        cy.get('.sheetCard > #Card').click()
        cy.get('#healthPointMax').click()
        cy.get('#healthPointMax').clear()
        cy.get('#healthPointMax').type('200')
        cy.get('#healthPointMax').click()

        cy.get('#healthPoint').click()
        cy.get('#healthPoint').clear()
        cy.get('#healthPoint').type('150')
        cy.get('#healthPoint').click()      

        cy.get('#manaMax').click()
        cy.get('#manaMax').clear()
        cy.get('#manaMax').type('150')
        cy.get('#manaMax').click()

        cy.get('#mana').click()
        cy.get('#mana').clear()
        cy.get('#mana').type('75')
        cy.get('#mana').click()
        cy.get('#submit_button').click()

        cy.get('input[name="healthPointMax"]').should('have.value', "200")
        cy.get('input[name="healthPoint"]').should('have.value', "150")
        cy.get('input[name="manaMax"]').should('have.value', "150")
        cy.get('input[name="manaActual"]').should('have.value', "75")

    })

    it('hp and mana management in campaign sheet', () => {
            cy.visit('/');
            cy.exec('python manage.py migrate')
            cy.deleteAllUsers();
            cy.registerLoginCreateCampaign()
            cy.createCampaignRaceClass()
            cy.createCampaignSheet()
    
            cy.get('.menu').click()
            cy.get('#Card > .dropdown-menu > .dropdown-item').click()
            cy.get('.delete').click()
            cy.get('.campaign > a').click()
            cy.get('.campaignCard > :nth-child(1)').click()

            cy.get('.campaignContainer').contains('Roronoa Zoro').should('not.exist')
    
        })
})