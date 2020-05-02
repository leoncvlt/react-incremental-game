import { REQ } from "../constants/constants";

export const checkRequirements = (store, requirements) => {
  for (const requirement of requirements) {
    if (!checkRequirement(store, requirement)) return false;
  }
  return true;
};

export const checkRequirement = (store, req) => {
  // if the requirement is an array, evaluate
  // all the requirements in it with an OR boolean operation
  if (Array.isArray(req)) {
    let result = false;
    req.forEach(r => (result = result || checkRequirement(store, r)));
    return result;
  } else if (typeof req === "object" && req != null) {
    if (req.id in store.resources) {
      const target = store.resources[req.id];
      switch (req.case) {
        case REQ.AMOUNT:
          return target.amount >= req.amount;
        case REQ.TOTAL:
          return target.total >= req.amount;
        case REQ.HAVE:
          return target.amount > 0;
        case REQ.RATE:
          return target.amount - target._prevTickAmount >= req.amount;
        default:
          return false;
      }
    }
    if (req.id in store.buildings) {
      const target = store.buildings[req.id];
      switch (req.case) {
        case REQ.AMOUNT:
          return target.amount >= req.amount;
        case REQ.TOTAL:
          return target.total >= req.amount;
        case REQ.HAVE:
          return target.amount > 0;
        default:
          return false;
      }
    }
    if (req.id in store.clickers) {
      const id = store.clickers[req.id];
      return id[req.target] >= req.amount;
    }
    if (req.id in store.upgrades) {
      const target = store.upgrades[req.id];
      switch (req.case) {
        case REQ.HAVE:
          return target === true;
        default:
          return false;
      }
    }
    if (req.case === REQ.CHANCE) {
      const chance = Math.random();
      return chance <= parseFloat(req.amount) / 100;
    }
  }
  return false;
};
