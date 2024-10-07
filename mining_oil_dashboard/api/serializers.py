# api/serializers.py

from rest_framework import serializers
from .models import MiningOilData

class MiningOilDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = MiningOilData
        fields = '__all__'
