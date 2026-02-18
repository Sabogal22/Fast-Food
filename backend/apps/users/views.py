from rest_framework.views import APIView
from rest_framework.generics import ListAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .serializers import UserSerializer, EmployeeSerializer
from .models import User

class CurrentUserView(APIView):
  permission_classes = [IsAuthenticated]

  def get(self, request):
    serializer = UserSerializer(request.user)
    return Response(serializer.data)

class EmployeeListView(ListAPIView):
  serializer_class = EmployeeSerializer
  queryset = User.objects.exclude(role="admin")
