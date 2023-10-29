import React, { useEffect, useState } from "react";
import "./home.scss"; // Make sure to create this SCSS file
import { getMarketData } from "../api/coingecko";
import CryptoBackground from "./../assets/blockchain.webp";
import { Link } from "react-router-dom";

const Home = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
  const [images, setImages] = useState([""])
  const [allData, setAllData] = useState([])

  useEffect(  () =>{
    marketData();
    const intervalId = setInterval(() => {
      setCurrentIndex((currentIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(intervalId);
  }, [currentIndex, images.length])
  
  const marketData = async () => {
    const data = await getMarketData();
    const icons = await data?.map(image => image.image);
    setImages(icons);
    setAllData(data)
    // console.log(data)
  }

  return (
    <div className="home">
      
      <header className="header">
        <div className="title">
          <h1>ApexSwap <br/> Your Hive and HBD Exchange</h1>
        </div>
        <div className="icons">
          {images?.map((image, index) => (
            <img
              key={index}
              src={image}
              className={index === currentIndex ? "active" : ""}
              alt=""
            />
          ))}
        </div>
      </header>

      <section className="about">
        <div className="apex-description">
          <h2>What is ApexSwap?</h2>
          <p>
            ApexSwap is a decentralized exchange built on the Hive blockchain.
            Easily swap Hive and Hive Dollar for Bitcoin (BTC) and Tether (USDT).
          </p>
          <p>
            Our platform offers low fees and seamless transactions. Get started
            by registering below.
          </p>
          <div className="buttons">
            <Link to="/register">
              <button className="primary-button">Sign up</button>
            </Link>
            <Link to="/login">
              <button className="secondary-button">Login</button>
            </Link>
          </div>
        </div>
        <div className="blockchain-img">
          <img src={CryptoBackground} alt="Blockchain" />
        </div>
      </section>

      <section className="market-info">
        <h2>Live Market Information</h2>
        <table>
          <thead>
            <tr>
              <th>Crypto</th>
              <th>Price (USD)</th>
              <th>Change (24h)</th>
              <th>Market Cap (USD)</th>
              <th>Total Supply</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {allData?.map((coin) => (
              <tr key={coin.id}>
                <td className="coin-info">
                  <img src={coin.image} alt={coin.name} />
                  <span>{coin.symbol}</span>
                </td>
                <td>${coin.current_price.toFixed(2)}</td>
                <td
                  className={
                    coin.price_change_percentage_24h < 0 ? "price-down" : "price-up"
                  }
                >
                  {coin.price_change_percentage_24h.toFixed(2)}%
                </td>
                <td>${coin.market_cap.toLocaleString()}</td>
                <td>{coin.total_supply}</td>
                <td>
                  <button className="buy-button">Buy</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="additional-content">
        <h2>Why Choose ApexSwap?</h2>
        <p>
          We provide a secure and user-friendly platform for swapping your Hive
          and Hive Dollar to Bitcoin and Tether. Our dedicated team ensures a
          seamless experience for our users.
        </p>
      </section>

      <section className="contact">
        <h2>Contact Us</h2>
        <p>
          Have questions or need assistance? Feel free to contact our support
          team at{" "}
          <a href="mailto:support@apexswap.com">support@apexswap.com</a>.
        </p>
      </section>

      <footer className="page-footer">
        <div className="footer-container">
          <div className="footer-links">
            <a href="#">About</a>
            <a href="#">Contact</a>
            <a href="#">Privacy Policy</a>
          </div>
          <p>&copy; {new Date().getFullYear()} ApexSwap</p>
        </div>
      </footer>

    </div>
  );
};

export default Home;
