import React, { useState } from "react";
import "./App.css";
import Cards from "./components/Cards";
import getData from './Api/api';

const App = () => {

  const data = getData();

  const [list,setlist] = useState(data);
  const [left, setleft] = useState(500);
  const [cost, setcost] = useState(0);
  const [days, setdays] = useState(5);

  const [input, setinput] = useState(0);

  const addCost = (spend) => {
    setcost(spend + cost);
    setleft(left - spend);
  };

  const addClick = () => {
    addCost(parseInt(input));
    setinput(0);
  };

  return (
    <div>
      <span className="title">
        <h1>Money-tracker</h1>
      </span>
      <Cards cost={cost} left={left} days={days} />
      <section>
        <div className="control-bar">
          <input
            type="number"
            value={input}
            onChange={(e) => {
              setinput(e.target.value);
            }}
          ></input>
          <button onClick={addClick}>Add</button>
        </div>
        <div className="list-container"></div>
      </section>
    </div>
  );
};

export default App;
