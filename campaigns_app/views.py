from os import name
from django.shortcuts import redirect, render, get_object_or_404
from django.views import View
from campaigns_app.models import Campaign, Race
from .utils import save_campaign, save_race
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
      campaign = Campaign.objects.filter(id=id).first()
      #sheets = Sheet.objects.all()

      ctx = {
         'campaign': campaign,
         #'sheets': sheets,
      }

      return render(request, 'campaigns_app/campaign.html', ctx)

#class UpdateCampaignView(LoginRequiredMixin, View):
#class DeleteCampaignView(LoginRequiredMixin, View):
      pass

class ManageRaceOnCampaignView(LoginRequiredMixin, View):
   def get(self, request, id):

      campaign = get_object_or_404(Campaign, id=id)
      ctx = {
         'campaign': campaign.id
         
      }
      return render(request, 'campaigns_app/races.html', ctx)
   
   def post(self, request, id):
            
      name = request.POST.get('name')
      strength_buff = request.POST.get('strength_buff')
      intelligence_buff = request.POST.get('intelligence_buff')
      wisdom_buff = request.POST.get('wisdom_buff')
      charisma_buff = request.POST.get('charisma_buff')
      constitution_buff = request.POST.get('constitution_buff')
      speed_buff = request.POST.get('speed_buff')

      fields = save_race(name, strength_buff, intelligence_buff, wisdom_buff, charisma_buff, constitution_buff, speed_buff)
