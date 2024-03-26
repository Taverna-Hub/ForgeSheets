from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, logout
from django.contrib.auth import login as login_django
# from django.contrib.auth.decorations import login_required


#precisa mudar o nome das html
# def home(request):
# 	if request.user.is_autenticated:
# 		name = request.user.username
# 		return render (request, 'login.hmtl', {'singed_in': True, 'user':name}) 
# 	else:
# 		return render (request, 'login.html')
	
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

def login(request):
  	#return render(request, 'login.html')

	if request.method == 'GET':
			return render(request, 'login.html')

	elif request.method == 'POST':

		username = request.POST.get('username')
		password = request.POST.get('password')
		
		user = authenticate(username=username, password=password)

		if user:
			login_django(request, user)
			#return redirect('login') #redirecionar para a pagina de fichas
			return HttpResponse('It runs 👍')
		else:
			return HttpResponse('Usuário ou senha inválidos')