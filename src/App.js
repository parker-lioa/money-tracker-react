import React, { useState, useEffect } from "react";
import "./App.css";
import Cards from "./components/Cards";
import Add from "./components/Add";
import { getData } from "./Api/api";

class App extends React.Component {
  state = {
    list: [],
    total_cost: 500,
    money_left: 3500,
    days_left: 11,
  };

  async componentDidMount() {
    const data = await getData();

    this.setState({ list: data });
  }

  handle_parent_state = async () => {
    const data = await getData();
    this.setState({ list: data });
  };

  render() {
    const { list, total_cost, money_left, days_left } = this.state;
    const handle = this.handle_parent_state;

    return (
      <React.Fragment>
        <div className="title">
          <h1>Money - Tracker</h1>
        </div>
        <Cards cost={total_cost} left={money_left} days={days_left} />
        <section className="main-function">
          <div className="operation-container">
            <Add handle={handle} />
          </div>
          <div className="list-container">
            {list
              ? list.map((item, index) => {
                  return (
                    <div key={index} className="item-container">
                      <div>{item.cost}</div>
                      <div>{item.category}</div>
                      <div>{item.updated_time}</div>
                    </div>
                  );
                })
              : ""}
          </div>
        </section>
      </React.Fragment>
    );
  }
}

export default App;
