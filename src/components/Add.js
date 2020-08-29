import React, { useState } from "react";
import Modal from "react-modal";
import { postData } from "../Api/api";

Modal.setAppElement("#root");

const modal_style = {
  overlay: {
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

function Add({ handle }) {
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
    postData({ cost, category });
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
      <button onClick={showModal}>Add</button>
      <Modal isOpen={show} style={modal_style}>
        <form onSubmit={handleSubmit}>
          <label for="cost">How much :</label>
          <input
            type="text"
            name="cost"
            value={cost}
            onChange={handleCostInput}
          ></input>
          <br></br>
          <label>Category :</label>
          <input
            type="text"
            name="category"
            value={category}
            onChange={handleCategoryInput}
          ></input>
          <br></br>
          <input type="submit" value="Add"></input>
        </form>
        <button onClick={cancelModal}>Close</button>
      </Modal>
    </>
  );
}

export default Add;
