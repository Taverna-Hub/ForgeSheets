import uuid
from django.db import models
from django.core.validators import MinValueValidator
import shortuuid
from utilities_app.models import Users

#adicionar código de compartilhamento depois
class Campaign(models.Model):
    id = models.UUIDField(default=uuid.uuid4, primary_key=True)
    code = models.CharField(max_length=8, default=shortuuid.ShortUUID().random(length=8), unique=True, editable=False)
    image = models.URLField(null=True)
    title = models.CharField(max_length=75)
    description = models.TextField(default='', null=True)
    user = models.ForeignKey(Users, on_delete=models.CASCADE)

class Race(models.Model):
    name = models.CharField(max_length=75)
    strength_buff = models.IntegerField(validators=[MinValueValidator(0)])
    intelligence_buff = models.IntegerField(validators=[MinValueValidator(0)])
    wisdom_buff = models.IntegerField(validators=[MinValueValidator(0)])
    charisma_buff = models.IntegerField(validators=[MinValueValidator(0)])
    constitution_buff = models.IntegerField(validators=[MinValueValidator(0)])
    speed_buff = models.IntegerField(validators=[MinValueValidator(0)])
    campaign = models.ForeignKey(Campaign, related_name='races', on_delete=models.CASCADE, null=True)
    is_used = models.IntegerField(default=0)

    def __str__(self) -> str:
        return self.name
    
class Class(models.Model):
    id = models.UUIDField(default=uuid.uuid4, primary_key=True)
    name = models.CharField(max_length=75)
    roles = models.CharField(max_length=200, default=None, null=True, blank=True)
    campaign = models.ForeignKey(Campaign, on_delete=models.CASCADE, null=True)
    is_used = models.IntegerField(default=0)