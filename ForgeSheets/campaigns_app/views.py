from django.shortcuts import render
from django.views import View


class CampaignView(View): 
  def get(self, request):
      ctx = {
         'app_name': 'campaign'
      }
      return render(request, 'campaigns_app/campaign.html', ctx)