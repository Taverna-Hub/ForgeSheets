from email import errors
from .models import Campaign
from campaigns_app.models import Race
import re

def save_campaign(image, title, description, user_id):
  image_treated = re.match(r'^(?:https?|ftp):\/\/(?:www\.)?[a-zA-Z0-9-]+(?:\.[a-zA-Z]{2,})+(?:\/[^\s?]*)?(?:\?[^\s]*)?$', image)
  title_treated = title.strip()
  wrong_fields = []

  if image.strip():
    if not image_treated:
        wrong_fields.append({
          'field': 'image',
          'message': 'Insira uma URL válida'
        })
    elif len(str(image)) > 200:
            wrong_fields.append({
                    'field': 'image',
                    'message': 'A URL deve ter no maximo 200 caracteres!'
                })
  
  if not title_treated:
    wrong_fields.append({
      'field': 'title',
      'message': 'Este campo não pode ser vazio'
    })
  elif len(title) > 70:
    wrong_fields.append({
      'field': 'title',
      'message': 'Este campo deve ter menos de 70 caractéres'
    })
  elif len(title) < 2:
    wrong_fields.append({
      'field': 'title',
      'message': 'Este campo deve ter mais de 2 caractéres'
    })
  if len(description) > 200:
    wrong_fields.append({
      'field': 'description',
      'message': 'Este campo deve ter menos de 200 caractéres'
    })
  if len(wrong_fields) > 0:
    return wrong_fields

  campaign = Campaign(image=image, title=title, description=description, user_id=user_id)
  campaign.save()
  
def treat_race(name, strength_buff, intelligence_buff, wisdom_buff, charisma_buff, constitution_buff, speed_buff):
  buffs = [int(strength_buff), int(intelligence_buff), int(wisdom_buff), int(charisma_buff), int(constitution_buff), int(speed_buff)]
  name_treated = name.strip()
  errors = []

  for buff in buffs:
    buff_str = str(buff)
    if not re.match(r'^[+-]?\d+$', buff_str):
       errors.append({
          'field':'buff',
          'message': 'Insira números ou caracteres de + ou -'
       })
  
  if name_treated:
    if len(name_treated) > 75:
        errors.append({
           'field':'name',
           'message':'Insira no máximo 75 caracteres'
        })
    elif str(name_treated).count(' ') == len(name_treated):
       errors.append({
          'field':'name',
          'message':'Insira o nome da Raça'
       })

  if len(errors) > 0:
    return errors 

  race = Race(name_treated=name, strength_buff=strength_buff, intelligence_buff=intelligence_buff, wisdom_buff=wisdom_buff, charisma_buff=charisma_buff, constitution_buff=constitution_buff, speed_buff=speed_buff)
  race.save()
