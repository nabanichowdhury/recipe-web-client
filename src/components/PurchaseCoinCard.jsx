import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import { updateUserCoin } from "../services/updateUserCoin";
import Modal from "./Modal";

const PurchaseCoinCard = ({ details }) => {
  console.log(details);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [id, setId] = useState("");
  const [data, setData] = useState({});

  const handleModalData = (details) => {
    setTitle(`Do you want to buy ${details.coin} coin at ${details.price}?`);
    setContent("You will get your coins after payment.");
    setId("my_modal_6");
    setData(details);
  };

  return (
    <div>
      <div className="card w-96 bg-base-100 shadow-xl">
        <figure>
          <img
            src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
            alt="Shoes"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            {details.coin} coin at {details.price} dollar
            <div className="badge badge-secondary">{details.description}</div>
          </h2>
          <p>
            {details.coin} coin at {details.price} dollar
          </p>
          <div className="card-actions justify-end">
            <label
              htmlFor="my_modal_6"
              className="btn"
              onClick={() => handleModalData(details)}
            >
              Proceed to Buy
            </label>
            <Modal id={id} title={title} content={content} details={data} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchaseCoinCard;
