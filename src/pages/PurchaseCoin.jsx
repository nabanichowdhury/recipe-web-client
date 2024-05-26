import React from "react";
import PurchaseCoinCard from "../components/PurchaseCoinCard";

const PurchaseCoin = () => {
  const data = [
    {
      id: 1,
      coin: 100,
      price: "1 ",
      description: "Most Popular",
    },
    {
      id: 2,
      coin: 500,
      price: "50",
      description: "Best Value",
    },
    {
      id: 3,
      coin: 1000,
      price: "100",
      description: "Great Value",
    },
  ];
  return (
    <div className="grid grid-cols-3 gap-4">
      {data.map((item) => (
        <PurchaseCoinCard key={item.id} details={item}></PurchaseCoinCard>
      ))}
    </div>
  );
};

export default PurchaseCoin;
