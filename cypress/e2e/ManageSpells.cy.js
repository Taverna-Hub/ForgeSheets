Cypress.Commands.add('removeDatabase', () => {
    cy.exec('rm ./db.sqlite3')
    cy.exec('python3 manage.py migrate')
})

Cypress.Commands.add('registerLoginCreateSheet', () => {
    cy.removeDatabase()

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
    cy.wait(2000)
})

describe('test suite spells', () => {
    it('successfully added spell', () => {
        cy.visit('/');
        cy.exec('rm ./db.sqlite3')
        cy.exec('python3 manage.py migrate')

        cy.wait(2000)
        cy.get('.registerAnchor').click()
        cy.wait(2000)
        cy.get('#cadastrinho > form > #user').type('managespells')
        cy.get('#email').type('managespells@managespells.com')
        cy.get('#cadastrinho > form > #password').type('managespells')
        cy.wait(2000)
        cy.get('#cadastrinho > form > button').click()
        cy.wait(2000)
        cy.get('#loginzinho > form > #user').type('managespells')
        cy.get('#loginzinho > form > #password').type('managespells')
        cy.wait(2000)
        cy.get('#loginzinho > form > button').click()
        cy.wait(2000)
        cy.get('.createSheet').click()
        cy.wait(2000)
        cy.get('.container > :nth-child(2) > a').click()
        cy.wait(2000)
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
        cy.wait(2000)
        cy.get('#submit_button').click()
        cy.wait(2000)

        cy.get('.cardList > #Card').last().click()
        cy.wait(2000)
        cy.get('.openMagicModalBtn').click()
        cy.wait(2000)
        cy.get('.magicModal > .modal > form > .magicName > input').type('Rajada Mística')
        cy.wait(800)
        cy.get('.magicModal > .modal > form > .magicDescription > textarea').type('Um feixe de energia estalante')
        cy.wait(800)
        cy.get('.magicDamage > input').type('1d10')
        cy.wait(800)
        cy.get('.magicModal > .modal > form > :nth-child(5) > .magicAttribute > select').select('Carisma')
        cy.wait(800)
        cy.get('.magicModal > .modal > form > :nth-child(5) > .magicElement > input').type('Energia')
        cy.wait(800)
        cy.get('#addMagicBtn').click()
        cy.get('.magicList > li').invoke('text').should('have.string', 'Rajada Mística')
        cy.wait(2000)

    })

    it('editing spell succesfully', () => {
        cy.visit('/');

        cy.registerLoginCreateSheet()

        cy.get('.cardList > #Card').last().click()
        cy.wait(2000)

        cy.get('.editMagic').click()
        cy.wait(800)
        cy.get('.editMagicName > input').clear().type('Bola de Fogo')
        cy.wait(800)
        cy.get('.editMagicDescription > textarea').clear().type('Uma bola de fogo')
        cy.wait(800)
        cy.get('.editMagicDamage > input').clear().type('2d6')
        cy.wait(800)
        cy.get('.editMagicAttribute > select').select('Força')
        cy.wait(800)
        cy.get('.editMagicElement > input').clear().type('Fogo')
        cy.wait(2000)

        cy.get('#saveMagicBtn').click()
        cy.get('.magicList > li').invoke('text').should('have.string', 'Bola de Fogo')
        cy.wait(2000)

    })

    it('adding spell with same name', () => {
        cy.visit('/');

        cy.registerLoginCreateSheet()

        cy.get('.cardList > #Card').last().click()
        cy.wait(2000)


        cy.get('.openMagicModalBtn').click()
        cy.wait(2000)
        cy.get('.magicModal > .modal > form > .magicName > input').type('Rajada Mística')
        cy.wait(800)
        cy.get('.magicModal > .modal > form > .magicDescription > textarea').type('Um feixe de energia estalante')
        cy.wait(800)
        cy.get('.magicDamage > input').type('1d10')
        cy.wait(800)
        cy.get('.magicModal > .modal > form > :nth-child(5) > .magicAttribute > select').select('Carisma')
        cy.wait(800)
        cy.get('.magicModal > .modal > form > :nth-child(5) > .magicElement > input').type('Energia')
        cy.wait(800)
        cy.get('#addMagicBtn').click()
        cy.wait(3000)
        cy.get('.nameError').invoke('text').should('have.string', 'Essa magia/habilidade já existe')
    })

    it('deleting spell successfully', () => {
        cy.visit('/');
        
        cy.registerLoginCreateSheet()

        cy.get('.cardList > #Card').last().click()
        cy.wait(2000)
        cy.get('.removeMagic').click()
        cy.wait(2000)
        cy.get('.magicListContainer').contains('Bola de Fogo').should('not.exist')
    })

})