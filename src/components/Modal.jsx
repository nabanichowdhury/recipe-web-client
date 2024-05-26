// Modal.js
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import { updateUserCoin } from "../services/updateUserCoin";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Modal = ({ id, title, content, details }) => {
  console.log(details);
  const [user, loading] = useAuthState(auth);
  if (loading) return <div>Loading...</div>;
  const handleBuyCoins = async () => {
    const res = await updateUserCoin({
      email: user?.email,
      coin: details.coin,
    });
    console.log(res);

    if (res.success) {
      toast.success("Coins purchased successfully");
    } else {
      toast.error("Failed to purchase coins");
    }
  };
  return (
    <>
      <input type="checkbox" id={details.id} className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">{title}</h3>
          <p className="py-4">{content}</p>
          <div className="modal-action">
            <label htmlFor={details.id} className="btn">
              Close!
            </label>
            <label
              htmlFor={details.id}
              onClick={handleBuyCoins}
              className="btn btn-primary"
            >
              Buy Now
            </label>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Modal;
