import { OPS } from "../constants/constants";

export const EFFECTS = {
  luckyBunnyClick: store => {
    return { id: "goldenCarrots", op: OPS.ADD, amount: 1 };
  }
};
