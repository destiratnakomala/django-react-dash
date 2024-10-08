from rest_framework import serializers
from .models import MiningOilData

class MiningOilDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = MiningOilData
        fields = ['id', 'date', 'mining_output', 'oil_price', 'mining_cost', 'production_hours']
