# api/views.py

from rest_framework import viewsets
from .models import MiningOilData
from .serializers import MiningOilDataSerializer

class MiningOilDataViewSet(viewsets.ModelViewSet):
    queryset = MiningOilData.objects.all()
    serializer_class = MiningOilDataSerializer
