import React, { useState } from "react";
import Modal from "react-modal";
import { postData } from "../Api/record";
import { updateUserData} from "../Api/user";

import "./Update.css";

Modal.setAppElement("#root");

const modal_style = {
  overlay: {
    background: "rgba(0,0,0,0)",
    width: "40%",
    height: "50%",
    left: "30%",
    right: "30%",
    top: "25%",
    bottom: "25%",
  },
  content: {
    border: "5px solid #ccc",
    borderRadius: "30px",
  },
};

function Update({ handle }) {
  const [show, setShow] = useState(false);
  const [money,setMoney]= useState(0);
  const showModal = () => {
    setShow(true);
  };

  const cancelModal = () => {
    setShow(false);
  };

  const handleMoneyInput = (event)=>{
      setMoney(event.target.value);
  }

  const handleSubmit = (event) => {
    console.log("handleSubmit is called");
    event.preventDefault();
    setShow(false);
    handle(money);
    setMoney(0);
  };

 
  return (
    <>
      <button id="update-button" onClick={showModal}>
        Update
      </button>
      <Modal isOpen={show} style={modal_style}>
        <form id="update-form" onSubmit={handleSubmit}>
          <label for="cost">Total money</label>
          <input
            type="text"
            name="cost"
            value={money}
            onChange={handleMoneyInput}
          ></input>
          <input id="update-submit" type="submit" value="Update"></input>
        </form>
        <button id="update-close-button" onClick={cancelModal}>
          Close
        </button>
      </Modal>
    </>
  );
}

export default Update;
