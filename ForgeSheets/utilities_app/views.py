from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, logout
from django.contrib.auth import login as login_django
from django.contrib.auth.decorators import login_required

def sign(request):
    if request.method == "POST":
        if 'login' in request.POST: 
            return login(request, request.POST.get('user'), request.POST.get('password'))
        elif 'cadastro' in request.POST:
            return HttpResponse('cadastro')
    else:
        return render(request, 'sign.html')


def cadastro(request):
    if request.method == "POST":
        username = request.POST.get('username')
        email = request.POST.get('email')
        password = request.POST.get('password')

        user = User.objects.filter(username=username).first()

        if user:
            return HttpResponse('Já existe um usuário com esse username')
        
        user = User.objects.create_user(username=username, email=email, password=password)
        user.save
        cadastrado = True
        return redirect('home')
    else:
        return render(request, 'cadastro.html')

def login(request, username, password):
    print(username, password)
    user = authenticate(username=username, password=password)
    if user:
        login_django(request, user)
        return HttpResponse('It runs 👍')
    else:
        return HttpResponse('Usuário ou senha inválidos')