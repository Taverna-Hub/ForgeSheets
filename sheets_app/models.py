from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MinValueValidator
from django.db.models import Sum

class Race(models.Model):
    name = models.CharField(max_length=75)
    strength_buff = models.IntegerField(validators=[MinValueValidator(0)])
    intelligence_buff = models.IntegerField(validators=[MinValueValidator(0)])
    wisdom_buff = models.IntegerField(validators=[MinValueValidator(0)])
    charisma_buff = models.IntegerField(validators=[MinValueValidator(0)])
    constitution_buff = models.IntegerField(validators=[MinValueValidator(0)])
    speed_buff = models.IntegerField(validators=[MinValueValidator(0)])
    
    def __str__(self) -> str:
        return self.name

class Sheet(models.Model):
    name = models.CharField(max_length=75)
    image = models.URLField(max_length=250 ,null=True)

    # race = models.ForeignKey(Race, on_delete=models.SET_NULL, null=True)
    race = models.CharField(max_length=75)
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
    expMax = models.IntegerField(validators=[MinValueValidator(1)], default=100)

    notes = models.TextField(default='')
    description = models.TextField(default='NULL')

    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self) -> str:
        return self.name

    def totalAtkDef(self):
        total = {
            'atk': Equipment.objects.filter(sheet=self).aggregate(total_atk=Sum('attack'))['total_atk'] or 0,
            'def': Equipment.objects.filter(sheet=self).aggregate(total_def=Sum('defense'))['total_def'] or 0
        }
        return total
    
    def updateXp(self):
        exp = int(self.exp)
        expMax = int(self.expMax)

        while exp >= expMax:
            exp = exp - expMax
            expMax = expMax*2

        self.exp = int(exp)
        self.expMax = int(expMax)

    def level(self):
        exp = self.exp
        expMax = self.expMax
        level = 0
        while exp >= expMax:
            exp -= expMax
            level += 1
            expMax *= 2
        return level

class Equipment(models.Model):
    name = models.CharField(max_length=55)
    quantity = models.IntegerField(validators=[MinValueValidator(1)])
    attack = models.IntegerField(default=0, validators=[MinValueValidator(0)])
    defense = models.IntegerField(default=0, validators=[MinValueValidator(0)])
    sheet = models.ForeignKey(Sheet, on_delete=models.CASCADE)

    def __str__(self) -> str:
        return f'{self.name} {self.attack} | {self.defense}'
