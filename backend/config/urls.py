from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)
from apps.users.views import CustomTokenObtainPairView

urlpatterns = [
    path("admin/", admin.site.urls),

    # JWT
    path("api/token/", CustomTokenObtainPairView.as_view()),
    path("api/token/refresh/", TokenRefreshView.as_view()),

    # Users
    path("api/users/", include("apps.users.urls")),

    # Products
    path("api/", include("apps.products.urls")),
]
