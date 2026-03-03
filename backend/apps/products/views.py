from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import Product, Category, Ingredient
from django.db.models import F
from .serializers import ProductSerializer, CategorySerializer, IngredientSerializer
from apps.users.permissions import IsAdminUserRole

class ProductViewSet(ModelViewSet):
  queryset = Product.objects.all()
  serializer_class = ProductSerializer
  permission_classes = [IsAuthenticated, IsAdminUserRole]

class CategoryViewSet(ModelViewSet):
  queryset = Category.objects.all()
  serializer_class = CategorySerializer
  permission_classes = [IsAuthenticated, IsAdminUserRole]

class IngredientViewSet(ModelViewSet):
  queryset = Ingredient.objects.all()
  serializer_class = IngredientSerializer
  permission_classes = [IsAuthenticated, IsAdminUserRole]

  @action(detail=False, methods=["get"])
  def units(self, request):
    return Response([
      {"value": choice[0], "label": choice[1]}
      for choice in Ingredient.UNIT_CHOICES
    ])

class CriticalInventoryView(APIView):
  def get(self, request):
    critical = Ingredient.objects.filter(
      stock__lte=F("minimum_stock")
    )

    serializer = IngredientSerializer(critical, many=True)
    return Response(serializer.data)