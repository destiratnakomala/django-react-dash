# api/models.py

from django.db import models

class MiningOilData(models.Model):
    date = models.DateField()
    mining_output = models.FloatField()
    oil_price = models.FloatField()
    mining_cost = models.FloatField()
    production_hours = models.FloatField()

    def __str__(self):
        return f"{self.date} - Output: {self.mining_output}"
