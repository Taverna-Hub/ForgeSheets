from django.shortcuts import redirect, render
from django.views import View
from campaigns_app.models import Campaign
from .utils import save_campaign
from django.contrib import messages
from django.contrib.auth.mixins import LoginRequiredMixin
from django.utils.html import escape

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
      image = escape(request.POST.get('image'))
      title = escape(request.POST.get('title'))
      description = escape(request.POST.get('description'))
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

      return redirect('campaigns:campaign')

#class UpdateCampaignView(LoginRequiredMixin, View):
#class DeleteCampaignView(LoginRequiredMixin, View):