from django.shortcuts import render
from django.views import View
from django.http import HttpResponse

class Sheets(View):

    def get(self, request):
        return render(request, 'a.html')
    
    def post(self, request):
        pass
