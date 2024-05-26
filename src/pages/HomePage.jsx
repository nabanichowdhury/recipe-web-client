import React, { useRef } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import { Link } from "react-router-dom";
import { useCountUp } from "react-countup";
import CounterSection from "../components/CounterSection";
import DevInfo from "../components/DevInfo";

const HomePage = () => {
  const [user, loading] = useAuthState(auth);

  return (
    <div>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-4xl font-bold">
              Unearth Culinary Gems from Every Corner of the Globe.
            </h1>
            <p className="py-6">
              "Recipe Treasure is your ultimate culinary guide, unearthing
              hidden gems from kitchens worldwide. Discover, cook, and savor
              authentic recipes that transform everyday meals into extraordinary
              experiences."
            </p>
            <button className="btn btn-primary">All Recipies</button>
            {user ? (
              <Link to="/add-recipe" className="btn btn-outline mx-3">
                Add Recipies
              </Link>
            ) : (
              <button className="btn btn-primary">Login using google</button>
            )}
          </div>
        </div>
      </div>
      <div>
        <CounterSection />
      </div>
      <div>
        <DevInfo />
      </div>
    </div>
  );
};

export default HomePage;
