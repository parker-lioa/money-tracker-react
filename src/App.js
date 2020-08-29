import React, { useState, useEffect } from "react";
import "./App.css";
import Cards from "./components/Cards";
import getData from "./Api/api";

const App = () => {
  const set_data = async () => {
    try {
      const data = await getData();
      if (data) {
        setlist(data);
      } else {
        setlist([]);
      }

      console.log(`${data} from set data! `);
      console.log("set list successfully");
    } catch (err) {
      console.log(err);
    }
  };

  const init_list = () => {
    const data = getData();

    if (data) {
      console.log(`${data} init`);
      return data;
    } else {
      return [];
    }

    console.log(data);
    console.log("set list successfully");
  };

  const [list, setlist] = useState([]);
  const [query, setquery] = useState("ee");
  const [status, setstatus] = useState("idle");
  const [left, setleft] = useState(500);
  const [cost, setcost] = useState(0);
  const [days, setdays] = useState(5);
  const [input, setinput] = useState(0);

  useEffect(() => {
    if (!query) {
      return;
    }

    if (query === "ee") {
      set_data();
      setstatus("fetched");
    }
    setquery("e");
  }, [query]);

  const addCost = (spend) => {
    setcost(spend + cost);
    setleft(left - spend);
  };

  const addClick = () => {
    addCost(parseInt(input));
    setinput(0);
    setquery('er');
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
        </div>{" "}
        <div className="list-container">
          {status === "fetched"
            ? list.map((item, index) => {
                return (
                  <div key={index} className="list-item">
                    <div className="cost">item.cost</div>
                    <div className="category">item.category</div>
                  </div>
                );
              })
            : ""}
        </div>
      </section>
    </div>
  );
};

export default App;
