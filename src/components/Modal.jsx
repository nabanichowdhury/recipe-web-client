// Modal.js
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";

const Modal = ({ id, title, content, details }) => {
  console.log(details);
  const [user, loading] = useAuthState(auth);
  const handleBuyCoins = async () => {
    const res = await updateUserCoin({
      email: user?.email,
      coin: details.coin,
    });
    console.log(res);
  };
  return (
    <>
      <input type="checkbox" id={id} className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">{title}</h3>
          <p className="py-4">{content}</p>
          <div className="modal-action">
            <label htmlFor={id} className="btn">
              Close!
            </label>
            <button onClick={handleBuyCoins} className="btn btn-primary">
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
