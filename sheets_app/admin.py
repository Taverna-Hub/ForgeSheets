from django.contrib import admin
from .models import Sheet, Equipment
from campaigns_app.models import Race

admin.site.register(Sheet)
admin.site.register(Equipment)
admin.site.register(Race)

