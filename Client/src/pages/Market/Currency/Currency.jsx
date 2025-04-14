import React, { useState, useEffect } from 'react';
import './Currency.css';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Currency = () => {
    const [amount, setAmount] = useState(1);
    const [fromCurrency, setFromCurrency] = useState('USD');
    const [toCurrency, setToCurrency] = useState('EUR');
    const [convertedAmount, setConvertedAmount] = useState(null);
    const [chartData, setChartData] = useState(null);

    const apikey = 'a0bd88d23f9a2499ca6259f3'; // Replace with your actual API key

    const today = new Date();
    const lastMonth = new Date();
    lastMonth.setDate(today.getDate() - 30);

    const formatDate = (date) => date.toISOString().split('T')[0];
    const startDate = formatDate(lastMonth);
    const endDate = formatDate(today);

    const handleSwap = () => {
        setFromCurrency((prevFrom) => {
            setToCurrency(prevFrom);
            return toCurrency;
        });
    };

    useEffect(() => {
        // Latest conversion
        fetch(`https://v6.exchangerate-api.com/v6/${apikey}/latest/${fromCurrency}`)
            .then(res => res.json())
            .then(data => {
                const rate = data.conversion_rates[toCurrency];
                setConvertedAmount((amount * rate).toFixed(2));
            });

        // Historical conversion for chart
        fetch(`https://api.frankfurter.app/${startDate}..${endDate}?from=${fromCurrency}&to=${toCurrency}`)
            .then(res => res.json())
            .then(data => {
                const dates = Object.keys(data.rates);
                const values = dates.map(date => data.rates[date][toCurrency]);
                setChartData({
                    labels: dates,
                    datasets: [
                        {
                            label: `${fromCurrency} to ${toCurrency}`,
                            data: values,
                            fill: false,
                            backgroundColor: '#007bff',
                            borderColor: '#007bff',
                            tension: 0.3
                        }
                    ]
                });
            });
    }, [amount, fromCurrency, toCurrency]);

    return (
        <div className="converter-container">
            <h1 className="title">Currency Converter</h1>
            <p className="subtitle">Check live foreign currency exchange rates</p>

            <div className="converter-box">
                <div className="input-group">
                    <label className="amount-label">Enter Amount</label>
                    <input
                        id="amount"
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />
                </div>

                <div className="currency-row">
                    <div className="currency-select">
                        <label>From</label>
                        <select value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)}>
                            <option value="USD">USD - US Dollar</option>
                            <option value="EUR">EUR - Euro</option>
                            <option value="GBP">GBP - British Pound</option>
                            <option value="JPY">JPY - Japanese Yen</option>
                            <option value="INR">INR - Indian Rupee</option>
                        </select>
                    </div>

                    <div className="arrow" onClick={handleSwap}>⇄</div>

                    <div className="currency-select">
                        <label>To</label>
                        <select value={toCurrency} onChange={(e) => setToCurrency(e.target.value)}>
                            <option value="USD">USD - US Dollar</option>
                            <option value="EUR">EUR - Euro</option>
                            <option value="GBP">GBP - British Pound</option>
                            <option value="JPY">JPY - Japanese Yen</option>
                            <option value="INR">INR - Indian Rupee</option>
                        </select>
                    </div>
                </div>

                <div className="converted-result">
                    <h2>
                        {convertedAmount !== null
                            ? `= ${convertedAmount} ${toCurrency}`
                            : '...'}
                    </h2>
                </div>
            </div>

            <div className="chart-box">
                {chartData && (
                    <Line
                        data={chartData}
                        options={{
                            responsive: true,
                            maintainAspectRatio: false,
                            animation: {
                                duration: 1500,
                                easing: 'easeOutQuart'
                            },
                            plugins: {
                                legend: {
                                    display: true,
                                    position: 'top',
                                    labels: {
                                        color: '#333',
                                        font: {
                                            size: 14,
                                        },
                                    },
                                },
                            },
                            scales: {
                                x: {
                                    ticks: {
                                        color: '#555',
                                    },
                                },
                                y: {
                                    ticks: {
                                        color: '#555',
                                    },
                                },
                            },
                        }}
                    />
                )}
            </div>
        </div>
    );
};

export default Currency;
