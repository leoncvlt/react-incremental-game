import { REQ } from "../constants/requirement";
import { OPS } from "../constants/operations";

export const UPGRADES = {
  parsley: {
    name: "Parsley",
    icon: "☘️",
    desc:
      "A nice little supplement to your bunnies' diet.\nEffect: +1 bunny/click",
    cost: [{ id: "bunnies", amount: 15 }],
    effects: [{ id: "bunnyButton", op: OPS.INCREASE, amount: 1 }],
    requirements: [{ id: "bunnies", case: REQ.EARNED, amount: 10 }]
  },
  spinach: {
    name: "Spinach",
    icon: "🍃",
    desc:
      "Big tasty leaves, perfect for hungry bunnies.\nEffect: +1 bunny/click",
    cost: [{ id: "bunnies", amount: 200 }],
    effects: [{ id: "bunnyButton", op: OPS.INCREASE, amount: 1 }],
    requirements: [{ id: "bunnies", case: REQ.EARNED, amount: 50 }]
  }
};
