/*
The default store export is a representation of the default
store stat, a.k.a. the initial store state at the start of 
a new game.
*/

import { BUILDINGS } from "../data/buildings";
import { RESOURCES } from "../data/resources";
import { UPGRADES } from "../data/upgrades";
import { CLICKERS } from "../data/clickers";
import { schema } from "./schema";
import { SHINIES } from "../data/shinies";

const STORE_KEY = "reactquest_store";

export const getInitialStore = () => {
  const saveData = localStorage.getItem(STORE_KEY);
  // if (saveData !== undefined ) {
  if (undefined !== undefined) {
    return JSON.parse(saveData);
  } else {
    const store = Object.assign({}, schema.store);

    Object.keys(CLICKERS).forEach(clickerId => {
      store.clickers[clickerId] = Object.assign({}, schema.clicker);
    });

    Object.keys(SHINIES).forEach(shinyId => {
      store.shinies[shinyId] = Object.assign({}, schema.shiny);
    });

    Object.keys(RESOURCES).forEach(resId => {
      store.resources[resId] = Object.assign({}, schema.resource);
    });

    Object.keys(BUILDINGS).forEach(buildingId => {
      if (BUILDINGS[buildingId].available) {
        store.buildings[buildingId] = Object.assign({}, schema.building);
      }
    });

    Object.keys(UPGRADES).forEach(upgradeId => {
      if (UPGRADES[upgradeId].available) {
        store.upgrades[upgradeId] = schema.upgrade;
      }
    });

    store.resources.bunnies.amount = store.resources.bunnies.total = 3000;
    // store.buildings.cage.amount = 10;

    return store;
  }
};

export const saveStore = store => {
  localStorage.setItem(STORE_KEY, JSON.stringify(store));
};
