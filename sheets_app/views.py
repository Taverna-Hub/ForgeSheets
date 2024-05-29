from email import errors, message
from email.mime import image
from django.shortcuts import render, redirect, get_object_or_404
from django.views import View
from django.http import HttpResponse
from .models import Equipment, Sheet, Magic
from campaigns_app.models import Class, Race, Campaign
from .utils import save_equipment, save_sheet, save_sheet_in_campaign, sheet_update
from django.contrib import messages
from django.contrib.auth.mixins import LoginRequiredMixin
from django.urls import reverse

class SheetsView(LoginRequiredMixin, View):
    def get(self, request):
        sheets_view = Sheet.objects.filter(user_id=request.user.id)

        for sheet in sheets_view:
            sheet.hp = int((sheet.healthPoint / sheet.healthPointMax) * 100)
            sheet.mana = int((sheet.mana / sheet.manaMax) * 100)

        ctx = {
            'sheets_view': sheets_view,
            'app_name': 'sheets',
            'user': request.user,
        }
        
        return render(request, 'sheets_app/sheets.html', ctx)
    
    def post(self, request):
        campaign_code = request.POST.get("code")

        if not campaign_code.strip():
            sheets_view = Sheet.objects.filter(user_id=request.user.id)

            for sheet in sheets_view:
                sheet.hp = int((sheet.healthPoint / sheet.healthPointMax) * 100)
                sheet.mana = int((sheet.mana / sheet.manaMax) * 100)

            ctx = {
                'sheets_view': sheets_view,
                'app_name': 'sheets',
                'user': request.user,
                "error": {
                    "message": "O campo de código não pode ser vazio!"
                }
            }
        
            return render(request, 'sheets_app/sheets.html', ctx)
            
        
        return redirect(reverse('sheets:create_sheet_in_campaign', kwargs={'id': campaign_code}))
     
class CreateSheetView(LoginRequiredMixin, View):
    def get(self, request):
        ctx = {
            'app_name': 'sheets'
        }
        return render(request, 'sheets_app/create-sheets.html', ctx)
    
    def post(self, request):
        name = request.POST.get('name')
        image = request.POST.get('image')
        race = request.POST.get('race')
        role = request.POST.get('role')

        strength = request.POST.get('strength')
        intelligence = request.POST.get('intelligence')
        wisdom = request.POST.get('wisdom')
        charisma = request.POST.get('charisma')
        constitution = request.POST.get('constitution')
        speed = request.POST.get('speed')

        healthPointMax = request.POST.get('healthPointMax')
        manaMax = request.POST.get('manaMax')
        exp = request.POST.get('exp')

        description = request.POST.get('description')

        eqpsName = request.POST.getlist('equipmentName')
        eqpsQnt = request.POST.getlist('equipmentQnt')
        eqpsAtk = request.POST.getlist('equipmentAtk')
        eqpsDef = request.POST.getlist('equipmentDef')

        magicName = request.POST.getlist('mgcName')
        magicDescription = request.POST.getlist('mgcDesc')
        magicDamage = request.POST.getlist('mgcDamage')
        atributeModifier = request.POST.getlist('mgcAttribute')
        element = request.POST.getlist('mgcElement')
        user_id = request.user.id

        equipment_list = []
        magic_list = []

        errors = save_sheet(name, race, role, image, strength, intelligence, wisdom, charisma, constitution, speed, healthPointMax, manaMax, exp, user_id, description)
        if errors:
            atributos = ['strength', 'intelligence', 'wisdom', 'charisma', 'constitution', 'speed']
            atributos2 = ['healthPointMax', 'manaMax', 'exp']
            if str(type(errors)) != "<class 'sheets_app.models.Sheet'>":
                for mgcName,mgcDesc, magicDamage , mgcAtribute, mgcElement in zip(magicName, magicDescription, magicDamage, atributeModifier, element):
                    magic = {
                        'name': mgcName,
                        'description': mgcDesc,
                        'damage': magicDamage,
                        'atribute': mgcAtribute,
                        'element': mgcElement,
                    }
                    magic_list.append(magic)
                for equipmentName, equipmentQnt, equipmentAtk, equipmentDef in zip(eqpsName, eqpsQnt, eqpsAtk, eqpsDef):
                    equipment = {
                        'name': equipmentName,
                        'quantity': equipmentQnt,
                        'attack': equipmentAtk,
                        'defense': equipmentDef
                    }
                    equipment_list.append(equipment)
                ctx = {
                    'errors': errors,
                    'equipments': equipment_list,
                    'magics': magic_list,
                    'app_name': 'sheets'
                }
                if 'name' not in errors:
                    ctx['name'] = name
                if 'image' not in errors:
                    ctx['image'] = image
                if 'race' not in errors:
                    ctx['race'] = race
                if 'role' not in errors:
                    ctx['role'] = role
                if 'description' not in errors:
                    ctx['description'] = description
                for atributo in atributos:
                    if atributo not in errors:
                        valor = request.POST.get(atributo)
                        ctx[atributo] = valor
                for atributo in atributos2:
                    if atributo not in errors:
                        valor = request.POST.get(atributo)
                        ctx[atributo] = valor
                        
                if errors:
                    print("Errors: ", errors)
                return render(request, 'sheets_app/create-sheets.html', ctx)
            
        for equipmentName, equipmentQnt, equipmentAtk, equipmentDef in zip(eqpsName, eqpsQnt, eqpsAtk, eqpsDef):
            equipment = Equipment(name=equipmentName, quantity=equipmentQnt, attack=equipmentAtk, defense=equipmentDef, sheet_id=errors.id)
            equipment.save()       
        
        for mgcName,mgcDesc, mgcDamage, mgcAtribute, mgcElement in zip(magicName, magicDescription, magicDamage, atributeModifier, element):
            magic =  Magic(name=mgcName,description=mgcDesc, damage = mgcDamage, atribute_modifier = mgcAtribute, element = mgcElement, sheet_id = errors.id)
            magic.save()
        return redirect('sheets:homesheets')

