from django.db import models
from decimal import Decimal

class Category(models.Model):
  name = models.CharField(max_length=100, unique=True)
  description = models.TextField(blank=True)

  created_at = models.DateTimeField(auto_now_add=True)

  def __str__(self):
    return self.name

class Product(models.Model):
  category = models.ForeignKey(
    Category,
    on_delete=models.PROTECT,
    related_name="products"
  )

  name = models.CharField(max_length=150)
  description = models.TextField(blank=True)
  price = models.DecimalField(max_digits=10, decimal_places=2)

  is_available = models.BooleanField(default=True)

  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True)

  def __str__(self):
    return self.name

class Ingredient(models.Model):
  UNIT_CHOICES = [
    ("g", "Gramos"),
    ("kg", "Kilogramos"),
    ("u", "Unidades"),
    ("ml", "Mililitros"),
    ("l", "Litros"),
  ]

  name = models.CharField(max_length=150, unique=True)
  stock = models.DecimalField(
    max_digits=10,
    decimal_places=2,
    default=Decimal("0.00")
  )
  unit = models.CharField(max_length=10, choices=UNIT_CHOICES)

  minimum_stock = models.DecimalField(
    max_digits=10,
    decimal_places=2,
    default=Decimal("0.00")
  )

  supplier = models.CharField(
    max_length=200,
    blank=True,
    null=True,
    help_text="Proveedor del ingrediente"
  )

  purchase_cost = models.DecimalField(
    max_digits=10,
    decimal_places=2,
    blank=True,
    null=True,
    help_text="Costo de compra por unidad"
  )

  # Contacto del proveedor (opcional)
  supplier_contact = models.CharField(
    max_length=200,
    blank=True,
    null=True,
    help_text="Nombre de contacto del proveedor"
  )

  created_at = models.DateTimeField(auto_now_add=True)

  def __str__(self):
    return self.name

class ProductIngredient(models.Model):
  product = models.ForeignKey(
    Product,
    on_delete=models.CASCADE,
    related_name="recipe"
  )

  ingredient = models.ForeignKey(
    Ingredient,
    on_delete=models.CASCADE,
    related_name="used_in"
  )

  quantity_used = models.DecimalField(
    max_digits=10,
    decimal_places=2
  )

  def __str__(self):
    return f"{self.product.name} - {self.ingredient.name}"