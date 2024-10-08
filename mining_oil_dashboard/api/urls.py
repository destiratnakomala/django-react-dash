# api/urls.py

from django.urls import path
from .views import linear_regression_prediction

urlpatterns = [
    path('mining-oil-data/predict/', linear_regression_prediction, name='linear_regression_prediction'),
]
