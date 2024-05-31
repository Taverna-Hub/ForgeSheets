from .models import Campaign
from campaigns_app.models import Race, Class
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
    
    name_treated = name.strip()
    errors = []


    if not name_treated:
        errors.append({
            'field': 'name',
            'message': 'Insira o nome da raça'
        })
    elif len(name_treated) > 75:
        errors.append({
            'field': 'name',
            'message': 'Insira no máximo 75 caracteres'
        })
    else:
      existing_race = Race.objects.filter(name=name_treated, campaign=campaign).exclude(id=edit).first()
      if existing_race:
        errors.append({
          'field': 'name',
          'message': 'Uma raça com esse nome já existe'
        })

    if len(errors) > 0:
        return errors
    
    if edit == 0:
        race = Race(
            name=name,
            strength_buff=int(strength_buff),
            intelligence_buff=int(intelligence_buff),
            wisdom_buff=int(wisdom_buff),
            charisma_buff=int(charisma_buff),
            constitution_buff=int(constitution_buff),
            speed_buff=int(speed_buff),
            campaign=campaign
        )
        race.save()
    else:
        race = Race.objects.filter(id=edit).first()
        race.name = name
        race.strength_buff = int(strength_buff)
        race.intelligence_buff = int(intelligence_buff)
        race.wisdom_buff = int(wisdom_buff)
        race.charisma_buff = int(charisma_buff)
        race.constitution_buff = int(constitution_buff)
        race.speed_buff = int(speed_buff)
        race.save()
    
    return None

def treat_class(name, campaign):
  errors=[]
  
  name_treated = name.strip()
  existing_class = Class.objects.filter(name=name, campaign=campaign)

  if not name_treated:
    errors.append({
            'field': 'name',
            'message': 'O nome não pode ser vazio'
        })
    return errors
  elif existing_class:
    errors.append({
            'field': 'name',
            'message': 'Esta nome ja existe nessa campanha',
                  })
    return errors
  return 0