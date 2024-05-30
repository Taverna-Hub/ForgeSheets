from email.mime import image
from hmac import new
from os import error, name
from django.http import HttpResponse
from django.shortcuts import get_list_or_404, redirect, render, get_object_or_404
from django.urls import reverse
from django.views import View
from campaigns_app.models import Campaign, Class, Race
from .utils import save_campaign, treat_race
from django.contrib import messages
from django.contrib.auth.mixins import LoginRequiredMixin
from sheets_app.models import Sheet

class CampaignsView(LoginRequiredMixin, View): 
  def get(self, request):
      campaigns = Campaign.objects.filter(user_id=request.user.id)
      ctx = {
         'campaigns': campaigns,
         'app_name': 'campaign'
      }
      return render(request, 'campaigns_app/campaigns.html', ctx)

class CreateCampaignView(LoginRequiredMixin, View):
   def get(self, request):
      ctx = {
         'app_name': 'campaign'
      }
      return render(request, 'campaigns_app/create_campaign.html', ctx)

   def post(self, request):
      image = request.POST.get('image')
      title = request.POST.get('title')
      description = request.POST.get('description')
      user_id = request.user.id

      fields = save_campaign(image, title, description, user_id, 0)

      ctx = {
      'image': image,
      'title': title,
      'description': description,
   }

      if fields:
         ctx['errors'] = fields
         ctx['app_name'] = 'campaign'
         for field_error in fields:
               ctx.pop(field_error['field'], None)
         return render(request, 'campaigns_app/create_campaign.html', ctx)

      return redirect('campaigns:campaigns')

class CampaignView(LoginRequiredMixin, View):
   def get(self, request, id):
      campaign = get_object_or_404(Campaign, id=id)
      sheets = Sheet.objects.filter(campaign_id=campaign.id)

      for sheet in sheets:
         sheet.hp = int((sheet.healthPoint / sheet.healthPointMax) * 100)
         sheet.mana = int((sheet.mana / sheet.manaMax) * 100)

      ctx = {
         'campaign': campaign,
         'sheets': sheets,
         'app_name': 'campaign'
      }

      return render(request, 'campaigns_app/campaign.html', ctx)

   def post(self, request, id):
      campaign = get_object_or_404(Campaign, id=id)
      user_id = request.user.id

      ctx = {
         'campaign': campaign,
         'app_name': 'campaign'
      }
      
      newTitle = request.POST.get('new-title')
      newDescription = request.POST.get('new-description')
      newImage = request.POST.get('new-image')

      if 'delete' in request.POST:
            campaign.delete()
            return redirect('campaigns:campaigns')

      if not newTitle:
         newTitle = campaign.title
      if not newDescription:
         newDescription = campaign.description
      if not newImage:
         newImage = campaign.image

      fields = save_campaign(newImage, newTitle, newDescription, user_id, campaign.id)
      print(fields)
      if fields == 1:
         return redirect('campaigns:view_campaign', id=id)
      else:
         if fields[0]['field'] == 'title':
            ctx['titleError'] = 1
            messages.error(request, fields[0]['message'])
            return render(request, 'campaigns_app/campaign.html', ctx)
         if fields[0]['field'] == 'description':
            ctx['descriptionError'] = 1
            messages.error(request, fields[0]['message'])
            return render(request, 'campaigns_app/campaign.html', ctx)
         if fields[0]['field'] == 'image':
            ctx['imageError'] = 1
            messages.error(request, fields[0]['message'])
            return render(request, 'campaigns_app/campaign.html', ctx)

class RaceView(LoginRequiredMixin, View):
   def get(self, request, id):
      campaign = get_object_or_404(Campaign, id=id)
      races = Race.objects.filter(campaign=campaign)

      ctx = {
         'campaign': campaign,
         'races': races,
         'app_name': 'campaign'
      }
      return render(request, "campaigns_app/racelist.html",ctx)
   
   def post(self, request, id):
      if 'edit_race_id' in request.POST:
         race_id = request.POST.get('edit_race_id')
         race = get_object_or_404(Race, id=race_id)

         race.name = request.POST.get('name')
         race.strength_buff = int(request.POST.get('strength_buff'))
         race.intelligence_buff = int(request.POST.get('intelligence_buff'))
         race.wisdom_buff = int(request.POST.get('wisdom_buff'))
         race.charisma_buff = int(request.POST.get('charisma_buff'))
         race.constitution_buff = int(request.POST.get('constitution_buff'))
         race.speed_buff = int(request.POST.get('speed_buff'))
         race.save()

         return redirect(reverse('campaigns:races', kwargs={'id': id}))
            
      if 'delete_race_id' in request.POST:
         race = get_object_or_404(Race, id=id)
         race.delete()

         return redirect(reverse('campaigns:races', kwargs={'id':id}))

      name = request.POST.get('name')
      strength_buff = request.POST.get('strength_buff')
      intelligence_buff = request.POST.get('intelligence_buff')
      wisdom_buff = request.POST.get('wisdom_buff')
      charisma_buff = request.POST.get('charisma_buff')
      constitution_buff = request.POST.get('constitution_buff')
      speed_buff = request.POST.get('speed_buff')

      race = Race(name=name, strength_buff=int(strength_buff), intelligence_buff=int(intelligence_buff), wisdom_buff=int(wisdom_buff), charisma_buff=int(charisma_buff), constitution_buff=int(constitution_buff), speed_buff=int(speed_buff), campaign_id=id)
      race.save()
      return redirect(reverse('campaigns:races', kwargs={'id': id}))
   
class ClassListView(LoginRequiredMixin, View):
   def get(self, request, id):
      campaign = get_object_or_404(Campaign, id=id)
      classes = Class.objects.filter(campaign=campaign)
      campaign_sheets = Sheet.objects.filter(campaign=campaign)

      ctx = {
         'campaign': campaign,
         'classes': classes,
         'app_name': 'campaign'
      }
   
      return render(request, "campaigns_app/class-list.html",ctx)
   
   def post(self, request, id):
      name = request.POST.get("className")
      roles = request.POST.getlist("role")

      newClass = Class(name=name, roles=roles, campaign_id=id)
      newClass.save()

      return redirect(reverse('campaigns:campaign_classes', kwargs={'id': id}))
