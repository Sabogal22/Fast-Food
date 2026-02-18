from rest_framework import serializers
from .models import User

class UserSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    fields = ("id", "username", "email", "role")

class EmployeeSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    fields = ("id", "username", "email", "role", "first_name", "last_name", "is_active", "salary", "last_login")