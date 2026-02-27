from rest_framework import serializers
from .models import Product, Category, Ingredient

class CategorySerializer(serializers.ModelSerializer):
  class Meta:
    model = Category
    fields = "__all__"

class ProductSerializer(serializers.ModelSerializer):
  category_name = serializers.ReadOnlyField(source="category.name")

  class Meta:
    model = Product
    fields = "__all__"

class IngredientSerializer(serializers.ModelSerializer):
  class Meta:
    model = Ingredient
    fields = (
      "id",
      "name",
      "stock",
      "unit",
      "minimum_stock",
      "supplier",
      "purchase_cost",
      "supplier_contact",
    )