class EditSheetView(LoginRequiredMixin, View): # classe pra atualizar fichas :
    def get(self, request, id):
        user_id = request.user.id
        

        sheet = get_object_or_404(Sheet, id=id)
        is_sheet_owner = (sheet.user_id == user_id)
        if sheet.campaign:
            campaign = sheet.campaign
            is_campaign_owner = (campaign.user_id == user_id)

        image = sheet.image
        magics = Magic.objects.filter(sheet_id=id)
        equipments = Equipment.objects.filter(sheet_id=id)
        mana = (sheet.mana/sheet.manaMax)*100
        hp = (sheet.healthPoint/sheet.healthPointMax)*100
        exp = (sheet.exp/sheet.expMax)*100
        atk = sheet.totalAtkDef()['atk'] 
        defe = sheet.totalAtkDef()['def']
        
        if int(sheet.healthPoint) > int(sheet.healthPointMax):
            sheet.healthPoint = sheet.healthPointMax
            hp = 100
            
        if int(sheet.mana) > int(sheet.manaMax):
            sheet.mana = sheet.manaMax
            mana = 100
        
        ctx = { 
            'app_name': 'sheets',
            'sheet': sheet,
            'mana': int(mana),
            'hp': int(hp),
            'exp': int(exp),
            'atk': atk,
            'def': defe,
        }
        if  image:
            ctx['image'] = image
        #elif not image:
        #   ctx['image'] = None
        #print(image)
        if not magics:
            ctx['magics'] = None
        else:
            ctx['magics'] = magics

        if not equipments:
            ctx['equipments'] = None
        else:
            ctx['equipments'] = equipments

        if is_sheet_owner or is_campaign_owner:
            return render(request, 'sheets_app/view-sheet.html', ctx)
    
    def post(self, request, id):
        sheet = get_object_or_404(Sheet, id=id)

        expPercent = (sheet.exp/sheet.expMax)*100
        mana = int((sheet.mana/sheet.manaMax)*100)
        hp = int((sheet.healthPoint/sheet.healthPointMax)*100)

        name = request.POST.get('name')
        image = request.POST.get('image')
        strength = request.POST.get('strength')
        intelligence = request.POST.get('intelligence')
        wisdom = request.POST.get('wisdom')
        charisma = request.POST.get('charisma')
        constitution = request.POST.get('constitution')
        speed = request.POST.get('speed')
    
        healthPoint = request.POST.get('healthPoint')
        healthPointMax = request.POST.get('healthPointMax')
        manaActual = request.POST.get('manaActual')
        manaMax = request.POST.get('manaMax')
        exp = request.POST.get('exp')

        description = request.POST.get('description')

        eqpsName = request.POST.getlist('equipmentName')
        eqpsQnt = request.POST.getlist('equipmentQnt')
        eqpsAtk = request.POST.getlist('equipmentAtk')
        eqpsDef = request.POST.getlist('equipmentDef')
        equipment_list = []

        magicName = request.POST.getlist('mgcName')
        magicDescription = request.POST.getlist('mgcDesc')
        magicDamage = request.POST.getlist('mgcDamage')
        atributeModifier = request.POST.getlist('mgcAttribute')
        element = request.POST.getlist('mgcElement')
        magic_list = []

        atk = sheet.totalAtkDef()['atk'] 
        defe = sheet.totalAtkDef()['def']
        expMax = sheet.expMax
        expActual = sheet.exp

        # if exp < xp:
        #     errors.append()
        updated = sheet_update(name, strength, intelligence, wisdom, charisma, constitution, speed, healthPoint, healthPointMax, manaActual, manaMax, exp, expActual, expMax)
        if not isinstance(updated, Sheet):
            atributos = ['strength', 'intelligence', 'wisdom', 'charisma', 'constitution', 'speed']
            atributos2 = ['healthPointMax', 'manaMax']
            experiencia = ['exp', 'expActual', 'expMax']
            for mgcName,mgcDesc, magicDamage , mgcAtribute, mgcElement in zip(magicName, magicDescription, magicDamage, atributeModifier, element):
                magic = {
                    'name': mgcName,
                    'description': mgcDesc,
                    'damage': magicDamage,
                    'atribute': mgcAtribute,
                    'element': mgcElement,
                }
                magic_list.append(magic)
            for equipmentName, equipmentQnt, equipmentAtk, equipmentDef in zip(eqpsName, eqpsQnt, eqpsAtk, eqpsDef):
                equipment = {
                    'name': equipmentName,
                    'quantity': equipmentQnt,
                    'attack': equipmentAtk,
                    'defense': equipmentDef
                }
                equipment_list.append(equipment)
            ctx = {
                'errors': updated,
                'equipments': equipment_list,
                'magics': magic_list,
                'app_name': 'sheets',
                'sheet': sheet,
                'atk': atk,
                'def': defe,
                'exp': int(expPercent),
                'mana': mana,
                'hp': hp
            }
            if 'name' not in updated:
                ctx['name'] = name
            if 'image' not in updated:
                ctx['image'] = image
            if 'description' not in updated:
                ctx['description'] = description
            for atributo in atributos:
                if atributo not in updated:
                    valor = request.POST.get(atributo)
                    ctx[atributo] = valor
            for atributo in atributos2:
                if atributo not in updated:
                    valor = request.POST.get(atributo)
                    ctx[atributo] = valor
            # for xp in experiencia:
            #     if xp not in updated:
            #         valor = request.POST.get(xp)
            #         ctx[xp] = valor
            return render(request, 'sheets_app/view-sheet.html', ctx)

        equipments = Equipment.objects.filter(sheet_id=sheet.id)
        equipment_lists = []
        for equipmentName, equipmentQnt, equipmentAtk, equipmentDef in zip(eqpsName, eqpsQnt, eqpsAtk, eqpsDef):
            for i in equipments:
                if i.name == equipmentName:
                    equipment_lists.append(equipmentName)
            if  equipmentName not in equipment_lists:
                equipment = Equipment(name=equipmentName, quantity=equipmentQnt, attack=equipmentAtk, defense=equipmentDef, sheet_id=sheet.id)
                equipment.save()  
        
        magics = Magic.objects.filter(sheet_id=sheet.id)
        magic_lists = []
        for mgcName, mgcDesc, mgcDamage, mgcAtribute, mgcElement in zip(magicName, magicDescription, magicDamage, atributeModifier, element):
            for i in magics:
                if i.name == mgcName:
                    magic_lists.append(mgcName)
            if  mgcName not in magic_lists:
                magic =  Magic(name=mgcName,description=mgcDesc, damage = mgcDamage, atribute_modifier = mgcAtribute, element = mgcElement, sheet_id = sheet.id)
                magic.save()

        sheet.name = name
        sheet.image = image if image else None
        sheet.strength = int(strength)
        sheet.intelligence = int(intelligence)
        sheet.wisdom = int(wisdom)
        sheet.charisma = int(charisma)
        sheet.constitution = int(constitution)
        sheet.speed = int(speed)
        sheet.healthPoint = int(healthPoint)
        sheet.healthPointMax = int(healthPointMax)
        sheet.mana = int(manaActual)
        sheet.manaMax = int(manaMax)
        sheet.description = description
        sheet.exp = int(exp)
        expMax = sheet.expMax

        sheet.expTotal += int(exp) - expActual

        sheet.save()
        sheet.updateXp()

        updated = sheet_update(name, strength, intelligence, wisdom, charisma, constitution, speed, healthPoint, healthPointMax, manaActual, manaMax, exp, expActual, expMax)
        
        if isinstance(updated, Sheet):
            messages.success(request,'Ficha atualizada com sucesso!')
            sheet.save()
            return redirect(reverse('sheets:edit_sheet', kwargs={'id': id}))
        else:
            atributos = ['strength', 'intelligence', 'wisdom', 'charisma', 'constitution', 'speed']
            atributos2 = ['healthPointMax', 'manaMax']
            experiencia = [ 'exp', 'expActual', 'expMax']
            for mgcName,mgcDesc, magicDamage , mgcAtribute, mgcElement in zip(magicName, magicDescription, magicDamage, atributeModifier, element):
                magic = {
                    'name': mgcName,
                    'description': mgcDesc,
                    'damage': magicDamage,
                    'atribute': mgcAtribute,
                    'element': mgcElement,
                }
                magic_list.append(magic)
            for equipmentName, equipmentQnt, equipmentAtk, equipmentDef in zip(eqpsName, eqpsQnt, eqpsAtk, eqpsDef):
                equipment = {
                    'name': equipmentName,
                    'quantity': equipmentQnt,
                    'attack': equipmentAtk,
                    'defense': equipmentDef
                }
                equipment_list.append(equipment)
            ctx = {
                'errors': updated,
                'equipments': equipment_list,
                'magics': magic_list,
                'app_name': 'sheets',
                'sheet': sheet,
                'atk': atk,
                'def': defe,
                'exp': int(expPercent),
                'mana': mana,
                'hp': hp
            }
            if 'name' not in updated:
                ctx['name'] = name
            if 'image' not in updated:
                ctx['image'] = image
            if 'description' not in updated:
                ctx['description'] = description
            for atributo in atributos:
                if atributo not in updated:
                    valor = request.POST.get(atributo)
                    ctx[atributo] = valor
            for atributo in atributos2:
                if atributo not in updated:
                    valor = request.POST.get(atributo)
                    ctx[atributo] = valor
            for xp in experiencia:
                if xp not in updated:
                    valor = request.POST.get(xp)
                    ctx[xp] = valor
            return render(request, 'sheets_app/view-sheet.html', ctx)   

