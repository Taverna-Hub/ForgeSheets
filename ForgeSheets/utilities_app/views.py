from django.views import View
from django.http import HttpResponse
from django.contrib.auth.models import User
from django.shortcuts import render, redirect

from .utils import register, login

class SignView(View):
    def get(self, request):
        return render(request, 'utilitites_app/sign.html')
    
    def post(self, request):
        username = request.POST.get('user')
        password = request.POST.get('password')
        email = request.POST.get('email')

        if 'login' in request.POST: 
            login_result = login(request, username, password)
            if login_result == 1:
                return HttpResponse('Logado com sucesso!')
            elif login_result == 0:
                return HttpResponse('Usuário ou senha inválidos!')

        elif 'register' in request.POST:
            register_result = register(username, email, password)
            if register_result == 1:
                return HttpResponse('Cadastrado com sucesso!')
            elif register_result == 0:
                return HttpResponse('Usuário já cadastrado!')
            elif register_result == 2:
                return HttpResponse('E-mail já cadastrado!')
