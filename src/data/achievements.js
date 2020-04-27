import { REQ } from "../constants/constants";

export const ACHIEVEMENTS = {
  bunnyAchiev1: {
    name: "Run rabbit run",
    icon: "🥉",
    desc: "Have 1 bunny.",
    requirements: [{ id: "bunnies", case: REQ.AMOUNT, amount: 1 }]
  },
  clickAchiev1: {
    name: "That tickles",
    icon: "🥉",
    desc: "Click the bunny 10 times",
    requirements: [{ id: "bunnyButton", target: "clicks", amount: 10 }]
  }
};