class CreateSheetInCampaingView(LoginRequiredMixin, View):
  
    def get(self, request, id):
        campaign = Campaign.objects.get(code=id)
        races = Race.objects.filter(campaign_id=campaign.id)
        classes = Class.objects.filter(campaign_id=campaign.id)

        ctx = {
            'app_name': 'sheets',
            'id': campaign.id,
            'title': campaign.title,
            'races': races,
            'classes': classes       
        }
        return render(request, 'sheets_app/create-sheets-campaign.html', ctx)
    
    def post(self, request, id):
        campaign = Campaign.objects.get(id=id)
        races = Race.objects.filter(campaign_id=campaign.id)
        classes = Class.objects.filter(campaign_id=campaign.id)

        name = request.POST.get('name')
        image = request.POST.get('image')
        race = request.POST.get('race', " ")
        role = request.POST.get('role', " ")

        race_used = Race.objects.filter(campaign_id=campaign.id, name=race).first()
        race_used.is_used += 1     

        role_used = Class.objects.filter(campaign_id=campaign.id, name=role).first()
        role_used.is_used += 1        

        strength = request.POST.get('strength')
        intelligence = request.POST.get('intelligence')
        wisdom = request.POST.get('wisdom')
        charisma = request.POST.get('charisma')
        constitution = request.POST.get('constitution')
        speed = request.POST.get('speed')

        healthPointMax = request.POST.get('healthPointMax')
        manaMax = request.POST.get('manaMax')
        exp = request.POST.get('exp')

        description = request.POST.get('description')

        eqpsName = request.POST.getlist('equipmentName')
        eqpsQnt = request.POST.getlist('equipmentQnt')
        eqpsAtk = request.POST.getlist('equipmentAtk')
        eqpsDef = request.POST.getlist('equipmentDef')

        magicName = request.POST.getlist('mgcName')
        magicDescription = request.POST.getlist('mgcDesc')
        magicDamage = request.POST.getlist('mgcDamage')
        atributeModifier = request.POST.getlist('mgcAttribute')
        element = request.POST.getlist('mgcElement')
        user_id = request.user.id

        equipment_list = []
        magic_list = []

        errors = save_sheet_in_campaign(name, race, role, image, strength, intelligence, wisdom, charisma, constitution, speed, healthPointMax, manaMax, exp, user_id, description, campaign.id)
        if errors:
            atributos = ['strength', 'intelligence', 'wisdom', 'charisma', 'constitution', 'speed']
            atributos2 = ['healthPointMax', 'manaMax', 'exp']
            if str(type(errors)) != "<class 'sheets_app.models.Sheet'>":
                for mgcName,mgcDesc, magicDamage , mgcAtribute, mgcElement in zip(magicName, magicDescription, magicDamage, atributeModifier, element):
                    magic = {
                        'name': mgcName,
                        'description': mgcDesc,
                        'damage': magicDamage,
                        'atribute': mgcAtribute,
                        'element': mgcElement,
                    }
                    magic_list.append(magic)
                for equipmentName, equipmentQnt, equipmentAtk, equipmentDef in zip(eqpsName, eqpsQnt, eqpsAtk, eqpsDef):
                    equipment = {
                        'name': equipmentName,
                        'quantity': equipmentQnt,
                        'attack': equipmentAtk,
                        'defense': equipmentDef
                    }
                    equipment_list.append(equipment)
                ctx = {
                    'errors': errors,
                    'equipments': equipment_list,
                    'magics': magic_list,
                    'app_name': 'sheets',
                    'id': campaign.id,
                    'races': races,
                    'classes': classes
                }
                if 'name' not in errors:
                    ctx['name'] = name
                if 'image' not in errors:
                    ctx['image'] = image
                if 'race' not in errors:
                    ctx['race'] = race
                if 'role' not in errors:
                    ctx['role'] = role
                if 'description' not in errors:
                    ctx['description'] = description
                for atributo in atributos:
                    if atributo not in errors:
                        valor = request.POST.get(atributo)
                        ctx[atributo] = valor
                for atributo in atributos2:
                    if atributo not in errors:
                        valor = request.POST.get(atributo)
                        ctx[atributo] = valor
                        
                if errors:
                    print("Errors: ", errors)
                return render(request, 'sheets_app/create-sheets-campaign.html', ctx)
            
        for equipmentName, equipmentQnt, equipmentAtk, equipmentDef in zip(eqpsName, eqpsQnt, eqpsAtk, eqpsDef):
            equipment = Equipment(name=equipmentName, quantity=equipmentQnt, attack=equipmentAtk, defense=equipmentDef, sheet_id=errors.id)
            equipment.save()       
        
        for mgcName,mgcDesc, mgcDamage, mgcAtribute, mgcElement in zip(magicName, magicDescription, magicDamage, atributeModifier, element):
            magic =  Magic(name=mgcName,description=mgcDesc, damage = mgcDamage, atribute_modifier = mgcAtribute, element = mgcElement, sheet_id = errors.id)
            magic.save()

        race_used.save()
        role_used.save()
        return redirect('sheets:homesheets')

