import random
from django.core.management.base import BaseCommand
from api.models import MiningOilData
from faker import Faker

class Command(BaseCommand):
    help = 'Populate the MiningOilData table with 50 rows of random data'

    def handle(self, *args, **kwargs):
        fake = Faker()
        for _ in range(100):
            MiningOilData.objects.create(
                date=fake.date_this_year(),
                mining_output=random.uniform(1000, 10000),  # Random mining output
                oil_price=random.uniform(50, 150),  # Random oil price
                mining_cost=random.uniform(1000, 5000),  # Random mining cost
                production_hours=random.uniform(1, 24)  # Random production hours
            )
        self.stdout.write(self.style.SUCCESS('Successfully populated the database with 50 rows'))
