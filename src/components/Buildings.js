import React from "react";
import { useStore } from "../context/GameContext";

import { BUILDINGS } from "../data/buildings";
import { BuyButton } from "./BuyButton";

const BuildingEntry = ({ buildingId, buildings, resources }) => {
  const buildingData = BUILDINGS[buildingId];
  const amountOwned = buildings[buildingId];
  return (
    <div title={buildingData.desc}>
      <span style={{ fontFamily: "monospace" }}>{amountOwned} x </span>
      <span>
        {buildingData.icon} {buildingData.name}
      </span>
      <BuyButton objectId={buildingId} owned={amountOwned} />
    </div>
  );
};

export const Buildings = () => {
  const { buildings } = useStore();
  return (
    <div>
      <h4 style={{ textAlign: "center" }}>Buildings</h4>
      {Object.keys(buildings).map(buildingId => (
        <BuildingEntry
          key={buildingId}
          buildingId={buildingId}
          buildings={buildings}
        />
      ))}
    </div>
  );
};
