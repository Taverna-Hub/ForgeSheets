from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.contrib.auth.models import User


def login(request):
  return render(request, 'login.html')

def cadastro(request):
    if request.method == "POST":
        username = request.POST.get('username')
        email = request.POST.get('email')
        password = request.POST.get('password')

        user = User.objects.filter(username=username).first()

        if user:
            return HttpResponse('Usuário já existente!')
        
        user = User.objects.create_user(username=username, email=email, password=password)
        user.save
        cadastrado = True
        return redirect('home')
    else:
        return render(request, 'cadastro.html')