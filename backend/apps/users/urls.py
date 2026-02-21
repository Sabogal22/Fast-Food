from rest_framework.routers import DefaultRouter
from .views import EmployeeListView, CurrentUserView
from django.urls import path

router = DefaultRouter()
router.register("employees", EmployeeListView, basename="employees")

urlpatterns = [
    path("me/", CurrentUserView.as_view()),
]

urlpatterns += router.urls