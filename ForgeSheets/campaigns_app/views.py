from django.shortcuts import render
from django.views import View
from campaigns_app.models import Campaign
#from django.contrib.auth.models import User


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

      campaign = Campaign(image=image, title=title, description=description, user_id=user_id )
      campaign.save()

#class UpdateCampaignView(View):
#class DeleteCampaignView(View):