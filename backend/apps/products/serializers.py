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
  unit_display = serializers.CharField(source="get_unit_display", read_only=True)
  is_low_stock = serializers.SerializerMethodField()

  class Meta:
    model = Ingredient
    fields = (
      "id",
      "name",
      "stock",
      "unit",
      "unit_display",
      "minimum_stock",
      "supplier",
      "purchase_cost",
      "supplier_contact",
      "is_low_stock",
    )

  def get_is_low_stock(self, obj):
    return obj.minimum_stock > 0 and obj.stock <= obj.minimum_stock

  def to_representation(self, instance):
    data = super().to_representation(instance)
    data["stock"] = float(data["stock"])
    data["minimum_stock"] = float(data["minimum_stock"])
    if data.get("purchase_cost"):
      data["purchase_cost"] = float(data["purchase_cost"])

    return data