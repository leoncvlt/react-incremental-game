import { BUILDINGS } from "../data/buildings";
import { UPGRADES } from "../data/upgrades";

// calculate whether the player can afford the building with buildingId,
// given his resources and the building's calculated cost.
// returns a tuple with a bool and an array of the building's costs
export const canAfford = (objectId, amountOwned = 0, resources) => {
  let canBuy = true;
  const costs = calculateCost(objectId, amountOwned);
  costs.forEach(cost => {
    canBuy = resources[cost.id].amount > cost.amount;
  });
  return [canBuy, costs];
};

// given an array of a building's costs, calculates the updated costs
// for that building based on the amount owned and the increase ratio
export const calculateCost = (objectId, amountOwned = 0) => {
  if (objectId in BUILDINGS) {
    const building = BUILDINGS[objectId];
    const multiplier = Math.pow(1.15, Math.max(0, amountOwned));
    return building.cost.map(cost => ({
      id: cost.id,
      amount: Math.floor(cost.amount * multiplier)
    }));
  } else if (objectId in UPGRADES) {
    return UPGRADES[objectId].cost;
  }
};

export const getCostsLabel = costs => {
  return costs.reduce(
    (label, cost) => (label += `(${cost.amount} ${cost.id})`),
    ""
  );
};
