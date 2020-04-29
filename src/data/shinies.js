import { OPS } from "../constants/constants";

export const SHINIES = {
  luckyBunny: {
    frequency: [30, 90],
    speed: [2, 8],
    onClick: [{ id: "goldenCarrots", op: OPS.ADD, amount: 1 }]
  }
};
