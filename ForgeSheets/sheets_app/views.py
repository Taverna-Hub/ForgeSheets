from django.shortcuts import render, redirect
from django.views import View
from django.http import HttpResponse
from .models import Equipment, Sheet
from .utils import save_equipment
from django.contrib import messages
from django.contrib.auth.decorators import login_required

@login_required
class Sheets(View):
    def get(self, request):
        return render(request, 'sheets.html')
@login_required
class CreateSheet(View):
    def get(self, request):
        return render(request, 'createsheets.html')
    
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
 
        user_id = request.user.id

        sheet = Sheet(
            name = name, 
            image = image,
            race_id = race,
            role = role,
            strength = strength,
            intelligence = intelligence,
            wisdom = wisdom,
            charisma = charisma,
            constitution = constitution,
            speed = speed,
            healthPoint = healthPointMax,
            healthPointMax = healthPointMax,
            mana = manaMax,
            manaMax = manaMax,
            exp = expMax,
            expMax = expMax,
            notes = '',
            description = '',
            user_id = user_id,
        )
        sheet.save()
        return HttpResponse('Ficha salva com sucesso!')
    

@login_required
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
@login_required
class DelEquipmentView(View):
    def post(self, request, id):
        equipment = Equipment.objects.get(id=id)
        equipment.delete()
        messages.error(request, 'Equipamento deletado com sucesso')
        return redirect('sheets:list_equipment')
@login_required  
class ListEquipmentView(View):
    def get(self, request):
        equipments = Equipment.objects.all()
        ctx = {'equipments': equipments}
        return render(request, 'sheets_app/testEquipment2.html', ctx)
    
@login_required
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