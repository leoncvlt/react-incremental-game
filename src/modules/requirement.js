import { REQ } from "../constants/constants";

export const checkRequirement = (store, req) => {
  if (req.id in store.resources) {
    const target = store.resources[req.id];
    switch (req.case) {
      case REQ.AMOUNT:
        return target.amount >= req.amount;
      case REQ.TOTAL:
        return target.earned >= req.amount;
      default:
        return false;
    }
  }
  if (req.id in store.buildings) {
    const target = store.buildings[req.id];
    return target >= req.amount;
  }
  if (req.id in store.clickers) {
    const id = store.clickers[req.id];
    return id[req.target] >= req.amount;
  }
  return false;
};
