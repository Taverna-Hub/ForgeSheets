from django.shortcuts import redirect, render
from django.views import View
from campaigns_app.models import Campaign
from .utils import save_campaign
from django.contrib import messages
from django.contrib.auth.mixins import LoginRequiredMixin


class CampaignView(LoginRequiredMixin, View): 
  def get(self, request):
      campaigns = Campaign.objects.filter(user_id=request.user.id)
      ctx = {
         'campaigns': campaigns,
         'app_name': 'campaign'
      }
      return render(request, 'campaigns_app/campaign.html', ctx)


class CreateCampaignView(LoginRequiredMixin, View):
   def get(self, request):
      ctx = {
         'app_name': 'campaign'
      }
      return render(request, 'campaigns_app/create_camp.html', ctx)

   def post(self, request):
      image = request.POST.get('image')
      title = request.POST.get('title')
      description = request.POST.get('description')
      user_id = request.user.id

      fields = save_campaign(image, title, description, user_id)

      if fields:
         ctx = {
            'errors': fields,
            'app_name': 'campaign'
         }

         return render(request, 'campaigns_app/create_camp.html', ctx)

      return redirect('campaigns:campaign')

#class UpdateCampaignView(LoginRequiredMixin, View):
#class DeleteCampaignView(LoginRequiredMixin, View):