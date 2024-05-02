from .models import Equipment, Sheet, Race
import re

def sheet_update(name, strength, intelligence, wisdom, charisma, constitution, speed, healthPoint, healthPointMax, manaActual, manaMax, exp):
    errors = []

    patterns = r'^[a-zA-Z\s]+$'
    atribute_pattern = r'^[1-9]\d*$'
    
    # Tratando nomes, raças e classes aqui!
    if len(name) == 0 or name == '':
        
        errors.append({
            'field':'name',
            'message':'Insira o nome corretamente.'
        })
    if len(name) > 0:
        if not re.match(patterns, name):
            errors.append({
                'field':'name',
                'message':'Insira apenas letras e espaços.'
            })
    if len(name) > 50:
        if len(name) > 50:
            errors.append({
                'field':'name',
                'message':'Nome não pode ser maior que 50'
            })
        
    # Tratando atributos primários
    if not strength or not intelligence or not wisdom or not charisma or not constitution or not speed:
        errors.append({
            'field':'strength, intelligence, wisdom, charisma, constitution, speed',
            'message':'Preencha todos os campos.'
        })
        if not strength:
            errors.append({
                'field':'strength',
                'message':'Preencha o campo de Força.'
            })
        if not intelligence:
            errors.append({
                'field':'intelligence',
                'message':'Preencha o campo de Inteligência.'
            })
        if not wisdom:
            errors.append({
                'field':'wisdom',
                'message':'Preencha o campo de Sabedoria.'
            })
        if not charisma:
            errors.append({
                'field':'charisma',
                'message':'Preencha o campo de Carisma.'
            })
        if not constitution:
            errors.append({
                'field': 'constitution',
                'message':'Preencha o campo de Constituição.'
            })
        if not speed:
            errors.append({
                'field':'constitution',
                'message':'Preencha o campo de Velocidade'
            })
    if not re.match(atribute_pattern, strength) or not re.match(atribute_pattern, intelligence) or not re.match(atribute_pattern, wisdom) or not re.match(atribute_pattern, charisma) or not re.match(atribute_pattern, constitution) or not re.match(atribute_pattern, speed):
        if not re.match(atribute_pattern, int(strength)):
            errors.append({
                'field':'strength',
                'message':'Insira apenas inteiros positivos!'
            })
        if not re.match(atribute_pattern, int(strength)):
            errors.append({
                'field':'strength',
                'message':'Insira apenas inteiros positivos!'
            })
        if not re.match(atribute_pattern, int(wisdom)):
            errors.append({
                'field':'wisdom',
                'message':'Insira apenas inteiros positivos!'
            })
        if not re.match(atribute_pattern, int(charisma)):
            errors.append({
                'field':'charisma',
                'message':'Insira apenas inteiros positivos!'
            })
        if not re.match(atribute_pattern, int(constitution)):
            errors.append({
                'field':'constitution',
                'message':'Insira apenas inteiros positivos!'
            })
        if not re.match(atribute_pattern, int(speed)):
            errors.append({
                'field':'speed',
                'message':'Insira apenas inteiros positivos!'
            })
    elif int(strength) < 1 or int(intelligence) < 1 or int(wisdom) < 1 or int(charisma) < 1 or int(constitution) < 1 or int(speed) < 1:
        errors.append({
            'field' : 'strenth, intelligence, wisdom, charisma, constitution, speed',
            'message' : 'Os atributos devem ser maiores que 1'
            })
        if int(strength) < 1:
            errors.append({
                'field':'strength',
                'message':'Força deve ser no mínimo 1'
            })
        if int(intelligence) < 1:
            errors.append({
                'field':'intelligence',
                'message':'Inteligência deve ser no mínimo 1'
            })
        if int(wisdom) < 1 :
            errors.append({
                'field':'wisdom',
                'message':'Sabedoria deve ser no mínimo 1'
            })
        if int(charisma) < 1 :
            errors.append({
                'field':'charisma',
                'message':'Carisma deve ser no mínimo 1'
            })
        if int(constitution) < 1:
            errors.append({
                'field':'constitution',
                'message':'Constituição deve ser no mínimo 1'
            })
        if int(speed) < 1:
            errors.append({
                'field':'speed',
                'message':'Velocidade deve ser no mínimo 1'
            })
    if str(strength).count(' ') == len(str(strength)) or str(intelligence).count(' ') == len(str(intelligence)) or str(wisdom).count(' ') == len(str(wisdom)) or str(charisma).count(' ') == len(str(charisma)) or str(constitution).count(' ') == len(str(constitution)) or str(speed).count(' ') == len(str(speed)):
        errors.append({
            'field': 'strength, intelligence, wisdom, charisma, constitution, speed',
            'message' : 'Este(s) campo(s) não pode(m) ser vazio(s)!'
            })
        if str(strength).count(' ') == len(str(strength)):
            errors.append("strength")
        if str(intelligence).count(' ') == len(str(intelligence)):
            errors.append("intelligence")
        if str(charisma).count(' ') == len(str(charisma)):
            errors.append("charisma")
        if str(speed).count(' ') == len(str(speed)):
            errors.append("speed")
        if str(wisdom).count(' ') == len(str(wisdom)):
            errors.append("wisdom")
        if str(constitution).count(' ') == len(str(constitution)):
            errors.append("constitution")
    # Tratando atributos secundários
    if not all([healthPoint, healthPointMax, manaActual, manaMax, exp]):
        errors.append({
            'field':'healthPoint, healthPointMax, manaActual, manaMax, exp',
            'message':'Preencha todos os campos.'
        })
        if not re.match(atribute_pattern, healthPoint):
            errors.append({
                'field':'healthPoint',
                'message':'Preencha o campo de Vida.'
            })
        if not re.match(atribute_pattern, healthPointMax):
            errors.append({
                'field':'healthPointMax',
                'message':'Preencha o campo de Vida Máxima.'
            })
        if not re.match(atribute_pattern, manaActual):
            errors.append({
                'field':'manaActual',
                'message':'Preencha o campo de Mana.'
            })
        if not re.match(atribute_pattern, manaMax):
            errors.append({
                'field':'manaMax',
                'message':'Preencha o campo de Mana Máxima.'
            })
        if not re.match(atribute_pattern, exp):
            errors.append({
                'field':'exp',
                'message':'Preencha o campo de XP.'
            })
    if len(errors) > 0:
        return errors
    
    sheet_updated = Sheet(name = name, strength = strength, intelligence = intelligence, wisdom = wisdom, charisma = charisma, constitution = constitution, speed = speed, healthPointMax = healthPointMax, manaMax = manaMax, exp = exp, expTotal = exp, healthPoint = healthPointMax, mana = manaMax)
    # sheet_updated.save()
    # sheet_updated.updateXp()
    # sheet_updated.save()
    return sheet_updated


