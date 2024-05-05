// describe ('update sheet', () => {
//     it('updating hp and mana', () => {
//         cy.visit('/')

//         // cy.get('.registerAnchor').click()
//         // cy.get('#cadastrinho > form > #user').type('login1')
//         // cy.get('#email').type('login1@login1.com')
//         // cy.get('#cadastrinho > form > #password').type('login1')

//         cy.get('#loginzinho > form > #user').type('login1')
//         cy.get('#loginzinho > form > #password').type('login1')
//         cy.get('#loginzinho > form > button').click()

//         cy.get('.createSheet').click()
//         cy.get('.container > :nth-child(2) > a').click()
//         cy.get('.sheetHeader > :nth-child(1) > input').type('Ramon')
//         cy.get('.sheetHeader > :nth-child(2) > input').type('Elfo')
//         cy.get('.sheetHeader > :nth-child(3) > input').type('Arqueiro')
//         cy.get('#strength').type('20')
//         cy.get('#intelligence').type('10')
//         cy.get('#wisdom').type('18')
//         cy.get('#charisma').type('7')
//         cy.get('#constitution').type('20')
//         cy.get('#speed').type('8')
//         cy.get('#healthPointMax').type('100')
//         cy.get('#manaMax').type('100')
//         cy.get('#exp').type('4')
//         cy.get('#submit_button').click()

//         cy.get(' #Card ').last().click()
//         cy.get('.nameInput').clear()
//         cy.get('.nameInput').type('Légolas')

//         cy.get('#healthPointMax').click()
//         cy.get('#healthPointMax').clear()
//         cy.get('#healthPointMax').type('200')
//         cy.get('#healthPointMax').click()
        
        
//         cy.get('#healthPoint').click()
//         cy.get('#healthPoint').clear()
//         cy.get('#healthPoint').type('150')
//         cy.get('#healthPoint').click()      
        
//         cy.get('#manaMax').click()
//         cy.get('#manaMax').clear()
//         cy.get('#manaMax').type('150')
//         cy.get('#manaMax').click()
        
//         cy.get('#mana').click()
//         cy.get('#mana').clear()
//         cy.get('#mana').type('75')
//         cy.get('#mana').click()
        
        
//         cy.get('#exp').click()
//         cy.get('#exp').clear()
//         cy.get('#exp').type('102')
//         cy.get('#submit_button').click()
        
//         cy.get('input[name="healthPointMax"]').should('have.value', "200")
//         cy.get('input[name="healthPoint"]').should('have.value', "150")
//         cy.get('input[name="manaMax"]').should('have.value', "150")
//         cy.get('input[name="manaActual"]').should('have.value', "75")
        
//         cy.get('input[name="exp"]').should('have.value', "2")
//         cy.get('.expP').invoke('text').should('have.string', "200xp")
        
//         cy.get('.sheets > a').click()
//         cy.get('#Card > .detailLink > h2').last().invoke('text').should('have.string',"Légolas")
//         cy.get('#Card > .detailLink > .sheet_info > :nth-child(1) > :nth-child(2)').last().invoke("text").should('have.string', "1 (2/200xp)")
//         // cy.get('#Card > .detailLink > .sheet_info > :nth-child(1) > :nth-child(2)').last().invoke("text").should('have.string', "20 (Nível Max.)")
//     })

//     it ('updating atributes and description', () => {
//         cy.visit('/')
//         cy.get('#loginzinho > form > #user').type('login1')
//         cy.get('#loginzinho > form > #password').type('login1')
//         cy.get('#loginzinho > form > button').click()
        
//         cy.get(' #Card ').last().click()

//         cy.get('.openImageBtn').click()
//         cy.get('.image').type("https://pm1.aminoapps.com/6843/f0365d09659df3fda232db54a627a6ec18d09c52v2_hq.jpg")
//         cy.get('#addImageBtn').click()
        
//         cy.get('#strength').click()
//         cy.get('#strength').clear()
//         cy.get('#strength').type('6')
//         cy.get('#strength').click()
        
//         cy.get('#intelligence').click()
//         cy.get('#intelligence').clear()
//         cy.get('#intelligence').type('18')
//         cy.get('#intelligence').click()
        
//         cy.get('#wisdom').click()
//         cy.get('#wisdom').clear()
//         cy.get('#wisdom').type('13')
//         cy.get('#wisdom').click()
        
//         cy.get('#charisma').click()
//         cy.get('#charisma').clear()
//         cy.get('#charisma').type('12')
//         cy.get('#charisma').click()
        
//         cy.get('#constitution').click()
//         cy.get('#constitution').clear()
//         cy.get('#constitution').type('3')
//         cy.get('#constitution').click()
        
//         cy.get('#speed').click()
//         cy.get('#speed').clear()
//         cy.get('#speed').type('20')
//         cy.get('#speed').click()
        
//         cy.get('#description').click()
//         cy.get('#description').clear()
//         cy.get('#description').type('Um elfo de cabelos longos e prateados')
//         cy.get('#description').click()


//         cy.get('#submit_button').click()
        
//         cy.get('input[name="strength"]').should('have.value', "6")
//         cy.get('input[name="intelligence"]').should('have.value', "18")
//         cy.get('input[name="wisdom"]').should('have.value', "13")
//         cy.get('input[name="charisma"]').should('have.value', "12")
//         cy.get('input[name="constitution"]').should('have.value', "3")
//         cy.get('input[name="speed"]').should('have.value', "20")
        
//         cy.get('#description').invoke('text').should('have.string', "Um elfo de cabelos longos e prateados")
        
//         cy.get('.sheets > a').click()
//     })

//     // uncaught:exception event no cypress precisa resolver
//     // it ('changing equipments ', () =>{
//     //     cy.visit('/')
//     //     cy.get('#loginzinho > form > #user').type('login1')
//     //     cy.get('#loginzinho > form > #password').type('login1')
//     //     cy.get('#loginzinho > form > button').click()
        
//     //     cy.get(' #Card ').last().click()

//     //     cy.get('.openEquipmentBtn').click()
//     //     cy.get('.equipmentModal > .modal > form > .equipmentName > input').type('Torch')
//     //     cy.get('.addEquipmentBtn').click()
//     // })
// })