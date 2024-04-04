from .models import Equipment, Sheet, Race
import re
from django.utils.html import escape

def save_equipment(equipment, name, quantity, attack, defense, sheet):
    if 1 <= len(name) >= 55:
        return 0
    if name.count(' ') == len(name) or str(quantity).count(' ') == len(str(quantity)) or str(attack).count(' ') == len(str(attack)) or str(defense).count(' ') == len(str(defense)):
        return 2
    try:
        if quantity < 1:
            return 3
        if attack <= 0 or defense <= 0:
            return 4
        if type(quantity) != int or type(attack) != int or type(defense) != int:
            return 5
    except:
        return 5
    
    if sheet == 0:
            equipment.name = name
            equipment.quantity = quantity
            equipment.attack = attack
            equipment.defense = defense
            equipment.save()
            return 1
    else:
        equipamento = Equipment(
                name = name,
                quantity = quantity,
                attack = attack,
                defense = defense,
                sheet_id = sheet,
            )

        equipamento.save()
        return 1
def atribute_verifier(atr):
    return 1 if atr not in "1234567890" else 0

def save_sheet(name, image, race, role, strength, intelligence, wisdom, charisma, constitution, speed, healthpointMax, manaMax, exp):
    errors=[]
    if 1 < len(name) >= 50:
        errors.append('nome fora padrão')
    if str(name).count(' ') == len(name) or str(race).count(' ') == len(str(race) or str(role).count(' ') == len(str(role))):
        errors.append('nome vazio')
    if not re.match(r"^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$", image):
        errors.append('url invalida')
    if 20 < strength < 1 or 20 < intelligence < 1 or 20 < wisdom < 1 or 20 < charisma < 1 or 20 < constitution < 1 or 20 < speed < 1:
        errors.append('atr prim invalidos')
    if atribute_verifier(strength) == 1 or  atribute_verifier(intelligence) == 1 or atribute_verifier(wisdom) == 1 or atribute_verifier(charisma) == 1 or atribute_verifier(constitution) == 1 or atribute_verifier(speed) == 1:
        errors.append('atr prim não numeros')
    if atribute_verifier(healthpointMax) == 1 or atribute_verifier(manaMax) == 1 or atribute_verifier(exp) == 1:
        errors.append('atr sec não numeros')
    if healthpointMax < 1 or manaMax < 1:
        errors.append('atr sec invalidos')
    if len(errors) > 0:
        return errors
    
    sheet = Sheet(name = name, image = image, race = race, role = role, strength = strength, intelligence = intelligence, wisdom = wisdom, charisma = charisma, constitution = constitution, speed = speed, healthpointMax = healthpointMax, manaMax = manaMax, exp = exp)
    sheet.save()
    sheet.updateXp()
    sheet.save()