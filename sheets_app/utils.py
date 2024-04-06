from .models import Equipment, Sheet, Race
import re
from django.utils.html import escape

# def save_equipment(equipment, name, quantity, attack, defense, sheet):
#     if 1 <= len(name) >= 55:
#         return 0
#     if name.count(' ') == len(name) or str(quantity).count(' ') == len(str(quantity)) or str(attack).count(' ') == len(str(attack)) or str(defense).count(' ') == len(str(defense)):
#         return 2
#     try:
#         if quantity < 1:
#             return 3
#         if attack < 0 or defense < 0:
#             return 4
#         if type(quantity) != int or type(attack) != int or type(defense) != int:
#             return 5
#     except:
#         return 5

#Trtamento de erro na utils -> precisa testar
def save_equipment(equipment, name, quantity, attack, defense, sheet):
    name_treated = name.strip()
    quantity_treated = int(quantity)
    attack_treated = int(attack)
    defense_treated = int(defense)
    wrong_fields = []

    if not name_treated:
        wrong_fields.append({
            'field': 'name',
            'message': 'Este campo não pode ser vazio'
        })
    elif len(name) > 55:
        wrong_fields.append({
            'field': 'name',
            'message': 'Este campo deve ter menos de 55 caractéres'
        })
    elif len(name) < 2:
        wrong_fields.append({
            'field': 'name',
            'message': 'Este campo deve ter mais de 2 caractéres'
        })
    if quantity_treated < 1:
        wrong_fields.append({
            'field': 'quantity',
            'message': 'A quantidade não pode ser inferior a 1'
        })   
    if attack_treated < 0:
        wrong_fields.append({
            'field': 'attack',
            'message': 'O valor de ataque não pode ser inferior a 0'
        })
    if defense_treated < 0:
        wrong_fields.append({
            'field': 'defense',
            'message': 'O valor de defesa não pode ser inferior a 0'
        })

    if type(quantity) != int:
        wrong_fields.append({
            'field': 'quantity',
            'message': 'Utilize apenas números inteiros'
        })
    if type(attack) != int:
        wrong_fields.append({
            'field': 'attack',
            'message': 'Utilize apenas números inteiros'
        })

    if type(defense) != int:
        wrong_fields.append({
            'field': 'defense',
            'message': 'Utilize apenas números inteiros'
        })


    if len(wrong_fields) > 0:
        return wrong_fields
    
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
    return 1 if not re.match(r'^[-+]?\d*\.?\d+$', atr) else 0

# add imagem
def save_sheet(name, race, role, strength, intelligence, wisdom, charisma, constitution, speed, healthpointMax, manaMax, exp, user_id, description):
    errors=[]
    if 2 > len(name) or len(name) >= 50:
        errors.append({
            'field':'name',
            'message': 'Esse campo necessita ter entre 2 e 50 caracteres'
            })
    if str(name).count(' ') == len(name):
        errors.append({
            'field': 'name',
            'message' : 'Este campo não pode ser vazio'
            })
    if str(race).count(' ') == len(str(race)):
        errors.append({
            'field': 'race',
            'message' : 'Este campo não pode ser vazio'
            })
    if str(role).count(' ') == len(str(role)):
        errors.append({
            'field': 'role',
            'message' : 'Este campo não pode ser vazio'
            })
    if str(strength).count(' ') == len(str(strength)) or str(intelligence).count(' ') == len(str(intelligence)) or str(wisdom).count(' ') == len(str(wisdom)) or str(charisma).count(' ') == len(str(charisma)) or str(constitution).count(' ') == len(str(constitution)) or str(speed).count(' ') == len(str(speed)):
        errors.append({
            'field': 'atributes1',
            'message' : 'Estes campos não podem ser vazios'
            })
    # if not re.match(r"^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$", image):
    #     errors.app{
    # 'field':'url invalida',
    #                    'message' : 'insira uma url valida'
    # })
    elif 20 <= int(strength) or int(strength) <= 1 or 20 <= int(intelligence) or int(intelligence) <= 1 or 20 <= int(wisdom) or int(wisdom) <= 1 or 20 <= int(charisma) or int(charisma) <= 1 or 20 <= int(constitution) or int(constitution) <= 1 or 20 <= int(speed) or int(speed) <= 1:
        errors.append({
            'field' : 'atributes1',
            'message' : 'Os atributos devem estar entre 1 e 20'
            })
    elif atribute_verifier(str(strength)) == 1 or atribute_verifier(str(intelligence)) == 1 or atribute_verifier(str(wisdom)) == 1 or atribute_verifier(str(charisma)) == 1 or atribute_verifier(str(constitution)) == 1 or atribute_verifier(str(speed)) == 1:
        errors.append({
            'field' : 'atributes1',
            'message' : 'Os atributos primarios devem ser numeros inteiros'
            })
    if str(healthpointMax).count(' ') == len(str(healthpointMax)) or str(exp).count(' ') == len(str(exp)) or str(manaMax).count(' ') == len(str(manaMax)):
        errors.append({
            'field': 'atributes2',
            'message' : 'Estes campos não podem ser vazios'
            })

    elif atribute_verifier(str(healthpointMax)) == 1 or atribute_verifier(str(manaMax)) == 1 or atribute_verifier(str(exp)) == 1:
        errors.append({
            'field' : 'atributes2',
            'message' : 'Os atributos secundarios devem ser numeros inteiros'
            })
    elif int(healthpointMax) < 1 or int(manaMax) < 1:
        errors.append({
            'field' : 'atributes2',
            'message' : 'Vida e mana não podem ser menores que 1'
            })
    if len(errors) > 0:
        return errors
    #add imagem
    sheet = Sheet(name = name, race = race, role = role, strength = strength, intelligence = intelligence, wisdom = wisdom, charisma = charisma, constitution = constitution, speed = speed, healthPointMax = healthpointMax, manaMax = manaMax, exp = exp, healthPoint = healthpointMax, mana = manaMax, user_id = user_id, description = description)
    sheet.save()
    # sheet.updateXp()
    # sheet.save()
    return sheet