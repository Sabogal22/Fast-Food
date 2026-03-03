from rest_framework.routers import DefaultRouter
from django.urls import path
from .views import ProductViewSet, CategoryViewSet, IngredientViewSet, CriticalInventoryView

router = DefaultRouter()
router.register(r"products", ProductViewSet)
router.register(r"categories", CategoryViewSet)
router.register(r"ingredients", IngredientViewSet)

urlpatterns = [
  path("inventory/critical/", CriticalInventoryView.as_view()),
] + router.urls