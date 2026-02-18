from django.urls import path
from .views import CurrentUserView, EmployeeListView

urlpatterns = [
  path("me/", CurrentUserView.as_view()),
  path("employees/", EmployeeListView.as_view(), name="employees"),
]
