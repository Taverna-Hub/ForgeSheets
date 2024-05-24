Cypress.Commands.add('deleteAllUsers', () => {
    cy.exec('python delete_users.py', { failOnNonZeroExit: false })
        
});

Cypress.Commands.add('registerLoginCreateSheet', () => {
    cy.deleteAllUsers();

    cy.get('.registerAnchor').click()
    cy.get('#cadastrinho > form > #user').type('managespells')
    cy.get('#email').type('managespells@managespells.com')
    cy.get('#cadastrinho > form > #password').type('managespells')
    cy.get('#cadastrinho > form > button').click()

    cy.get('#loginzinho > form > #user').type('managespells')
    cy.get('#loginzinho > form > #password').type('managespells')
    cy.get('#loginzinho > form > button').click()

    cy.get('.createSheet').click()
    cy.get('.container > :nth-child(2) > a').click()
    cy.get('.sheetHeader > :nth-child(1) > input').type('Légolas')
    cy.get('.sheetHeader > :nth-child(2) > input').type('Humano')
    cy.get('#role').type('Mago')
    cy.get('#strength').type('10')
    cy.get('#intelligence').type('10')
    cy.get('#wisdom').type('10')
    cy.get('#charisma').type('10')
    cy.get('#constitution').type('10')
    cy.get('#speed').type('10')
    cy.get('#healthPointMax').type('150')
    cy.get('#manaMax').type('150')
    cy.get('#exp').type('2')
    cy.get('#submit_button').click()

    cy.get('.cardList > #Card').last().click()
    cy.get('.openMagicModalBtn').click()
    cy.get('.magicModal > .modal > form > .magicName > input').type('Rajada Mística')
    cy.get('.magicModal > .modal > form > .magicDescription > textarea').type('Um feixe de energia estalante')
    cy.get('.magicDamage > input').type('1d10')
    cy.get('.magicModal > .modal > form > :nth-child(5) > .magicAttribute > select').select('Carisma')
    cy.get('.magicModal > .modal > form > :nth-child(5) > .magicElement > input').type('Energia')
    cy.get('#addMagicBtn').click()
    cy.get('.cancelSheetView').click()
})

describe('test suite spells', () => {
    it('successfully added spell', () => {
        cy.visit('/');
        cy.exec('python manage.py migrate')
        cy.deleteAllUsers();

        cy.get('.registerAnchor').click()
        cy.get('#cadastrinho > form > #user').type('managespells')
        cy.get('#email').type('managespells@managespells.com')
        cy.get('#cadastrinho > form > #password').type('managespells')
        cy.get('#cadastrinho > form > button').click()
        cy.get('#loginzinho > form > #user').type('managespells')
        cy.get('#loginzinho > form > #password').type('managespells')
        cy.get('#loginzinho > form > button').click()
        cy.get('.createSheet').click()
        cy.get('.container > :nth-child(2) > a').click()
        cy.get('.sheetHeader > :nth-child(1) > input').type('Légolas')
        cy.get('.sheetHeader > :nth-child(2) > input').type('Humano')
        cy.get('#role').type('Mago')
        cy.get('#strength').type('10')
        cy.get('#intelligence').type('10')
        cy.get('#wisdom').type('10')
        cy.get('#charisma').type('10')
        cy.get('#constitution').type('10')
        cy.get('#speed').type('10')
        cy.get('#healthPointMax').type('150')
        cy.get('#manaMax').type('150')
        cy.get('#exp').type('2')
        cy.get('#submit_button').click()

        cy.get('.cardList > #Card').last().click()
        cy.get('.openMagicModalBtn').click()
        cy.get('.magicModal > .modal > form > .magicName > input').type('Rajada Mística')
        cy.get('.magicModal > .modal > form > .magicDescription > textarea').type('Um feixe de energia estalante')
        cy.get('.magicDamage > input').type('1d10')
        cy.get('.magicModal > .modal > form > :nth-child(5) > .magicAttribute > select').select('Carisma')
        cy.get('.magicModal > .modal > form > :nth-child(5) > .magicElement > input').type('Energia')
        cy.get('#addMagicBtn').click()
        cy.get('.magicList > li').invoke('text').should('have.string', 'Rajada Mística')

    })

    it('editing spell succesfully', () => {
        cy.visit('/');
        cy.exec('python manage.py migrate')
        cy.registerLoginCreateSheet()

        cy.get('.cardList > #Card').last().click()

        cy.get('.editMagic').click()
        cy.get('.editMagicName > input').clear().type('Bola de Fogo')
        cy.get('.editMagicDescription > textarea').clear().type('Uma bola de fogo')
        cy.get('.editMagicDamage > input').clear().type('2d6')
        cy.get('.editMagicAttribute > select').select('Força')
        cy.get('.editMagicElement > input').clear().type('Fogo')

        cy.get('#saveMagicBtn').click()
        cy.get('.magicList > li').invoke('text').should('have.string', 'Bola de Fogo')

    })

    it('adding spell with same name', () => {
        cy.visit('/');

        cy.registerLoginCreateSheet()

        cy.get('.cardList > #Card').last().click()


        cy.get('.openMagicModalBtn').click()
        cy.get('.magicModal > .modal > form > .magicName > input').type('Rajada Mística')
        cy.get('.magicModal > .modal > form > .magicDescription > textarea').type('Um feixe de energia estalante')
        cy.get('.magicDamage > input').type('1d10')
        cy.get('.magicModal > .modal > form > :nth-child(5) > .magicAttribute > select').select('Carisma')
        cy.get('.magicModal > .modal > form > :nth-child(5) > .magicElement > input').type('Energia')
        cy.get('#addMagicBtn').click()
        cy.get('.nameError').invoke('text').should('have.string', 'Essa magia/habilidade já existe')
    })

    it('deleting spell successfully', () => {
        cy.visit('/');
        cy.exec('python manage.py migrate')
        cy.registerLoginCreateSheet()

        cy.get('.cardList > #Card').last().click()
        cy.get('.removeMagic').click()
        cy.get('.magicListContainer').contains('Bola de Fogo').should('not.exist')
    })

})