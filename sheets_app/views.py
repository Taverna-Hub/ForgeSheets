from django.shortcuts import render, redirect, get_object_or_404
from django.views import View
from django.http import HttpResponse
from .models import Equipment, Sheet, Magic
from .utils import save_equipment, save_sheet#, update_sheet
from django.contrib import messages
from django.contrib.auth.mixins import LoginRequiredMixin

class SheetsView(LoginRequiredMixin, View):
    def get(self, request):
        sheets_view = Sheet.objects.filter(user_id=request.user.id)
        ctx = {
            'sheets_view': sheets_view,
            'app_name': 'sheets',
            'user': request.user,
        }
        return render(request, 'sheets_app/sheets.html', ctx)


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

        eqpsName = (request.POST.getlist('equipmentName'))  
        eqpsQnt = (request.POST.getlist('equipmentQnt'))
        eqpsAtk = (request.POST.getlist('equipmentAtk'))
        eqpsDef = (request.POST.getlist('equipmentDef'))

        magicName = (request.POST.getlist('mgcName'))
        magicDescription = (request.POST.getlist('mgcDesc'))
        magicDamage = request.POST.getlist('mgcDamage')
        atributeModifier = (request.POST.getlist('mgcAttribute'))
        element = request.POST.getlist('mgcElement')
        print(magicName, magicDescription, magicDamage, atributeModifier, element)
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
                
                return render(request, 'sheets_app/create-sheets.html', ctx)
            
        for equipmentName, equipmentQnt, equipmentAtk, equipmentDef in zip(eqpsName, eqpsQnt, eqpsAtk, eqpsDef):
            equipment = Equipment(name=equipmentName, quantity=equipmentQnt, attack=equipmentAtk, defense=equipmentDef, sheet_id=errors.id)
            equipment.save()       
        
        for mgcName,mgcDesc, mgcDamage, mgcAtribute, mgcElement in zip(magicName, magicDescription, magicDamage, atributeModifier, element):
            magic =  Magic(name=mgcName,description=mgcDesc, damage = mgcDamage, atribute_modifier = mgcAtribute, element = mgcElement, sheet_id = errors.id)
            magic.save()
        return redirect('sheets:homesheets')

class ViewSheetView(LoginRequiredMixin, View): # classe pra atualizar fichas :
    def get(self, request, id):
        sheet = get_object_or_404(Sheet, id=id)
        magics = Magic.objects.filter(sheet_id=id)
        equipments = Equipment.objects.filter(sheet_id=id)

        ctx = { 
            'sheet': sheet,
        }

        if not magics:
            ctx['magics'] = None
        else:
            ctx['magics'] = magics

        if not equipments:
            ctx['equipments'] = None
        else:
            ctx['equipments'] = equipments
            
        return render(request, 'sheets_app/view-sheet.html', ctx)
    
    def post(self, request, id):
        sheet = get_object_or_404(Sheet, id=id)

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
        sheet.exp = int(exp)
        sheet.description = description

        print(sheet.level())
        sheet.save()
        print(sheet.exp)
        sheet.updateXp()
        sheet.save()

        print(sheet.exp)
        print(sheet.level())
        sheet.save()
    
        if isinstance(sheet, Sheet):
            sheet.save()
            messages.success(request, 'Ficha atualizada com sucesso!')
            return redirect('sheets:homesheets')
        else:
            messages.error(request, 'Erro ao atualizar ficha.')
            return redirect('sheets:view_sheet')        
        

class CreateSheetInCampaingView(LoginRequiredMixin, View):
    def get(self, request, id):
        return render(request, 'sheets_app/create-sheets.html')

class DeleteSheetView(LoginRequiredMixin, View):
    def post(self, request, pk):
        sheet = get_object_or_404(Sheet, pk=pk, user=request.user)
        sheet.delete()
        return redirect('')


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

class DelEquipmentView(LoginRequiredMixin, View):
    def post(self, request, id):
        equipment = Equipment.objects.get(id=id)
        equipment.delete()
        return redirect('sheets:list_equipment')
    
class ListEquipmentView(LoginRequiredMixin, View):
    def get(self, request):
        equipments = Equipment.objects.all()
        ctx = {'equipments': equipments}
        return render(request, 'sheets_app/testEquipment2.html', ctx)
    
class EditEquipmentView(LoginRequiredMixin, View):
    
    # TO DO: Tratar se um equipamento já existe
    def get(self, request, id):
        equipment = Equipment.objects.filter(id=id).first()
        if not equipment:
            return HttpResponse('Esse equipamento não existe')
        ctx = {'equipment': equipment}
        return render(request, 'sheets_app/testEquipment3.html', ctx)
    
    def post(self, request, id):
        try:
            equipment = Equipment.objects.get(id=id)
        except:
            return HttpResponse('Esse equipamento não existe')
        
        newName = request.POST.get('name')
        newQuantity = (request.POST.get('quantity'))
        newAttack = (request.POST.get('attack'))
        newDefense = (request.POST.get('defense'))

        editEquipmentResult = save_equipment(equipment,newName, int(newQuantity), int(newAttack), int(newDefense), 0)

        if editEquipmentResult == 0:
            messages.error(request, 'Nome inválido')
            ctx = {'quantity': newQuantity, 'attack': newAttack, 'defense': newDefense, 'equipment': equipment}
            return render(request, 'sheets_app/testEquipment3.html', ctx)
        elif editEquipmentResult == 2:
            messages.error(request, 'Preencha todos os campos')
            ctx = {'name': newName, 'quantity': newQuantity, 'attack': newAttack, 'defense': newDefense, 'equipment': equipment}
            return render(request, 'sheets_app/testEquipment3.html', ctx)
        elif editEquipmentResult == 3:
            messages.error(request, 'A quantidade não pode ser inferior a 1')
            ctx = {'name': newName, 'attack': newAttack, 'defense': newDefense, 'equipment': equipment}
            return render(request, 'sheets_app/testEquipment3.html', ctx)
        elif editEquipmentResult == 4:
            messages.error(request, 'O ataque e a defesa não podem ser inferior a 0')
            ctx = {'name': newName, 'quantity': newQuantity, 'equipment': equipment}
            return render(request, 'sheets_app/testEquipment3.html', ctx)
        elif editEquipmentResult == 5:
            messages.error(request, 'Utilize apenas números inteiros')
            ctx = {'name': newName, 'equipment': equipment}
            return render(request, 'sheets_app/testEquipment3.html', ctx)
        if editEquipmentResult == 1:
            messages.success(request, 'Equipamento editado com sucesso')
            return redirect('sheets:list_equipment')