from django.views import View
from django.http import HttpResponse
from django.contrib.auth.models import User
from django.shortcuts import render, redirect
from django.contrib import messages
from .utils import register, login
from django.contrib.auth import logout
from django.urls import reverse
from sheets_app.models import Sheet
from sheets_app.views import SheetsView

class SignView(View):
    def get(self, request):
        return render(request, 'utilities_app/sign.html')
    
    def post(self, request):

        if 'logout' in request.POST:
            logout(request)
            return redirect('utilities:sign')

        password = request.POST.get('password')
        email = request.POST.get('email')

        if 'login' in request.POST: 
            username = request.POST.get('userL')
            login_result = login(request, username, password)
            if login_result == 1:
                return redirect('sheets:homesheets')
            elif login_result == 0:
                messages.error(request, 'Usuário ou senha inválidos')
                return redirect('utilities:sign')
            elif login_result == 2:
                ctx = {'usernameL': username}
                messages.error(request, 'Preencha todos os campos')
                return render(request, 'utilities_app/sign.html', ctx)

        elif 'register' in request.POST:
            username = request.POST.get('userR')
            register_result = register(username, email, password)
            if register_result == 1:
                messages.success(request, 'Usuário cadastrado com sucesso')
                return redirect('utilities:sign')
            elif register_result == 0:
                messages.error(request, 'Usuário inválido')
                ctx = {'email': email, 'register': 1}
                return render(request, 'utilities_app/sign.html', ctx)
            elif register_result == 2:
                messages.error(request, 'E-mail inválido')
                ctx = {'usernameR': username, 'register': 1}
                return render(request, 'utilities_app/sign.html', ctx)
            elif register_result == 3:
                messages.error(request, 'Preencha todos os campos')
                ctx = {'usernameR': username, 'email': email, 'register': 1}
                return render(request, 'utilities_app/sign.html', ctx)
            elif register_result == 4:
                messages.error(request, 'E-mail já cadastrado')
                ctx = {'usernameR': username, 'register': 1}
                return render(request, 'utilities_app/sign.html', ctx)
            elif register_result == 5:
                messages.error(request, 'Usuário já cadastrado')
                ctx = {'email': email, 'register': 1}
                return render(request, 'utilities_app/sign.html', ctx)