// src/Dashboard.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
    const [data, setData] = useState([]);

    // Fetch data from the Django API
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
        </div>
    );
};

export default Dashboard;
