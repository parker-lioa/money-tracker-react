import React from "react";
import "./Cards.css";

const Cards = ({ cost, left, days }) => {
  return (
    <div className="cards-container">
      <div className="card-grid" id="cost">
        {/* 總花費 */}
        <div className="card-text">
          <h1>Cost</h1>
          <h3>{cost}</h3>
        </div>
      </div>
      <div className="card-grid" id="left">
        {/* 剩下的錢 */}  
        <div className="card-text">
          <h1>Left</h1>
          <h3>{left}</h3>
        </div>
      </div>
      <div className="card-grid" id="days-left">
        {/* 還要撐幾天 */}
        <div className="card-text">
          <h1>Days left</h1>
          <h3>{days}</h3>
        </div>
      </div>
    </div>
  );
};

export default Cards;
