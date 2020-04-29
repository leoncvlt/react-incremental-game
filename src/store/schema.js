export const schema = {
  store: {
    game: {
      elapsedTime: 0
    },
    clickers: {},
    shinies: {},
    resources: {},
    buildings: {},
    upgrades: {},
    achievements: []
  },

  clicker: {
    clicks: 0
  },
  resource: {
    amount: 0,
    total: 0
  },
  shiny: {
    clicks: 0,
    visible: false
  },
  building: {
    amount: 0,
    total: 0
  },
  upgrade: false
};