#Tratamento de erro na utils
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
def save_sheet(name, race, role, image, strength, intelligence, wisdom, charisma, constitution, speed, healthPointMax, manaMax, exp, user_id, description):
    errors=[]

    image_treated = re.match(r'^(?:https?|ftp):\/\/(?:www\.)?[a-zA-Z0-9-]+(?:\.[a-zA-Z]{2,})+(?:\/[^\s?]*)?(?:\?[^\s]*)?$', image)
    if image != '':
        if not image_treated:
            errors.append({
                'field': 'image',
                'message': 'Insira uma URL válida!'
            })
        elif len(str(image)) > 200:
            errors.append({
                    'field': 'image',
                    'message': 'A URL deve ter no maximo 200 caracteres!'
                })

    if str(name).count(' ') == len(name):
        errors.append({
            'field': 'name',
            'message' : 'Este campo não pode ser vazio!'
            })
    elif 2 > len(name) or len(name) > 50:
        errors.append({
            'field':'name',
            'message': 'Insira de 2 a 50 caracteres!'
            })
    if str(race).count(' ') == len(str(race)):
        errors.append({
            'field': 'race',
            'message' : 'Este campo não pode ser vazio!'
            })
    elif 2 > len(race) or len(race) > 22:
        errors.append({
            'field': 'race',
            'message': 'Insira de 2 a 22 caracteres!'
        })
    if str(role).count(' ') == len(str(role)):
        errors.append({
            'field': 'role',
            'message' : 'Este campo não pode ser vazio!'
            })
    if 2 > len(role) or len(role) > 22:
        errors.append({
            'field': 'role',
            'message': 'Insira de 2 a 22 caracteres!'
        })
        
    if str(strength).count(' ') == len(str(strength)) or str(intelligence).count(' ') == len(str(intelligence)) or str(wisdom).count(' ') == len(str(wisdom)) or str(charisma).count(' ') == len(str(charisma)) or str(constitution).count(' ') == len(str(constitution)) or str(speed).count(' ') == len(str(speed)):
        errors.append({
            'field': 'atributes1',
            'message' : 'Este(s) campo(s) não pode(m) ser vazio(s)!'
            })
        if str(strength).count(' ') == len(str(strength)):
            errors.append("strength")
        if str(intelligence).count(' ') == len(str(intelligence)):
            errors.append("intelligence")
        if str(charisma).count(' ') == len(str(charisma)):
            errors.append("charisma")
        if str(speed).count(' ') == len(str(speed)):
            errors.append("speed")
        if str(wisdom).count(' ') == len(str(wisdom)):
            errors.append("wisdom")
        if str(constitution).count(' ') == len(str(constitution)):
            errors.append("constitution")

    elif 20 < int(strength) or int(strength) < 1 or 20 < int(intelligence) or int(intelligence) < 1 or 20 < int(wisdom) or int(wisdom) < 1 or 20 < int(charisma) or int(charisma) < 1 or 20 < int(constitution) or int(constitution) < 1 or 20 < int(speed) or int(speed) < 1:
        errors.append({
            'field' : 'atributes1',
            'message' : 'Os atributos devem estar entre 1 e 20'
            })
        if 20 < int(strength) or int(strength) < 1:
            errors.append("strength")
        if 20 < int(intelligence) or int(intelligence) < 1:
            errors.append("intelligence")
        if 20 < int(wisdom) or int(wisdom) < 1 :
            errors.append("wisdom")
        if 20 < int(speed) or int(speed) < 1:
            errors.append("speed")
        if  20 < int(charisma) or int(charisma) < 1 :
            errors.append("charisma")
        if  20 < int(constitution) or int(constitution) < 1:
            errors.append("constitution")

    elif atribute_verifier(str(strength)) == 1 or atribute_verifier(str(intelligence)) == 1 or atribute_verifier(str(wisdom)) == 1 or atribute_verifier(str(charisma)) == 1 or atribute_verifier(str(constitution)) == 1 or atribute_verifier(str(speed)) == 1:
        errors.append({
            'field' : 'atributes1',
            'message' : 'Os atributos primarios devem ser numeros inteiros'
            })
        if atribute_verifier(str(strength)) == 1:
            errors.append("strength")
        if atribute_verifier(str(intelligence)) == 1:
            errors.append("intelligence")
        if atribute_verifier(str(wisdom)) == 1:
            errors.append("wisdom")
        if atribute_verifier(str(speed)) == 1:
            errors.append("speed")
        if  atribute_verifier(str(charisma)) == 1:
            errors.append("charisma")
        if  atribute_verifier(str(constitution)) == 1:
            errors.append("constitution")

    if str(healthPointMax).count(' ') == len(str(healthPointMax)) or str(exp).count(' ') == len(str(exp)) or str(manaMax).count(' ') == len(str(manaMax)):
        errors.append({
            'field': 'atributes2',
            'message' : 'Estes campos não podem ser vazios'
            })
        if str(healthPointMax).count(' ') == len(str(healthPointMax)):
            errors.append("healthPointMax")
        if str(manaMax).count(' ') == len(str(manaMax)):
            errors.append("manaMax")
        if str(exp).count(' ') == len(str(exp)):
            errors.append("exp")

    elif atribute_verifier(str(healthPointMax)) == 1 or atribute_verifier(str(manaMax)) == 1 or atribute_verifier(str(exp)) == 1:
        errors.append({
            'field' : 'atributes2',
            'message' : 'Os atributos secundarios devem ser numeros inteiros'
            })
        if atribute_verifier(str(healthPointMax)) == 1:
            errors.append("healthPointMax")
        if atribute_verifier(str(manaMax)) == 1:
            errors.append("manaMax")
        if atribute_verifier(str(exp)) == 1:
            errors.append("exp")

    elif int(healthPointMax) < 1 or int(manaMax) < 1 or int(healthPointMax) > 100000 or int(manaMax) > 100000:
        errors.append({
            'field' : 'atributes2',
            'message' : 'Vida e mana não podem ser menores que 1 ou maiores que 100 mil'
            })
        if int(healthPointMax) < 1 or int(healthPointMax) > 100000:
            errors.append("healthPointMax")
        if int(manaMax) < 1 or int(manaMax) > 100000:
            errors.append("manaMax")

    elif int(exp) < 0 or int(exp) > 105000000:
        errors.append({
            'field' : 'atributes2',
            'message' : 'A experiência não pode ser menor que 0 ou maior que 105M'
            })
        errors.append("exp")
        
    if len(errors) > 0:
        return errors
    #add imagem
    sheet = Sheet(name = name, race = race, role = role, image = image, strength = strength, intelligence = intelligence, wisdom = wisdom, charisma = charisma, constitution = constitution, speed = speed, healthPointMax = healthPointMax, manaMax = manaMax, exp = exp, expTotal = exp, healthPoint = healthPointMax, mana = manaMax, user_id = user_id, description = description)
    sheet.save()
    sheet.updateXp()
    sheet.save()
    return sheet