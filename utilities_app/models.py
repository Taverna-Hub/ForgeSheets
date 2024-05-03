import uuid
from django.db import models
from django.contrib.auth.models import AbstractUser

class Users(AbstractUser):
  id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
  