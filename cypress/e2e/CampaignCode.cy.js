Cypress.Commands.add('deleteAllUsers', () => {
    cy.exec('python delete_users.py', { failOnNonZeroExit: false })
});

Cypress.Commands.add('createCampaign', () => {

    cy.get('.campaign > a').click()
    cy.get('.createCampaign').click()

    cy.get('#image').type('https://image.api.playstation.com/vulcan/ap/rnd/202308/1519/95cce955dc59d04e2ea5ab624a823ace14e9c5f7e24dfb8f.png')
    cy.get('#title').type('Baldur´s Gate III')
    cy.get('#description').type('Kaizoku ou ni ore wa naru!')
    cy.get('#submit_button').click()

    cy.get('.campaignCard > :nth-child(1)').click()
})

Cypress.Commands.add('registerLogin', () =>{
    cy.deleteAllUsers();

    cy.get('.registerAnchor').click()
    cy.get('#cadastrinho > form > #user').type('sheetsharing')
    cy.get('#email').type('sheetsharing@sheetsharing.com')
    cy.get('#cadastrinho > form > #password').type('sheetsharing')
    cy.get('#cadastrinho > form > button').click()

    cy.get('#loginzinho > form > #user').type('sheetsharing')
    cy.get('#loginzinho > form > #password').type('sheetsharing')
    cy.get('#loginzinho > form > button').click()
})

Cypress.on('uncaught:exception', (err, runnable) => {
    return false
})

Cypress.Commands.add('createCampaignRaceClass', () => {
    cy.get('#manageRaces').click()
    cy.get('.addRace').click()
    cy.get('#name').type('Orc')
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
    cy.get('.addClassModal > .modal > form > .actions > [type="submit"]').click()
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
    cy.get('.sheetHeader > :nth-child(1) > input').type('Darius')
    cy.get('#race').select('Orc')
    cy.get('#class').select('Guerreiro')
    cy.get('#strength').type('1')
    cy.get('#intelligence').type('1')
    cy.get('#wisdom').type('1')
    cy.get('#charisma').type('1')
    cy.get('#constitution').type('1')
    cy.get('#speed').type('1')
    cy.get('.openImageBtn').click()
    cy.get('.image').type('https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Darius_54.jpg')
    cy.get('#addImageBtn').click()
    cy.get('#healthPointMax').type('100')
    cy.get('#manaMax').type('100')
    cy.get('#exp').type('0')
    cy.get('#description').type('Por Noxus')
    cy.get('#submit_button').click()

    cy.get('.campaign > a').click()
    cy.get('.campaignCard > :nth-child(1)').click()
});


describe('sheet sharing tests', () => {
    it('sucess creating campaign code', () => {
        cy.visit('/');
        cy.exec('python manage.py migrate');
        cy.deleteAllUsers();
        cy.registerLogin();
        cy.createCampaign();
        cy.get('.code').should('exist');

    })

    it('sucess creating a sheet in a campaign', () => {
        cy.visit('/');
        cy.exec('python manage.py migrate');
        cy.deleteAllUsers();
        cy.registerLogin();
        cy.createCampaign();
        cy.createCampaignRaceClass();
        cy.createCampaignSheet();

        cy.get('#Card > .detailLink > h2').last().invoke('text').should('have.string',"Darius")

    })

    it('invalid campaign code', () => {
        cy.visit('/');
        cy.exec('python manage.py migrate');
        cy.deleteAllUsers();
        cy.registerLogin();

        cy.get('.createSheet').click();
        cy.get(':nth-child(1) > form > div > input').type('XXXXXXXX')
        cy.get(':nth-child(1) > form > button').click()
        cy.get(':nth-child(1) > form > div > span').invoke('text').should('have.string', 'Insira um codigo valido!')
    })
})