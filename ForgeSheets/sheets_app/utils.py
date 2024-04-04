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
        if attack < 0 or defense < 0:
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

def save_sheet(name, image, race, role, strength, inteligence, wisdow, charisma, constitution, speed, healthpointMax, manaMax, exp):
    if 2 < len(name) > 50:
        return 0
    if str(name).count(' ') == len(name) or str(race).count(' ') == len(str(race) or str(role).count(' ') == len(str(role))):
        return 2
    if not re.match(r"^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$", image):
        return 3
    if 20 < strength < 1 or 20 < inteligence < 1 or 20 < wisdow < 1 or 20 < charisma < 1 or 20 < constitution < 1 or 20 < speed < 1:
        return 4
    if atribute_verifier(strength) == 1 or  atribute_verifier(inteligence) == 1 or atribute_verifier(wisdow) == 1 or atribute_verifier(charisma) == 1 or atribute_verifier(constitution) == 1 or atribute_verifier(speed) == 1:
        return 5
    if atribute_verifier(healthpointMax) == 1 or atribute_verifier(manaMax) == 1 or atribute_verifier(exp) == 1:
        return 6
    else: return 1