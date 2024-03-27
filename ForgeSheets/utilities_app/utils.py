from django.contrib.auth.models import User
from django.contrib.auth import authenticate, logout
from django.contrib.auth import login as login_django

def register(username, email, password):
    user = User.objects.filter(username=username).first()
    mail = User.objects.filter(email=email).first()

    if user:
        return 0
    if mail:
        return 2
    
    user = User.objects.create_user(username=username, email=email, password=password)
    user.save()

    return 1

def login(request, username, password):
    user = authenticate(username=username, password=password)

    if user:
        login_django(request, user)
        return 1

    return 0
