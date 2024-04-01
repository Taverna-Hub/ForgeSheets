from django.shortcuts import render
from django.views import View
from django.http import HttpResponse

class Sheets(View):
    def get(self, request):
        return render(request, 'sheets.html')
    

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
            

