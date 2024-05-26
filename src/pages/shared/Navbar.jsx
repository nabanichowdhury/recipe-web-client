import React, { useEffect, useState } from "react";
import {
  useSignInWithGoogle,
  useSignOut,
  useAuthState,
} from "react-firebase-hooks/auth";
import auth from "../../../firebase.init";
import { Link } from "react-router-dom";
import { checkUserExist } from "../../services/userExist";
import { createUser } from "../../services/createUser";
import coinImage from "../../assets/coin.svg";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const Navbar = () => {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
  const [signOut, loadingSignOut, errorSignOut] = useSignOut(auth);

  const [userExist, setUserExist] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      setUserExist(!!authUser);
      if (authUser) {
        console.log(authUser);
        const userData = {
          name: authUser?.displayName,
          email: authUser?.email,
          photoURL: authUser?.photoURL,
          coin: 50,
        };
        setUserData(userData);
        handleUserExistence(userData.email);
      } else {
        setUserData(null);
      }
    });

    return unsubscribe;
  }, [user]);

  const handleUserExistence = async (email) => {
    const isUserExist = await isExist(email);
    console.log(isUserExist); // This will log true or false

    if (!isUserExist.success) {
      console.log(userData);
      createUser(userData);
    } else {
      setUserData(isUserExist.data);
      console.log("User already exist");
    }
  };

  const isExist = async (email) => {
    const exist = await checkUserExist(email);
    return exist;
  };

  if (loading || loadingSignOut) return <div>Loading...</div>;

  const handleLogout = () => {
    console.log("logout");
    signOut();
  };

  return (
    <div>
      <div className="navbar">
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost text-xl">
            Recipe Treasures
          </Link>
        </div>
        <div className="flex">
          <div>
            <Link to="/all-recipe" role="button" className="btn btn-ghost">
              All Recipe
            </Link>
          </div>
          {userData ? (
            <div className="flex align-middle justify-center">
              <div>
                <Link to="/add-recipe" role="button" className="btn btn-ghost">
                  Add Recipe
                </Link>
              </div>

              <div>
                <div role="button" className="btn btn-ghost ">
                  <div className="indicator">
                    <img width="50px" height="50px" src={coinImage} />

                    <span className="badge badge-sm indicator-item">
                      {userData.coin}
                    </span>
                  </div>
                </div>
              </div>
              <div>
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="w-10 rounded-full">
                    <img
                      alt="Tailwind CSS Navbar component"
                      src={userData?.photoURL}
                    />
                  </div>
                </div>
              </div>
              <div>
                <button
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <div>
              <button
                className="btn btn-ghost"
                onClick={() => signInWithGoogle()}
              >
                Sign In Using Google
              </button>
            </div>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Navbar;
