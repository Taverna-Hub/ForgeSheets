from os import error, name
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

      fields = save_campaign(image, title, description, user_id)

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
         return render(request, 'campaigns_app/create_camp.html', ctx)

      return redirect('campaigns:campaigns')

class CampaignView(LoginRequiredMixin, View):
   def get(self, request, id):
      campaign = get_object_or_404(Campaign, id=id)
      #sheets = Sheet.objects.all()

      ctx = {
         'campaign': campaign,
         'app_name': 'campaign'
      }

      return render(request, 'campaigns_app/campaign.html', ctx)

#class UpdateCampaignView(LoginRequiredMixin, View):
#class DeleteCampaignView(LoginRequiredMixin, View):
      pass

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
            
      name = request.POST.get('name')
      strength_buff = request.POST.get('strength_buff')
      intelligence_buff = request.POST.get('intelligence_buff')
      wisdom_buff = request.POST.get('wisdom_buff')
      charisma_buff = request.POST.get('charisma_buff')
      constitution_buff = request.POST.get('constitution_buff')
      speed_buff = request.POST.get('speed_buff')

      # errors = treat_race(name, strength_buff, intelligence_buff, wisdom_buff, charisma_buff, constitution_buff, speed_buff)

      # if errors:
      #    atributos = ['strength_buff', 'intelligence_buff', 'wisdom_buff', 'charisma_buff', 'constitution_buff', 'speed_buff']
      #    ctx ={
      #       'errors': errors,
      #       'app_name': 'campaign_app'
      #    }
      #    if name not in errors:
      #       ctx['name'] = name
      #    for atributo in atributos:
      #       if atributo not in errors:
      #          valor = request.POST.get(atributo)
      #          ctx['atributo'] = valor
      #    return render(request, 'campaigns_app/races.html', ctx)
      # else:
      #    return redirect('campaigns:races')
      
      race = Race(name=name, strength_buff=int(strength_buff), intelligence_buff=int(intelligence_buff), wisdom_buff=int(wisdom_buff), charisma_buff=int(charisma_buff), constitution_buff=int(constitution_buff), speed_buff=int(speed_buff))
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
