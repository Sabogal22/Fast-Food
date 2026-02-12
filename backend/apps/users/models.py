from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
  ROLE_CHOICES = [
    ("admin", "Admin"),
    ("mesero", "Mesero"),
    ("cocina", "Cocina"),
    ("cajero", "Cajero"),
    ("domiciliario", "Domiciliario"),
  ]

  role = models.CharField(max_length=20, choices=ROLE_CHOICES, default="mesero")
