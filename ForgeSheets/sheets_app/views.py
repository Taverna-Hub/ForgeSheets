from django.shortcuts import render
from django.views import View
from django.http import HttpResponse

class Sheets(View):

    def get(self, request):
        return render(request, 'sheets.html')
    
    def post(self, request):
        pass

class CreateSheet(View):
    def get(self, request):
        return render(request, 'createsheets.html')