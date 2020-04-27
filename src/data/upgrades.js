import { REQ, OPS } from "../constants/constants";

export const UPGRADES = {
  parsley: {
    name: "Parsley",
    icon: "☘️",
    desc:
      "A nice little supplement to your bunnies' diet.\nEffect: +1 bunny/click",
    cost: [{ id: "bunnies", amount: 15 }],
    effects: [{ id: "bunnyButton", op: OPS.ADD, amount: 1 }],
    requirements: [{ id: "bunnies", case: REQ.TOTAL, amount: 10 }]
  },
  spinach: {
    name: "Spinach",
    icon: "🍃",
    desc:
      "Big tasty leaves, perfect for hungry bunnies.\nEffect: +1 bunny/click",
    cost: [{ id: "bunnies", amount: 200 }],
    effects: [{ id: "bunnyButton", op: OPS.ADD, amount: 1 }],
    requirements: [{ id: "bunnies", case: REQ.TOTAL, amount: 50 }]
  },

  // building upgrades
  buildingUpgrade1: {
    name: "Sippy bottles",
    icon: "🍼",
    desc:
      "Your bunnies can drink their fill!\nEffect: rabbit cage production x2\nrabbit hutch production x2\nrabbit coop production x2",
    cost: [{ id: "bunnies", amount: 1000 }],
    effects: [{ id: "cage", op: OPS.MULT, amount: 2 }],
    requirements: [{ id: "cage", amount: 10 }]
  }
};
