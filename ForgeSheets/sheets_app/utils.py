from .models import Equipment, Sheet, Race
import re

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


