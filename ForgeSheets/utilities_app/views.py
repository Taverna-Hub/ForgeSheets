from django.shortcuts import render

def login(request):
  return render(request, 'login.html')

def cadastro(request):
  if request.method == 'POST':
    form = CadastroForm(request.POST)
    
