from django.shortcuts import render, redirect
from django.views import View
from django.http import HttpResponse
from .models import Equipment, Sheet
from .utils import equipment_check
from django.contrib import messages

class AddEquipmentView(View):

    # TO DO: Tratar se um equipamento já existe

    def get(self, request):
        return render(request, 'sheets_app/testEquipment.html')
    def post(self, request):
        name = request.POST.get('name')
        quantity = request.POST.get('quantity')
        attack = request.POST.get('attack')
        defense = request.POST.get('defense')
        sheet = request.POST.get('sheet')

        addEquipmentResult = equipment_check(name, quantity, attack, defense, sheet)
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
        else:
            equipamento = Equipment(
                name = name,
                quantity = quantity,
                attack = attack,
                defense = defense,
                sheet_id = sheet,
            )

            equipamento.save()

            return redirect('sheets:list_equipment')
    
class DelEquipmentView(View):
    def post(self, request, id):
        equipment = Equipment.objects.get(id=id)
        equipment.delete()
        return redirect('sheets:list_equipment')
    
class ListEquipmentView(View):
    def get(self, request):
        equipments = Equipment.objects.all()
        ctx = {'equipments': equipments}
        return render(request, 'sheets_app/testEquipment2.html', ctx)
    
class EditEquipmentView(View):
    
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

        editEquipmentResult = equipment_check(newName, newQuantity, newAttack, newDefense, 0)
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
        else:

            equipment.name = newName
            equipment.quantity = newQuantity
            equipment.attack = newAttack
            equipment.defense = newDefense

            equipment.save()

            return redirect('sheets:list_equipment')

class Sheets(View):
    def get(self, request):
        return render(request, 'sheets.html')
    

class CreateSheet(View):
    def get(self, request):
        return render(request, 'createsheets.html')
<<<<<<< HEAD
    
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

        healthPoint = request.POST.get('healthPoint')
        healthPointMax = request.POST.get('healthPointMax')
        mana = request.POST.get('mana')
        manaMax = request.POST.get('manaMax')
        exp = request.POST.get('exp')
        expMax = request.POST.get('expMax')

        notes = request.POST.get('notes')
        description = request.POST.get('description')
 
        user = request.POST.get('user')

        sheet = Sheets(
            name = name, 
            image = image,
            race = race,
            role = role,
            strength = strength,
            intelligence = intelligence,
            wisdom = wisdom,
            charisma = charisma,
            constitution = constitution,
            speed = speed,
            healthPoint = healthPoint,
            healthPointMax = healthPointMax,
            mana = mana,
            manaMax = manaMax,
            exp = exp,
            expMax = expMax,
            notes = notes,
            description = description,
            user = user,
        )
        sheet.save()
        return HttpResponse('Ficha salva com sucesso!')
            
=======
>>>>>>> 7897e5f2ad5a94e91c7bce59b901fe705ae76a38

