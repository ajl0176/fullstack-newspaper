from django.db import models
from django.contrib.auth.models import User
from django.conf import settings



class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    avatar = models.ImageField(upload_to="profiles/", blank=True, null=True)

    def __str__(self):
        return self.user.username
