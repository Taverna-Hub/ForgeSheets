import uuid
from django.db import models

from utilities_app.models import Users

#adicionar código de compartilhamento depois
class Campaign(models.Model):
    id = models.UUIDField(default=uuid.uuid4, primary_key=True)
    image = models.URLField(null=True)
    title = models.CharField(max_length=75)
    description = models.TextField(default='', null=True)

    user = models.ForeignKey(Users, on_delete=models.CASCADE)