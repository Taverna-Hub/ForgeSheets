from django.shortcuts import redirect, render
from django.views import View
from campaigns_app.models import Campaign
from .utils import save_campaign
from django.contrib import messages


class CampaignView(View): 
  def get(self, request):
      ctx = {
         'app_name': 'campaign'
      }
      return render(request, 'campaigns_app/campaign.html', ctx)


class CreateCampaignView(View):
   def get(self, request):
      return render(request, 'campaigns_app/create_camp.html')

   def post(self, request):
      image = request.POST.get('image')
      title = request.POST.get('title')
      description = request.POST.get('description')
      user_id = request.user.id

      fields = save_campaign(image, title, description, user_id)

      if fields:
         ctx = {
            'error': {
               'message': {
                  'title': 'Este campo não pode ser vazio',
                  'description': 'Este campo não pode ser vazio',
                  'image': 'Insira uma URL válida',
               },
               'fields': fields
            }
         }
         return render(request, 'campaigns_app/create_camp.html', ctx)

      return redirect('campaigns:campaign')
   
#class UpdateCampaignView(View):
#class DeleteCampaignView(View):