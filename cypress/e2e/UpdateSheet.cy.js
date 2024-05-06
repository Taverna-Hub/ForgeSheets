describe ('update sheet', () => {
    it('succesful sheet management', () => {
        cy.visit('/')

        //------------------------------------------------------------------------------

        cy.exec('rm ./db.sqlite3')
        cy.exec('python3 manage.py migrate')

        cy.get('.registerAnchor').click()
        cy.get('#cadastrinho > form > #user').type('updatesheet')
        cy.get('#email').type('updatesheet@updatesheet.com')
        cy.get('#cadastrinho > form > #password').type('updatesheet')
        cy.get('#cadastrinho > form > button').click()
        
        cy.get('#loginzinho > form > #user').type('updatesheet')
        cy.get('#loginzinho > form > #password').type('updatesheet')
        cy.get('#loginzinho > form > button').click()

        cy.wait(1000)

        cy.get('.createSheet').click()
        cy.get('.container > :nth-child(2) > a').click()
        cy.get('.sheetHeader > :nth-child(1) > input').type('Aragon')
        cy.get('.sheetHeader > :nth-child(2) > input').type('Humano')
        cy.get('.sheetHeader > :nth-child(3) > input').type('Guerreiro')
        cy.get('.openImageBtn').click()
        cy.get('.image').type('https://pareto.io/wp-content/uploads/2023/07/header-tess-ai-urso-1.jpg')
        cy.get('#addImageBtn').click()
        cy.get('#strength').type('1')
        cy.get('#intelligence').type('1')
        cy.get('#wisdom').type('1')
        cy.get('#charisma').type('1')
        cy.get('#constitution').type('1')
        cy.get('#speed').type('1')
        cy.get('#healthPointMax').type('100')
        cy.get('#manaMax').type('100')
        cy.get('#exp').type('0')
        cy.get('#submit_button').click()
        //------------------

        cy.wait(2000)
        cy.get('.cardList > #Card').last().click()
        cy.get('.nameInput').clear()
        cy.get('.nameInput').type('Légolas')
        cy.wait(1000)
        
        cy.get('.selectedImage').click()
        cy.get('.selectedImage').click()
        cy.wait(2000)
        cy.get('.image').type('https://files.tecnoblog.net/wp-content/uploads/2022/09/stable-diffusion-imagem.jpg')
        cy.wait(800)
        cy.get('#addImageBtn').click()

        cy.get('#healthPointMax').click()
        cy.get('#healthPointMax').clear()
        cy.get('#healthPointMax').type('200')
        cy.get('#healthPointMax').click()
        cy.wait(1000)

        cy.get('#healthPoint').click()
        cy.get('#healthPoint').clear()
        cy.get('#healthPoint').type('150')
        cy.get('#healthPoint').click()      
        cy.wait(1000)

        cy.get('#manaMax').click()
        cy.get('#manaMax').clear()
        cy.get('#manaMax').type('150')
        cy.get('#manaMax').click()
        cy.wait(1000)

        cy.get('#mana').click()
        cy.get('#mana').clear()
        cy.get('#mana').type('75')
        cy.get('#mana').click()
        cy.wait(1000)
        
        cy.get('#exp').click()
        cy.get('#exp').clear()
        cy.get('#exp').type('102')
        cy.wait(1000)
        
        cy.get('input[name="strength"]').invoke('val', '10').trigger('change')
        cy.wait(1000)
        cy.get('input[name="intelligence"]').invoke('val', '10').trigger('change')
        cy.wait(1000)
        cy.get('input[name="wisdom"]').invoke('val', '10').trigger('change')
        cy.wait(1000)
        cy.get('input[name="charisma"]').invoke('val', '10').trigger('change')
        cy.wait(1000)
        cy.get('input[name="constitution"]').invoke('val', '10').trigger('change')
        cy.wait(1000)
        cy.get('input[name="speed"]').invoke('val', '10').trigger('change')
        cy.wait(1000)
        cy.get('#submit_button').click()
        
        cy.get('input[name="healthPointMax"]').should('have.value', "200")
        cy.get('input[name="healthPoint"]').should('have.value', "150")
        cy.get('input[name="manaMax"]').should('have.value', "150")
        cy.get('input[name="manaActual"]').should('have.value', "75")
        
        cy.get('input[name="exp"]').should('have.value', "2")
        cy.get('.expP').invoke('text').should('have.string', "200xp")
        cy.wait(1000)
        
        cy.get('.sheets > a').click()
        cy.get('#Card > .detailLink > h2').last().invoke('text').should('have.string',"Légolas")
        cy.get('#Card > .detailLink > .sheet_info > :nth-child(1) > :nth-child(2)').last().invoke("text").should('have.string', "1 (2/200xp)")
        cy.wait(2000)
    })

    it ('submitting empty attributes', () => {
        cy.visit('/')

        //------------------------------------------------------------------------------

        cy.exec('rm ./db.sqlite3')
        cy.exec('python3 manage.py migrate')

        cy.get('.registerAnchor').click()
        cy.get('#cadastrinho > form > #user').type('updatesheet')
        cy.get('#email').type('updatesheet@updatesheet.com')
        cy.get('#cadastrinho > form > #password').type('updatesheet')
        cy.get('#cadastrinho > form > button').click()

        cy.get('.createSheet').click()
        cy.get('.container > :nth-child(2) > a').click()
        cy.get('.sheetHeader > :nth-child(1) > input').type('Aragon')
        cy.get('.sheetHeader > :nth-child(2) > input').type('Humano')
        cy.get('.sheetHeader > :nth-child(3) > input').type('Guerreiro')
        cy.get('.openImageBtn').click()
        cy.get('.image').type('https://files.tecnoblog.net/wp-content/uploads/2022/09/stable-diffusion-imagem.jpg')
        cy.get('#addImageBtn').click()
        cy.get('#strength').type('1')
        cy.get('#intelligence').type('1')
        cy.get('#wisdom').type('1')
        cy.get('#charisma').type('1')
        cy.get('#constitution').type('1')
        cy.get('#speed').type('1')
        cy.get('#healthPointMax').type('100')
        cy.get('#manaMax').type('100')
        cy.get('#exp').type('0')
        cy.get('#submit_button').click()
        //------------------------------------------------------------------------------
        

        cy.get('#loginzinho > form > #user').type('updatesheet')
        cy.get('#loginzinho > form > #password').type('updatesheet')
        cy.get('#loginzinho > form > button').click()
        
        cy.wait(1000)
        cy.get('.cardList > #Card').last().click()

        cy.get('.nameInput').invoke('val', '').trigger('change')
        cy.get('#submit_button').click()
        cy.get('#form-edit-sheet > :nth-child(3)').invoke('text').should('have.string', 'Este campo não pode ser vazio!')
        cy.wait(1000)

        cy.get('#healthPoint').invoke('val', '').trigger('change')
        cy.get('#healthPointMax').invoke('val', '').trigger('change')
        cy.get('#mana').invoke('val', '').trigger('change')
        cy.get('#manaMax').invoke('val', '').trigger('change')
        cy.get('#exp').invoke('val', '').trigger('change')
        cy.get('.expP').invoke('val', '').trigger('change')
        cy.get('#submit_button').click()
        cy.get('.infos > :nth-child(5)').invoke('text').should('have.string', 'Este(s) campo(s) não pode(m) ser vazio(s)')
        cy.wait(1000)

        cy.get('input[name="strength"]').invoke('val', '').trigger('change')
        cy.wait(1000)
        cy.get('input[name="intelligence"]').invoke('val', '').trigger('change')
        cy.wait(1000)
        cy.get('input[name="wisdom"]').invoke('val', '').trigger('change')
        cy.wait(1000)
        cy.get('input[name="charisma"]').invoke('val', '').trigger('change')
        cy.wait(1000)
        cy.get('input[name="constitution"]').invoke('val', '').trigger('change')
        cy.wait(1000)
        cy.get('input[name="speed"]').invoke('val', '').trigger('change')
        cy.wait(1000)
        cy.get('#submit_button').click()
        cy.get('.atributos > span').invoke('text').should('have.string', 'Este(s) campo(s) não pode(m) ser vazio(s)!')
        cy.wait(1000)
    })

    it ('submitting out-of-scope attributes', () => {
        cy.visit('/')


        //------------------------------------------------------------------------------
        cy.exec('rm ./db.sqlite3')
        cy.exec('python3 manage.py migrate')

        cy.get('.registerAnchor').click()
        cy.get('#cadastrinho > form > #user').type('updatesheet')
        cy.get('#email').type('updatesheet@updatesheet.com')
        cy.get('#cadastrinho > form > #password').type('updatesheet')
        cy.get('#cadastrinho > form > button').click()

        cy.get('.createSheet').click()
        cy.get('.container > :nth-child(2) > a').click()
        cy.get('.sheetHeader > :nth-child(1) > input').type('Aragon')
        cy.get('.sheetHeader > :nth-child(2) > input').type('Humano')
        cy.get('.sheetHeader > :nth-child(3) > input').type('Guerreiro')
        cy.get('.openImageBtn').click()
        cy.get('.image').type('https://files.tecnoblog.net/wp-content/uploads/2022/09/stable-diffusion-imagem.jpg')
        cy.get('#addImageBtn').click()
        cy.get('#strength').type('1')
        cy.get('#intelligence').type('1')
        cy.get('#wisdom').type('1')
        cy.get('#charisma').type('1')
        cy.get('#constitution').type('1')
        cy.get('#speed').type('1')
        cy.get('#healthPointMax').type('100')
        cy.get('#manaMax').type('100')
        cy.get('#exp').type('0')
        cy.get('#submit_button').click()
        //------------------------------------------------------------------------------

        cy.get('#loginzinho > form > #user').type('updatesheet')
        cy.get('#loginzinho > form > #password').type('updatesheet')
        cy.get('#loginzinho > form > button').click()
        
        cy.wait(2000)
        cy.get('.cardList > #Card').last().click()
        cy.get('input[name="strength"]').invoke('val', '-50').trigger('change')
        cy.wait(1000)
        cy.get('input[name="intelligence"]').invoke('val', '1000').trigger('change')
        cy.wait(1000)
        cy.get('#submit_button').click()
        cy.wait(1000)
        
        cy.get('.atributos > span').invoke('text').should('have.string', 'O atributos primários devem estar entre 1 e 100')
        cy.wait(1000)
    })

    it ('submitting HP and Mana values higher than max', () => {
        cy.visit('/')
        
        //------------------------------------------------------------------------------
        cy.exec('rm ./db.sqlite3')
        cy.exec('python3 manage.py migrate')

        cy.get('.registerAnchor').click()
        cy.get('#cadastrinho > form > #user').type('updatesheet')
        cy.get('#email').type('updatesheet@updatesheet.com')
        cy.get('#cadastrinho > form > #password').type('updatesheet')
        cy.get('#cadastrinho > form > button').click()

        cy.get('.createSheet').click()
        cy.get('.container > :nth-child(2) > a').click()
        cy.get('.sheetHeader > :nth-child(1) > input').type('Aragon')
        cy.get('.sheetHeader > :nth-child(2) > input').type('Humano')
        cy.get('.sheetHeader > :nth-child(3) > input').type('Guerreiro')
        cy.get('.openImageBtn').click()
        cy.get('.image').type('https://files.tecnoblog.net/wp-content/uploads/2022/09/stable-diffusion-imagem.jpg')
        cy.get('#addImageBtn').click()
        cy.get('#strength').type('1')
        cy.get('#intelligence').type('1')
        cy.get('#wisdom').type('1')
        cy.get('#charisma').type('1')
        cy.get('#constitution').type('1')
        cy.get('#speed').type('1')
        cy.get('#healthPointMax').type('100')
        cy.get('#manaMax').type('100')
        cy.get('#exp').type('0')
        cy.get('#submit_button').click()
        //------------------------------------------------------------------------------

        cy.get('#loginzinho > form > #user').type('updatesheet')
        cy.get('#loginzinho > form > #password').type('updatesheet')
        cy.get('#loginzinho > form > button').click()
        
        cy.wait(2000)
        cy.get('.cardList > #Card').last().click()
        cy.get('#healthPoint').invoke('val', '400').trigger('change')
        cy.wait(1000)
        cy.get('#mana').invoke('val', '200').trigger('change')
        cy.wait(1000)
        cy.get('#submit_button').click()
        cy.wait(1000)

        cy.get('.infos > :nth-child(5)').invoke('text').should('have.string', 'Vida e mana não podem ultrapassar o valor máximo')
        cy.wait(1000)
    })
    
})