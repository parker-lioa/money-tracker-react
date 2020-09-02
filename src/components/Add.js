import React, { useState } from "react";
import Modal from "react-modal";
import { postData } from "../Api/record";
import { updateUserData} from "../Api/user";
import "./Add.css";

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

function Add({ handle, email,name,total_cost,total_money }) {
  const [show, setShow] = useState(false);
  const [cost, setCost] = useState(0);
  const [category, setCategory] = useState("");
  const showModal = () => {
    setShow(true);
  };

  const cancelModal = () => {
    setShow(false);
  };

  const handleSubmit = (event) => {
    console.log("handleSubmit is called");
    event.preventDefault();
    setShow(false);
    setCategory("");
    postData({ user:name , cost:cost, category:category });
    setCost(0);
    updateUserData({email:email,name:name,total_cost:parseInt(total_cost)+parseInt(cost),total_money:total_money});
    handle();
  };

  const handleCostInput = (event) => {
    setCost(event.target.value);
  };

  const handleCategoryInput = (event) => {
    setCategory(event.target.value);
  };

  return (
    <>
      <button id="add-button" onClick={showModal}>
        Add
      </button>
      <Modal isOpen={show} style={modal_style}>
        <form id="add-form" onSubmit={handleSubmit}>
          <label for="cost">How much :</label>
          <input
            type="text"
            name="cost"
            value={cost}
            onChange={handleCostInput}
          ></input>
          <label>Category :</label>
          <input
            type="text"
            name="category"
            value={category}
            onChange={handleCategoryInput}
          ></input>
          <input id="add-submit" type="submit" value="Add"></input>
        </form>
        <button id="add-close-button" onClick={cancelModal}>
          Close
        </button>
      </Modal>
    </>
  );
}

export default Add;
