import { REQ } from "../constants/constants";

export const BUILDINGS = {
  cage: {
    name: "Rabbit cage",
    icon: "🏚️",
    desc: "A tiny little cage.\nEffect: Produces 1 rabbit every 10 seconds.",
    cost: [{ id: "bunnies", amount: 15 }],
    onTick: [{ id: "bunnies", op: "increase", amount: 0.1 }]
  },
  hutch: {
    name: "Rabbit hutch",
    icon: "🏠",
    desc:
      "A bit roomier than a cage, with enough space to hop around.\nEffect: Produces 1 rabbit every 2 seconds.",
    cost: [{ id: "bunnies", amount: 100 }],
    onTick: [{ id: "bunnies", op: "increase", amount: 0.5 }],
    requirements: [{ id: "bunnies", case: REQ.EARNED, amount: 100 }]
  },
  coop: {
    name: "Rabbit coop",
    icon: "🏡",
    desc:
      "A much nicer rabbit home where full bunny families can live.\nEffect: Produces 5 rabbit every 2 seconds.",
    cost: [{ id: "bunnies", amount: 600 }],
    onTick: [{ id: "bunnies", op: "increase", amount: 5 }],
    requirements: [{ id: "bunnies", case: REQ.EARNED, amount: 600 }]
  }
};
