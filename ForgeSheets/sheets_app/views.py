from django.shortcuts import render, redirect
from django.views import View
from django.http import HttpResponse
from .models import Equipment, Sheet
from .utils import save_equipment, save_sheet
from django.contrib import messages
from django.contrib.auth.mixins import LoginRequiredMixin

class SheetsView(LoginRequiredMixin, View):
    def get(self, request):
        ctx = {
            'app_name': 'sheets'
        }
        return render(request, 'sheets_app/sheets.html', ctx)
    
class CreateSheetView(LoginRequiredMixin, View):
    def get(self, request):
        ctx = {
            'app_name': 'sheets'
        }
        return render(request, 'sheets_app/createsheets.html', ctx)
    
    def post(self, request):
        name = request.POST.get('name')
        image = request.POST.get('image')

        race = request.POST.get('race')
        role = request.POST.get('role')

        strength = int(request.POST.get('strength')) 
        intelligence = int(request.POST.get('intelligence'))
        wisdom = int(request.POST.get('wisdom'))
        charisma = int(request.POST.get('charisma'))
        constitution = int(request.POST.get('constitution'))
        speed = int(request.POST.get('speed'))

        healthPointMax = int(request.POST.get('healthPointMax'))
        manaMax = int(request.POST.get('manaMax'))
        exp = int(request.POST.get('exp'))

        description = request.POST.get('description')

        user_id = request.user.id
        
        #add imagem
        errors = save_sheet(name, race, role, strength, intelligence, wisdom, charisma, constitution, speed, healthPointMax, manaMax, exp, user_id, description)
        print(errors)
        if errors:
            ctx = {
                'errors': errors,
                'app_name': 'sheets'
            }
            return render(request, 'sheets_app/createsheets.html', ctx)
       
        
        eqpsName = request.POST.getlist('equipmentName')
        eqpsQnt = request.POST.getlist('equipmentQnt')
        eqpsAtk = request.POST.getlist('equipmentAtk')
        eqpsDef = request.POST.getlist('equipmentDef')

        for equipmentName, equipmentQnt, equipmentAtk, equipmentDef in zip(eqpsName, eqpsQnt, eqpsAtk, eqpsDef):
            equipment = Equipment(name=equipmentName, quantity=equipmentQnt, attack=equipmentAtk, defense=equipmentDef, sheet_id=sheet.id)
            equipment.save()       
        
        return HttpResponse('Ficha salva com sucesso!')
    

class AddEquipmentView(LoginRequiredMixin, View):

    # TO DO: Tratar se um equipamento já existe

    def get(self, request):
        # return render(request, 'sheets_app/testEquipment.html')
        return render(request, 'sheets_app/create_equip.html')

    def post(self, request):
        name = request.POST.get('name')
        quantity = request.POST.get('quantity')
        attack = request.POST.get('attack')
        defense = request.POST.get('defense')
        sheet = request.POST.get('sheet')

        addEquipmentResult = save_equipment(0, name, int(quantity), int(attack), int(defense), sheet)

        if addEquipmentResult == 0:
            messages.error(request, 'Nome inválido')
            ctx = {'quantity': quantity, 'attack': attack, 'defense': defense}
            return render(request, 'sheets_app/testEquipment.html', ctx)
        elif addEquipmentResult == 2:
            messages.error(request, 'Preencha todos os campos')
            ctx = {'name': name, 'quantity': quantity, 'attack': attack, 'defense': defense}
            return render(request, 'sheets_app/testEquipment.html', ctx)
        elif addEquipmentResult == 3:
            messages.error(request, 'A quantidade não pode ser inferior a 1')
            ctx = {'name': name, 'attack': attack, 'defense': defense}
            return render(request, 'sheets_app/testEquipment.html', ctx)
        elif addEquipmentResult == 4:
            messages.error(request, 'O ataque e a defesa não podem ser inferior a 0')
            ctx = {'name': name, 'quantity': quantity}
            return render(request, 'sheets_app/testEquipment.html', ctx)
        elif addEquipmentResult == 5:
            messages.error(request, 'Utilize apenas números inteiros')
            ctx = {'name': name}
            return render(request, 'sheets_app/testEquipment.html', ctx)
        elif addEquipmentResult == 1:
            messages.success(request, 'Equipamento adicionado com sucesso')
            return redirect('sheets:list_equipment')

#Trtamento de erro da utils na views -> precisa testar
        # addEquipmentFields = save_equipment(0, name, int(quantity), int(attack), int(defense), sheet)
        
        # if addEquipmentFields:
        #     ctx ={
        #         'errors': addEquipmentFields,
        #         'app_name': 'sheets'
        #     }
        # return render(request, 'sheets_app/create_equip', ctx)

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
        newQuantity = request.POST.get('quantity')
        newAttack = request.POST.get('attack')
        newDefense = request.POST.get('defense')

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
        elif editEquipmentResult == 1:
            messages.success(request, 'Equipamento editado com sucesso')
            return redirect('sheets:list_equipment')

        # editEquipmentFields = save_equipment(equipment,newName, int(newQuantity), int(newAttack), int(newDefense), 0)
        
        # if editEquipmentFields:
        #     ctx ={
        #         'errors': editEquipmentFields,
        #         'app_name': 'sheets'
        #     }
        # return render(request, 'sheets_app/create_equip', ctx)