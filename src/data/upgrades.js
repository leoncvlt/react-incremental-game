import { REQ, OPS } from "../constants/constants";

export const UPGRADES = {
  parsley: {
    name: "Parsley",
    icon: "☘️",
    desc: "A nice little supplement to your bunnies' diet.\n+1 bunny/click",
    cost: [{ id: "bunnies", amount: 15 }],
    effects: [{ id: "bunnyButton", op: OPS.ADD, amount: 1 }],
    requirements: [{ id: "bunnies", case: REQ.TOTAL, amount: 10 }]
  },
  spinach: {
    name: "Spinach",
    icon: "🍃",
    desc: "Big tasty leaves, perfect for hungry bunnies.\n+1 bunny/click",
    cost: [{ id: "bunnies", amount: 200 }],
    effects: [{ id: "bunnyButton", op: OPS.ADD, amount: 1 }],
    requirements: [{ id: "bunnies", case: REQ.TOTAL, amount: 50 }]
  },
  lettuce: {
    name: "Lettuce",
    icon: "🥬",
    desc: "Frilly greens loved by all bunnies.\n+1 bunny/click",
    cost: [{ id: "bunnies", amount: 400 }],
    effects: [{ id: "bunnyButton", op: OPS.ADD, amount: 1 }],
    requirements: [{ id: "bunnies", case: REQ.TOTAL, amount: 200 }]
  },
  broccoli: {
    name: "Broccoli",
    icon: "🥦",
    desc:
      "Crunchy greens that look like little trees.\nbunnies/click x2\nbunny production +5%",
    cost: [{ id: "bunnies", amount: 3000 }],
    effects: [
      { id: "bunnyButton", op: OPS.MULT, amount: 2 },
      { id: "bunnies", op: OPS.MULT, amount: 1.05 }
    ],
    requirements: [{ id: "bunnies", case: REQ.TOTAL, amount: 1000 }]
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