class DeleteSheetView(LoginRequiredMixin, View):
    def post(self, request, id):
        sheet = get_object_or_404(Sheet, pk=id, user=request.user)

        if sheet.campaign:
            campaign = sheet.campaign
            
            race_used = Race.objects.filter(campaign_id=campaign.id, name=sheet.race).first()
            race_used.is_used -= 1     
            if race_used.is_used < 0:     
                race_used.is_used = 0     

            role_used = Class.objects.filter(campaign_id=campaign.id, name=sheet.role).first()
            role_used.is_used -= 1   
            if role_used.is_used < 0:     
                role_used.is_used = 0     

            race_used.save()
            role_used.save()

        sheet.delete()
        return redirect('sheets:homesheets')

class AddEquipmentView(LoginRequiredMixin, View):

    # TO DO: Tratar se um equipamento já existe
    def get(self, request):
        return render(request, 'sheets_app/create_equip.html')

    def post(self, request):
        name = (request.POST.get('name'))
        quantity = int(request.POST.get('quantity'))
        attack = int(request.POST.get('attack'))
        defense = int(request.POST.get('defense'))
        sheet = (request.POST.get('sheet'))

        addEquipmentFields = save_equipment(0, name, int(quantity), int(attack), int(defense), 1)

        if addEquipmentFields != 1:
            ctx = {
                'errors': addEquipmentFields,
                'app_name': 'sheets'
            }
        return render(request, 'sheets_app/create_equip.html', ctx)

