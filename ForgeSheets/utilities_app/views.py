from django.views import View
from django.http import HttpResponse
from django.contrib.auth.models import User
from django.shortcuts import render, redirect
from django.contrib import messages
from .utils import register, login
from django.urls import reverse
from sheets_app.models import Sheet

class SignView(View):
    def get(self, request):
        return render(request, 'utilitites_app/sign.html')
    
    def post(self, request):
        password = request.POST.get('password')
        email = request.POST.get('email')

        if 'login' in request.POST: 
            username = request.POST.get('userL')
            login_result = login(request, username, password)
            if login_result == 1:
                messages.success(request, 'Logado com sucesso!')
                return HttpResponse('Logado com sucesso!')
            elif login_result == 0:
                messages.error(request, 'Usuário ou senha inválidos')
                return redirect('utilities:sign')
            elif login_result == 2:
                ctx = {'usernameL': username}
                messages.error(request, 'Preencha todos os campos')
                return render(request, 'utilitites_app/sign.html', ctx)

        elif 'register' in request.POST:
            username = request.POST.get('userR')
            register_result = register(username, email, password)
            if register_result == 1:
                messages.success(request, 'Usuário cadastrado com sucesso')
                return redirect('utilities:sign')
            elif register_result == 0:
                messages.error(request, 'Usuário inválido')
                ctx = {'email': email, 'cadastro': 1}
                return render(request, 'utilitites_app/sign.html', ctx)
            elif register_result == 2:
                messages.error(request, 'E-mail inválido')
                ctx = {'usernameR': username, 'cadastro': 1}
                return render(request, 'utilitites_app/sign.html', ctx)
            elif register_result == 3:
                messages.error(request, 'Preencha todos os campos')
                ctx = {'usernameR': username, 'email': email, 'cadastro': 1}
                return render(request, 'utilitites_app/sign.html', ctx)