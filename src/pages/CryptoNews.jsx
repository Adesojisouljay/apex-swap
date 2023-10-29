import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import cryptobackground from "./../assets/cryptobackground.webp"
import axios from 'axios';

import './news.scss';

const CryptoNews = () => {
  const [newsData, setNewsData] = useState([]);

  useEffect(() => {
    // Replace this with your API call to fetch cryptocurrency news data
    // Example API call:
    // fetch('https://api.example.com/cryptocurrency-news')
    //   .then((response) => response.json())
    //   .then((data) => setNewsData(data));

    // For this example, we'll simulate the data
    const simulatedData = [
      {
        id: 1,
        title: 'Bitcoin Price Surges to New All-Time High',
        description: 'Bitcoin reached a new all-time high, surpassing $60,000 in value.',
        source: 'CryptoNews24',
        date: '2023-09-20',
      },
      {
        id: 2,
        title: 'Ethereum 2.0 Upgrade Progress Update',
        description: 'The Ethereum 2.0 upgrade is making steady progress with enhanced scalability and security features.',
        source: 'Ethereum World',
        date: '2023-09-19',
      },
      {
        id: 3,
        title: 'Rise of NFTs: Non-Fungible Tokens Gain Popularity',
        description: 'Non-fungible tokens (NFTs) are becoming a significant trend in the crypto world, with artists and collectors embracing them.',
        source: 'Crypto Trends Today',
        date: '2023-09-18',
      },
      {
        id: 4,
        title: 'Bitcoin Price Surges to New All-Time High',
        description: 'Bitcoin reached a new all-time high, surpassing $60,000 in value.',
        source: 'CryptoNews24',
        date: '2023-09-20',
      },
      {
        id: 5,
        title: 'Ethereum 2.0 Upgrade Progress Update',
        description: 'The Ethereum 2.0 upgrade is making steady progress with enhanced scalability and security features.',
        source: 'Ethereum World',
        date: '2023-09-19',
      },
      {
        id: 6,
        title: 'Rise of NFTs: Non-Fungible Tokens Gain Popularity',
        description: 'Non-fungible tokens (NFTs) are becoming a significant trend in the crypto world, with artists and collectors embracing them.',
        source: 'Crypto Trends Today',
        date: '2023-09-18',
      },
      {
        id: 7,
        title: 'Bitcoin Price Surges to New All-Time High',
        description: 'Bitcoin reached a new all-time high, surpassing $60,000 in value.',
        source: 'CryptoNews24',
        date: '2023-09-20',
      },
      {
        id: 8,
        title: 'Ethereum 2.0 Upgrade Progress Update',
        description: 'The Ethereum 2.0 upgrade is making steady progress with enhanced scalability and security features.',
        source: 'Ethereum World',
        date: '2023-09-19',
      },
      {
        id: 9,
        title: 'Rise of NFTs: Non-Fungible Tokens Gain Popularity',
        description: 'Non-fungible tokens (NFTs) are becoming a significant trend in the crypto world, with artists and collectors embracing them.',
        source: 'Crypto Trends Today',
        date: '2023-09-18',
      },
    ];
    fetchCryptoNews();
    setNewsData(simulatedData);
  }, []);

const fetchCryptoNews = async () => {
  try {
    const response = await axios.get(
      'https://api.coingecko.com/api/v3/events',
      {
        params: {
          category: 'general',
          lang: 'en',
        },
      }
    );

    // Handle the response data here
    const newsData = response.data.data;
    console.log(newsData);
    // Process and display the news articles in your application
  } catch (error) {
    console.error('Error fetching crypto news:', error);
  }
};

// Call the function to fetch crypto news



  return (
    <div className="crypto-news">
      <h2>Latest Crypto News</h2>
      <div className="news-list">
        {newsData.map((news) => (
          <div className="news-item" key={news.id}>
            <img src={cryptobackground} alt="" />
            <Link to={`/crypto-news/xyz`}>
              <h3>{news.title}</h3>
            </Link>
            <p className="description">{news.description}</p>
            <p className="source">Source: {news.source}</p>
            <p className="date">Date: {news.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CryptoNews;
