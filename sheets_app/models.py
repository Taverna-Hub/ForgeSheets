import uuid
from django.db import models
from campaigns_app.models import Campaign
from utilities_app.models import Users
from django.core.validators import MinValueValidator
from django.db.models import Sum



class Sheet(models.Model):
    id = models.UUIDField(default=uuid.uuid4, primary_key=True)
    
    name = models.CharField(max_length=75)
    image = models.URLField(null=True)

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
    expTotal = models.IntegerField(validators=[MinValueValidator(0)], null=True)
    expMax = models.IntegerField(validators=[MinValueValidator(1)], default=100)
    notes = models.TextField(default='')
    description = models.TextField(default='NULL')

    user = models.ForeignKey(Users, on_delete=models.CASCADE)
    campaign = models.ForeignKey(Campaign, null=True, blank=True, on_delete=models.CASCADE)

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
        if self.expTotal == None:
            self.expTotal = int(self.exp)
        exp = int(self.expTotal)
        expMax = 100
        level = 0
        while exp >= expMax:
            exp -= expMax
            level += 1
            expMax *= 2
        return level
    

class Equipment(models.Model):
    id = models.UUIDField(default=uuid.uuid4, primary_key=True)

    name = models.CharField(max_length=55)
    quantity = models.IntegerField(validators=[MinValueValidator(1)])
    attack = models.IntegerField(default=0, validators=[MinValueValidator(0)])
    defense = models.IntegerField(default=0, validators=[MinValueValidator(0)])
    sheet = models.ForeignKey(Sheet, on_delete=models.CASCADE)

    def __str__(self) -> str:
        return f'{self.name} {self.attack} | {self.defense}'

class Magic(models.Model):
    id = models.UUIDField(default=uuid.uuid4, primary_key=True)

    name = models.CharField(max_length=70)
    description = models.CharField(max_length=200)
    damage = models.CharField(max_length=50, default='')
    atribute_modifier = models.CharField(max_length=15)
    element = models.CharField(max_length=15)
    sheet = models.ForeignKey(Sheet, on_delete=models.CASCADE)

    def __str__(self) -> str:
        return f'{self.name} {self.description} | {self.element}'
    