class ListEquipmentView(LoginRequiredMixin, View):
    def get(self, request):
        equipments = Equipment.objects.all()
        ctx = {
            'equipments': equipments
        }
        return render(request, 'sheets_app/testEquipment2.html', ctx)
    
class EditEquipmentView(LoginRequiredMixin, View): 
    # Editar equipamento na visualização de ficha
    def post(self, request, id):
        try:
            equipment = Equipment.objects.get(id=id)
        except:
            return HttpResponse('Esse equipamento não existe')
        
        newName = request.POST.get('editName')
        newQuantity = request.POST.get('editQuantity')
        newAttack = request.POST.get('editAttack')
        newDefense = request.POST.get('editDefense')

        errors = save_equipment(newName, newQuantity, newAttack, newDefense, equipment)

        if errors:
            ctx = {
                'errors': errors
            }
            #messages.error('Erro ao editar equipamento')
            print(errors)
            return redirect(reverse('sheets:edit_sheet', kwargs={'id': equipment.sheet_id}), ctx)
        
        return redirect(reverse('sheets:edit_sheet', kwargs={'id': equipment.sheet_id}))

class DelEquipmentView(LoginRequiredMixin, View):
    def post(self, request, id):
        equipment = Equipment.objects.get(id=id)
        equipment.delete()
        return redirect(reverse('sheets:edit_sheet', kwargs={'id': equipment.sheet_id}))        

class EditMagicView(LoginRequiredMixin, View): 
    def post(self, request, id):
        try:
            magic = Magic.objects.get(id=id)
        except:
            return HttpResponse('Essa magia não existe')
        
        name = request.POST.get('nameMagicEdit')
        description = request.POST.get('descriptionMagicEdit')
        damage = request.POST.get('damageMagicEdit')
        atribute_modifier = request.POST.get('attributeMagicEdit')
        element = request.POST.get('elementMagicEdit')

        magic.name = name   
        magic.description = description
        magic.damage = damage
        magic.atribute_modifier = atribute_modifier
        magic.element = element
        magic.save()
        
        return redirect(reverse('sheets:edit_sheet', kwargs={'id': magic.sheet_id}))

class DeleteMagicView(LoginRequiredMixin, View):
    def post(self, request, id):
        magic = Magic.objects.get(id=id)
        magic.delete()
        return redirect(reverse('sheets:edit_sheet', kwargs={'id': magic.sheet_id}))