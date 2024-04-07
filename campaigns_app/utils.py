from django.utils.html import escape
from .models import Campaign
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

  campaign = Campaign(image=image, title=escape(title), description=escape(description), user_id=user_id)
  campaign.save()
  


