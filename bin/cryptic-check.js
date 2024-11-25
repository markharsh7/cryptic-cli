const { Command } = require('commander');
const axios = require('axios');
const manager = require('../commands/key');

// Base URL for CoinCap API
const API_URL = 'https://api.coincap.io/v2/assets';

// Replace `YOUR_API_KEY` with your actual CoinCap API key
const API_KEY = manager.show();

// Helper function to fetch cryptocurrency prices
const fetchCryptoPrice = async (crypto) => {
    try {
        const response = await axios.get(`${API_URL}/${crypto}`, {
            headers: {
                Authorization: `Bearer ${API_KEY}`,
            },
        });

        const data = response.data.data;
        return {
            name: data.name,
            symbol: data.symbol,
            price: parseFloat(data.priceUsd).toFixed(2),
            rank: data.rank,
            marketCap: parseFloat(data.marketCapUsd).toFixed(2),
        };
    } catch (error) {
        if (error.response && error.response.status === 404) {
            throw new Error(`Cryptocurrency "${crypto}" not found.`);
        } else {
            throw new Error('Error fetching cryptocurrency data. Please check your API key or try again.');
        }
    }
};

module.exports = {fetchCryptoPrice};