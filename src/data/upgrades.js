import { REQ, OPS } from "../constants/constants";

export const UPGRADES = {
  // food upgrades
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
  apple: {
    name: "Apple",
    icon: "🍎",
    desc:
      "Nice pieces of juicy red apples.\nbunnies/click x1.5\nbunny production +5%",
    cost: [{ id: "bunnies", amount: 10000 }],
    effects: [
      { id: "bunnyButton", op: OPS.MULT, amount: 1.5 },
      { id: "bunnies", op: OPS.MULT, amount: 1.05 }
    ],
    requirements: [{ id: "bunnies", case: REQ.TOTAL, amount: 1000 }]
  },
  radish: {
    name: "Radish",
    icon: "🥬",
    desc:
      "Purple, crunchy, and strangely spicy.\nbunnies/click x1.5\nbunny production +5%",
    cost: [{ id: "bunnies", amount: 50000 }],
    effects: [
      { id: "bunnyButton", op: OPS.MULT, amount: 1.5 },
      { id: "bunnies", op: OPS.MULT, amount: 1.05 }
    ],
    requirements: [{ id: "bunnies", case: REQ.TOTAL, amount: 10000 }]
  },
  mint: {
    name: "Mint",
    icon: "🌿",
    desc:
      "Tasty, and gives your bunnies a lovely breath.\nbunnies/click x1.5\nbunny production +5%",
    cost: [{ id: "bunnies", amount: 100000 }],
    effects: [
      { id: "bunnyButton", op: OPS.MULT, amount: 1.5 },
      { id: "bunnies", op: OPS.MULT, amount: 1.05 }
    ],
    requirements: [{ id: "bunnies", case: REQ.TOTAL, amount: 50000 }]
  },
  chard: {
    name: "Chard",
    icon: "🍂",
    desc:
      "Broad leaves that make for a tasty salad.\nbunnies/click x1.5\nbunny production +5%",
    cost: [{ id: "bunnies", amount: 500000 }],
    effects: [
      { id: "bunnyButton", op: OPS.MULT, amount: 1.5 },
      { id: "bunnies", op: OPS.MULT, amount: 1.05 }
    ],
    requirements: [{ id: "bunnies", case: REQ.TOTAL, amount: 100000 }]
  },
  cherry: {
    name: "Cherry",
    icon: "🍒",
    desc:
      "Your bunnies look like little vampires when they start munching on these!\nbunnies/click x1.5\nbunny production +5%",
    cost: [{ id: "bunnies", amount: 1000000 }],
    effects: [
      { id: "bunnyButton", op: OPS.MULT, amount: 1.5 },
      { id: "bunnies", op: OPS.MULT, amount: 1.05 }
    ],
    requirements: [{ id: "bunnies", case: REQ.TOTAL, amount: 500000 }]
  },
  carrot: {
    name: "Carrot",
    icon: "🥕",
    desc:
      "The quintessential rabbit food! Crunchy, orange, and perfect.\nbunnies/click x2\nbunny production +10%",
    cost: [{ id: "bunnies", amount: 100000000 }],
    effects: [
      { id: "bunnyButton", op: OPS.MULT, amount: 2 },
      { id: "bunnies", op: OPS.MULT, amount: 1.1 }
    ],
    requirements: [{ id: "bunnies", case: REQ.TOTAL, amount: 1000000 }]
  },

  // building upgrades
  buildingUpgrade1: {
    name: "Sippy bottles",
    icon: "🍼",
    desc:
      "Your bunnies can drink their fill!\nEffect: rabbit cage production x2\nrabbit hutch production x2\nrabbit coop production x2",
    cost: [{ id: "bunnies", amount: 1000 }],
    effects: [
      { id: "cage", op: OPS.MULT, amount: 2 },
      { id: "hutch", op: OPS.MULT, amount: 2 },
      { id: "coop", op: OPS.MULT, amount: 2 }
    ],
    requirements: [
      [
        { id: "cage", amount: 10 },
        { id: "hutch", amount: 10 },
        { id: "coop", amount: 10 }
      ]
    ]
  },
  buildingUpgrade2: {
    name: "Prime grade hay",
    icon: "🌾",
    desc:
      "Not just for horses anymore!\nEffect: rabbit cage production x2\nrabbit hutch production x2\nrabbit coop production x2",
    cost: [{ id: "bunnies", amount: 100000 }],
    effects: [
      { id: "cage", op: OPS.MULT, amount: 2 },
      { id: "hutch", op: OPS.MULT, amount: 2 },
      { id: "coop", op: OPS.MULT, amount: 2 }
    ],
    requirements: [
      [
        { id: "cage", amount: 50 },
        { id: "hutch", amount: 50 },
        { id: "coop", amount: 50 }
      ]
    ]
  },
  buildingUpgrade3: {
    name: "Shredded newspapers",
    icon: "📰",
    desc:
      "You'd think they just poop on these, but they really enjoy reading the Sunday comics.\nEffect: rabbit cage production x2\nrabbit hutch production x2\nrabbit coop production x2",
    cost: [{ id: "bunnies", amount: 5000000 }],
    effects: [
      { id: "cage", op: OPS.MULT, amount: 2 },
      { id: "hutch", op: OPS.MULT, amount: 2 },
      { id: "coop", op: OPS.MULT, amount: 2 }
    ],
    requirements: [
      [
        { id: "cage", amount: 100 },
        { id: "hutch", amount: 100 },
        { id: "coop", amount: 100 }
      ]
    ]
  },

  // golden carrots upgrades
  goldenTouch: {
    name: "Golden Touch",
    icon: "👆🏼",
    desc:
      "The delicate art of finding vegetables made of precious metals.\n1% chance of gaining 1 golden carrot per bunny click",
    cost: [{ id: "goldenCarrots", amount: 1 }],
    effects: [],
    requirements: [{ id: "goldenCarrots", case: REQ.TOTAL, amount: 1 }]
  },
  rabbitHaste: {
    name: "Rabbit's haste",
    icon: "⏰",
    desc:
      "I'm late! I'm late! For a very important date!\nLucky bunnies appear 30% more often",
    cost: [{ id: "goldenCarrots", amount: 5 }],
    effects: [],
    requirements: [{ id: "goldenCarrots", case: REQ.TOTAL, amount: 1 }]
  },
  independenceDay: {
    name: "Independence day",
    icon: "🗽",
    desc:
      "Your bunnies are making their first step towards declaring their independence from the oppressive shackles of pens and cages.\nUnlocks new buildings",
    cost: [{ id: "goldenCarrots", amount: 10 }],
    effects: [],
    requirements: [{ id: "goldenCarrots", case: REQ.TOTAL, amount: 5 }]
  }
};
