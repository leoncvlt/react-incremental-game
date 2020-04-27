/*
The default store export is a representation of the default
store stat, a.k.a. the initial store state at the start of 
a new game.
*/

import { BUILDINGS } from "../data/buildings";
import { RESOURCES } from "../data/resources";
import { UPGRADES } from "../data/upgrades";
import { CLICKERS } from "../data/clickers";

const STORE_KEY = "reactquest_store";

const store = {
  clickers: {},
  resources: {},
  buildings: {},
  upgrades: {},
  achievements: []
};

export const getInitialStore = () => {
  const saveData = localStorage.getItem(STORE_KEY);
  // return saveData !== undefined ? JSON.parse(saveData) : store;

  Object.keys(CLICKERS).forEach(clickerId => {
    store.clickers[clickerId] = {
      clicks: 0
    };
  });

  Object.keys(RESOURCES).forEach(resId => {
    store.resources[resId] = {
      amount: 0,
      earned: 0
    };
  });

  Object.keys(BUILDINGS).forEach(buildingId => {
    if (BUILDINGS[buildingId].available) {
      store.buildings[buildingId] = 0;
    }
  });

  Object.keys(UPGRADES).forEach(upgradeId => {
    if (UPGRADES[upgradeId].available) {
      store.buildings[upgradeId] = 0;
    }
  });

  return store;
};

export const saveStore = store => {
  localStorage.setItem(STORE_KEY, JSON.stringify(store));
};
