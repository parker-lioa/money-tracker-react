import React from "react";
import "./Cards.css";

const Cards = ({ cost, left, days }) => {
  return (
    <div className="cards-container">
      <div className="card-grid">
        {/* 總花費 */}
        Cost:{cost}
      </div>
      <div className="card-grid">
        {/* 剩下的錢 */}
        Left:{left}
      </div>
      <div className="card-grid">
        {/* 還要撐幾天 */}
        Days left:{days}
      </div>
    </div>
  );
};

export default Cards;
