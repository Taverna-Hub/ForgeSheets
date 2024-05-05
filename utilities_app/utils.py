from django.contrib.auth import authenticate
from django.contrib.auth import login as login_django
import re

from .models import Users

def register(username, email, password):
    if len(username) < 1 or len(password) < 1 or len(email) < 1:
        return 3

    if username.count(' ') == len(username) or email.count(' ') == len(email) or password.count(' ') == len(password):
        return 3
    
    if not re.fullmatch(re.compile(r'([A-Za-z0-9]+[.-_])*[A-Za-z0-9]+@[A-Za-z0-9-]+(\.[A-Z|a-z]{2,})+'), email):
        return 2
    
    if len(username) > 30 or len(username) < 1:
        return 0
    else:
        if not re.match("^[a-zA-Z0-9]+$", username):
            return 0

    mail = Users.objects.filter(email=email).first()
    if mail:
        return 4

    user = Users.objects.filter(username=username).first()
    if user:
        return 5

    user = Users.objects.create_user(username=username, email=email, password=password)
    user.save()

    return 1

def login(request, username, password):
    user = authenticate(username=username, password=password)

    if len(username) < 1 or len(password) < 1:
        return 2

    if user:
        login_django(request, user)
        return 1

    return 0
