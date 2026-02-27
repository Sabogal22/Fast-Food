from django.contrib import admin
from .models import Category, Product, Ingredient, ProductIngredient


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
  list_display = ("id", "name", "created_at")
  search_fields = ("name",)


class ProductIngredientInline(admin.TabularInline):
  model = ProductIngredient
  extra = 1


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
  list_display = (
    "id",
    "name",
    "category",
    "price",
    "is_available",
    "created_at",
  )
  list_filter = ("category", "is_available")
  search_fields = ("name",)
  inlines = [ProductIngredientInline]


@admin.register(Ingredient)
class IngredientAdmin(admin.ModelAdmin):
  list_display = (
    "id",
    "name",
    "stock",
    "unit",
    "minimum_stock",
    "created_at",
    "supplier",
    "purchase_cost",
    "supplier_contact",
  )
  search_fields = ("name",)