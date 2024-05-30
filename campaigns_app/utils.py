from email import errors
from turtle import title
from .models import Campaign
from campaigns_app.models import Race
import re

def save_campaign(image, title, description, user_id, edit):
  image_treated = re.match(r"https?://\S+?\.(?:png|jpe?g|gif|bmp|tiff|webp|svg|ico)(?:\?\S*)?(?:#\S*)?(?=\s|$)", image)
  title_treated = title.strip()
  wrong_fields = []

  if image.strip():
    if not image_treated:
        wrong_fields.append({
          'field': 'image',
          'message': 'Insira uma URL válida'
        })
    elif len(str(image)) > 1000:
            wrong_fields.append({
                    'field': 'image',
                    'message': 'A URL deve ter no maximo 1000 caracteres'
                })
  
  if not title_treated:
    wrong_fields.append({
      'field': 'title',
      'message': 'Este campo não pode ser vazio'
    })
  elif len(title) > 70:
    wrong_fields.append({
      'field': 'title',
      'message': 'Este campo deve ter menos de 70 caracteres'
    })
  elif len(title) < 2:
    wrong_fields.append({
      'field': 'title',
      'message': 'Este campo deve ter mais de 2 caracteres'
    })
  if len(description) > 200:
    wrong_fields.append({
      'field': 'description',
      'message': 'Este campo deve ter menos de 1000 caracteres'
    })
  if len(wrong_fields) > 0:
    return wrong_fields

  if edit == 0:
    campaign = Campaign(image=image, title=title, description=description, user_id=user_id)
    campaign.save()
  else:
    campaign = Campaign.objects.filter(id=edit).first()

    campaign.title = title
    campaign.description = description
    campaign.image = image

    campaign.save()
    return 1

def treat_race(name, strength_buff, intelligence_buff, wisdom_buff, charisma_buff, constitution_buff, speed_buff, edit, campaign):
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
  
  if edit == 0:
    race = Race(name=name, strength_buff=strength_buff, intelligence_buff=intelligence_buff, wisdom_buff=wisdom_buff, charisma_buff=charisma_buff, constitution_buff=constitution_buff, speed_buff=speed_buff, campaign=campaign)
    race.save()
  else:
    race = Race.objects.filter(id=edit).first()

    race.name = name
    race.strength_buff=strength_buff
    race.intelligence_buff=intelligence_buff
    race.wisdom_buff=wisdom_buff
    race.charisma_buff=charisma_buff
    race.constitution_buff=constitution_buff
    race.speed_buff=speed_buff
    

    race.save()
    return 1