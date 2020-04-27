import React from "react";
import { useStore } from "../context/GameContext";

import { UPGRADES } from "../data/upgrades";
import { BuyButton } from "./BuyButton";

const UpgradeEntry = ({ upgradeId, upgrades, resources }) => {
  const upgradeData = UPGRADES[upgradeId];
  const amountOwned = upgrades[upgradeId];
  return (
    <div title={upgradeData.desc}>
      <span>
        {upgradeData.icon}
        {upgradeData.name}
      </span>
      {!amountOwned && <BuyButton objectId={upgradeId} owned={amountOwned} />}
    </div>
  );
};

export const Upgrades = () => {
  // const { store, dispatch } = useContext(GameContext);
  const { upgrades } = useStore();
  return (
    <div>
      <h4 style={{ textAlign: "center" }}>Upgrades</h4>
      {Object.keys(upgrades).map(upgradeId => (
        <UpgradeEntry
          key={upgradeId}
          upgradeId={upgradeId}
          upgrades={upgrades}
        />
      ))}
    </div>
  );
};
