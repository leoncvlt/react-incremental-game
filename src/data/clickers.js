import { OPS, REQ } from "../constants/constants";

export const CLICKERS = {
  bunnyButton: {
    name: "Make a bunny",
    icon: "🐰",
    desc: "Click this little bunny to get more bunnies!",
    onClick: [
      { id: "bunnies", op: OPS.ADD, amount: 1 },
      {
        id: "goldenCarrots",
        op: OPS.ADD,
        amount: 1,
        req: [
          { id: "goldenTouch", case: REQ.HAVE },
          { case: REQ.CHANCE, amount: "1%" }
        ]
      }
    ]
  }
};
