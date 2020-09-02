import React, { useState, useEffect } from "react";
import "./Main.css";
import Cards from "./Cards";
import Add from "./Add";
import { getData } from "../Api/record";
import { getUserData } from "../Api/user";
import queryString from "query-string";

class Main extends React.Component {
  constructor(prop) {
    super(prop);
    this.Name = queryString.parse(prop.location.search).Name;
    this.Email = queryString.parse(prop.location.search).Email;
  }

  state = {
    list: [],
    total_cost: 500,
    money_left: 3500,
    days_left: 11,
  };

  async componentDidMount() {
    const data = await getData({ Email: this.Email, Name: this.Name });
    console.log(this.Email, this.Name);
    const user_data = await getUserData({ email: this.Email, name: this.Name });
    console.log(`it is ${user_data}`);
    this.setState({ list: data });
  }

  handle_parent_state = async () => {
    const data = await getData({ Email: this.Email, Name: this.Name });
    this.setState({ list: data });
  };

  render() {
    const { list, total_cost, money_left, days_left } = this.state;
    const handle = this.handle_parent_state;
    const name = this.Name;

    return (
      <React.Fragment>
        <div className="title">
          <h1>Money - Tracker</h1>
        </div>
        <Cards cost={total_cost} left={money_left} days={days_left} />
        <section className="main-function">
          <div className="operation-container">
            <Add handle={handle} user={name} />
          </div>
          <div className="list-container">
            {list
              ? list.map((item, index) => {
                  return (
                    <div key={index} className="item-container">
                      <div>{item.cost}</div>
                      <div>{item.category}</div>
                      <div>{item.updated_time.slice(0, 10)}</div>
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

export default Main;
