// src/Dashboard.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
    const [data, setData] = useState([]);
    const [prediction, setPrediction] = useState(null);
    const [inputs, setInputs] = useState({
        oil_price: '',
        mining_cost: '',
        production_hours: ''
    });
    const [error, setError] = useState('');

    // Fetch dataset
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/mining-oil-data/');
                setData(response.data);
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };

        fetchData();
    }, []);

    // Handle form input changes
    const handleChange = (e) => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value
        });
    };

    // Handle form submission for prediction
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/mining-oil-data/predict/', inputs);
            setPrediction(response.data.predicted_mining_output);
        } catch (error) {
            console.error("Error fetching prediction: ", error);
            setError(error.response?.data?.error || 'Error occurred while predicting.');
        }
    };

    return (
        <div>
            <h1>Mining and Oil Production Dashboard</h1>

            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Mining Output</th>
                        <th>Oil Price</th>
                        <th>Mining Cost</th>
                        <th>Production Hours</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(item => (
                        <tr key={item.id}>
                            <td>{item.date}</td>
                            <td>{item.mining_output}</td>
                            <td>{item.oil_price}</td>
                            <td>{item.mining_cost}</td>
                            <td>{item.production_hours}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h2>Predict Mining Output</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Oil Price:</label>
                    <input
                        type="number"
                        name="oil_price"
                        value={inputs.oil_price}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Mining Cost:</label>
                    <input
                        type="number"
                        name="mining_cost"
                        value={inputs.mining_cost}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Production Hours:</label>
                    <input
                        type="number"
                        name="production_hours"
                        value={inputs.production_hours}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Predict</button>
            </form>

            {error && <p style={{color: 'red'}}>{error}</p>}
            
            {prediction !== null && (
                <div>
                    <h3>Predicted Mining Output:</h3>
                    <p><strong>{prediction.toFixed(2)}</strong></p>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
