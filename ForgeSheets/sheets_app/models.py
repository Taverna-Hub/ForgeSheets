from django.db import models
from django.core.validators import MinValueValidator
class Sheet:
    pass
class Equipment(models.Model):
    name = models.CharField(max_length=55)
    quantity = models.IntegerField(validators=[MinValueValidator(1)])
    attack = models.IntegerField(default=0, validators=[MinValueValidator(0)])
    defense = models.IntegerField(default=0, validators=[MinValueValidator(0)])
    sheet = models.ForeignKey(Sheet, on_delete=models.CASCADE)
