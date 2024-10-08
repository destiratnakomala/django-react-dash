# api/views.py

from rest_framework.decorators import api_view
from rest_framework.response import Response
from sklearn.linear_model import LinearRegression
import pandas as pd
from .models import MiningOilData

@api_view(['POST'])
def linear_regression_prediction(request):
    # Fetch data from PostgreSQL
    data = MiningOilData.objects.all().values()
    df = pd.DataFrame(data)

    # Check if enough data exists
    if len(df) < 10:
        return Response({"error": "Not enough data to train the model."}, status=400)

    # Extract feature columns and target column
    X = df[['oil_price', 'mining_cost', 'production_hours']]  # Features
    y = df['mining_output']  # Target variable

    # Initialize and train the linear regression model
    model = LinearRegression()
    model.fit(X, y)

    # Get user input from request data
    oil_price = request.data.get('oil_price')
    mining_cost = request.data.get('mining_cost')
    production_hours = request.data.get('production_hours')

    # Validate the input
    if not (oil_price and mining_cost and production_hours):
        return Response({"error": "All input fields are required."}, status=400)

    try:
        input_values = [[float(oil_price), float(mining_cost), float(production_hours)]]
    except ValueError:
        return Response({"error": "Invalid input values."}, status=400)

    # Perform prediction
    predicted_output = model.predict(input_values)

    return Response({"predicted_mining_output": predicted_output[0]})
