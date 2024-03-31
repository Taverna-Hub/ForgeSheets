from django.db import models
from django.core.validators import MinValueValidator

class Race(models.Model):
    name = models.CharField(max_length=75)
    strength_buff = models.IntegerField(validators=[MinValueValidator(1)])
    intelligence_buff = models.IntegerField(validators=[MinValueValidator(1)])
    wisdom_buff = models.IntegerField(validators=[MinValueValidator(1)])
    charisma_buff = models.IntegerField(validators=[MinValueValidator(1)])
    constitution_buff = models.IntegerField(validators=[MinValueValidator(1)])
    speed_buff = models.IntegerField(validators=[MinValueValidator(1)])

class Sheet(models.Model):
    name = models.CharField(max_length=75)
    image = models.URLField()
    race = models.ForeignKey(Race, on_delete=models.SET_NULL, null=True)
    role = models.CharField(max_length=75)

    strength = models.IntegerField(validators=[MinValueValidator(1)])
    intelligence = models.IntegerField(validators=[MinValueValidator(1)])
    wisdom = models.IntegerField(validators=[MinValueValidator(1)])
    charisma = models.IntegerField(validators=[MinValueValidator(1)])
    constitution = models.IntegerField(validators=[MinValueValidator(1)])
    speed = models.IntegerField(validators=[MinValueValidator(1)])

    healthPoint =  models.IntegerField(validators=[MinValueValidator(0)])
    healthPointMax = models.IntegerField(validators=[MinValueValidator(1)])
    mana = models.IntegerField(validators=[MinValueValidator(0)])
    manaMax = models.IntegerField(validators=[MinValueValidator(1)])
    exp = models.IntegerField(validators=[MinValueValidator(0)])
    expMax = models.IntegerField(validators=[MinValueValidator(1)])

    notes = models.TextField(default='')
    description = models.TextField(default='')

class Equipment(models.Model):
    name = models.CharField(max_length=55)
    quantity = models.IntegerField(validators=[MinValueValidator(1)])
    attack = models.IntegerField(default=0, validators=[MinValueValidator(0)])
    defense = models.IntegerField(default=0, validators=[MinValueValidator(0)])
    sheet = models.ForeignKey(Sheet, on_delete=models.CASCADE)
