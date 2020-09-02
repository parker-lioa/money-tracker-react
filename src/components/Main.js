import React, { useState, useEffect } from "react";
import "./Main.css";
import Cards from "./Cards";
import Add from "./Add";
import Update from "./Update";
import { getData } from "../Api/record";
import { getUserData , updateUserData } from "../Api/user";
import queryString from "query-string";

class Main extends React.Component {
  constructor(prop) {
    super(prop);
    this.Name = queryString.parse(prop.location.search).Name;
    this.Email = queryString.parse(prop.location.search).Email;
  }

  state = {
    list: [],
    total_cost: 0,
    total_money:0,
    money_left:0,
    days_left:0,
  };

  

  updateTotal_money = async(target)=>{
    const {total_cost} = this.state;
    updateUserData({email:this.Email,name:this.name,total_cost:total_cost,total_money:target});
    const user_data = await getUserData({ email: this.Email, name: this.Name });
    this.setState({total_cost:user_data.total_cost,total_money:user_data.total_money,money_left:user_data.total_money-user_data.total_cost,days_left:user_data.days_left});

  }

  async componentDidMount() {
    const data = await getData({ Email: this.Email, Name: this.Name });
    console.log(this.Email, this.Name);
    const user_data = await getUserData({ email: this.Email, name: this.Name });
    this.setState({ list: data });
    this.setState({total_cost:user_data.total_cost,total_money:user_data.total_money,money_left:user_data.total_money-user_data.total_cost,days_left:user_data.days_left});
  }

  handle_parent_state = async () => {
    const data = await getData({ Email: this.Email, Name: this.Name });
    const user_data = await getUserData({ email: this.Email, name: this.Name });
    this.setState({ list: data });
    this.setState({total_cost:user_data.total_cost,total_money:user_data.total_money,money_left:user_data.total_money-user_data.total_cost,days_left:user_data.days_left});
  };

  render() {
    const { list, total_cost, total_money,money_left, days_left } = this.state;
    const handle = this.handle_parent_state;
    const handleUpdate = this.updateTotal_money;
    const name = this.Name;
    const email = this.Email;
    return (
      <React.Fragment>
        <div className="title">
          <h1>Money - Tracker</h1>
        </div>
        <Cards cost={total_cost} left={money_left} days={days_left} />
        <section className="main-function">
          <div className="operation-container">
            <Add handle={handle} email={email} name={name} total_cost={total_cost} total_money={total_money} />
            <Update handle={handleUpdate}/>
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
