from django.utils.html import escape
from .models import Campaign
import re


def save_campaign(image, title, description, user_id):
  image_treated = re.match(r'\bhttps?://\S+?.(?:png|jpe?g|)\b', image)
  
  title_treated = title.strip()
  description_treated = description.strip()
  wrong_fields = []

  if not image_treated:
    wrong_fields.append('image')
  
  if not title_treated:
    wrong_fields.append('title')

  if not description_treated:
    wrong_fields.append('description')

  if len(wrong_fields) > 0:
    return wrong_fields

  campaign = Campaign(image=image, title=escape(title), description=escape(description), user_id=user_id)
  campaign.save()
  


