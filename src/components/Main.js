import React, { useState, useEffect } from "react";
import "./Main.css";
import Cards from "./Cards";
import Add from "./Add";
import Update from "./Update";
import { getData, deleteData } from "../Api/record";
import { getUserData, updateUserData } from "../Api/user";
import queryString from "query-string";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.id = queryString.parse(props.location.search).id;
  }

  state = {
    list: [],
    total_cost: 0,
    total_money: 0,
    money_left: 0,
    days_left: 0,
  };

  updateTotal_money = async (target) => {
    const { total_cost } = this.state;
    updateUserData({
      id: this.id,
      total_cost: total_cost,
      total_money: target,
    });
    const user_data = await getUserData({ id: this.id });
    console.log(user_data);
    this.setState({
      total_cost: user_data.total_cost,
      total_money: user_data.total_money,
      money_left: user_data.total_money - user_data.total_cost,
      days_left: user_data.days_left,
    });
  };

  async componentDidMount() {
    const data = await getData({ id: this.id });
    const user_data = await getUserData({ id: this.id });
    this.setState({ list: data });
    this.setState({
      total_cost: user_data.total_cost,
      total_money: user_data.total_money,
      money_left: user_data.total_money - user_data.total_cost,
      days_left: user_data.days_left,
    });
  }

  handle_parent_state = async () => {
    const data = await getData({ id: this.id });
    const user_data = await getUserData({ id: this.id });
    this.setState({ list: data });
    this.setState({
      total_cost: user_data.total_cost,
      total_money: user_data.total_money,
      money_left: user_data.total_money - user_data.total_cost,
      days_left: user_data.days_left,
    });
  };

  handleDelete = async (event, item) => {
    const { total_cost, total_money } = this.state;
    item.stopPropagation();
    const response = await deleteData({ id: event._id });
    updateUserData({
      id: this.id,
      total_cost: parseInt(total_cost) - parseInt(event.cost),
      total_money: total_money,
    });
    const data = await getData({ id: this.id });
    this.setState({ list: data });
    const user_data = await getUserData({ id: this.id });
    this.setState({
      total_cost: user_data.total_cost,
      total_money: user_data.total_money,
      money_left: user_data.total_money - user_data.total_cost,
      days_left: user_data.days_left,
    });
  };

  render() {
    const { list, total_cost, total_money, money_left, days_left } = this.state;
    const handle = this.handle_parent_state;
    const handleUpdate = this.updateTotal_money;
    const handleDelete = this.handleDelete;
    const id = this.id;

    return (
      <React.Fragment>
        <div className="title">
          <h1>Money - Tracker</h1>
        </div>
        <Cards cost={total_cost} left={money_left} days={days_left} />
        <section className="main-function">
          <div className="operation-container">
            <Add
              handle={handle}
              id={id}
              total_cost={total_cost}
              total_money={total_money}
            />
            <Update handle={handleUpdate} />
          </div>
          <div className="list-container">
            {list
              ? list.map((item, index) => {
                  return (
                    <div key={index} className="item-container">
                      <div>{item.cost}</div>
                      <div>{item.category}</div>
                      <div>{item.updated_time.slice(0, 10)}</div>
                      <button
                        id="delete-button"
                        onClick={this.handleDelete.bind(this, item)}
                      >
                        <FontAwesomeIcon icon={faTrashAlt} size="1x" />
                      </button>
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
