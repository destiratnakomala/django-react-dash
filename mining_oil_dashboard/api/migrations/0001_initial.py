# Generated by Django 5.1.1 on 2024-10-07 18:02

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='MiningOilData',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField()),
                ('mining_output', models.FloatField()),
                ('oil_price', models.FloatField()),
                ('mining_cost', models.FloatField()),
                ('production_hours', models.FloatField()),
            ],
        ),
    ]