import React from "react";
import { Link } from "react-router-dom";

export default function ListItem({ coin }) {
  return (
    <div className="home-crypto">
      <Link to={`/react-ecommerce/${coin.id}`}>
        <span className="home-crypto-image">
          <img src={coin.image} />
        </span>
        <span className="home-crypto-name">{coin.name}</span>
        {coin.priceBtc && (
          <span className="home-crypto-prices">
            <span className="home-crypto-btc" style={{ color: "#900020" }}>
              <img src={process.env.PUBLIC_URL + "/bitcoin.webp"} />
              {coin.priceBtc} BTC
            </span>
            <span className="home-crypto-usd">({coin.priceUsd} USD)</span>
          </span>
        )}
      </Link>
    </div>
  );
}
