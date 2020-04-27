import { CLICKERS } from "../data/clickers";
import { BUILDINGS } from "../data/buildings";
import { UPGRADES } from "../data/upgrades";

import { resolveEffect, unlockObject } from "./actions";
import { checkRequirement } from "../modules/requirement";

import cloneDeep from "lodash.clonedeep";
import { ACHIEVEMENTS } from "../data/achievements";

/* 
Middlewares are functions that can run mutations and / or
add side effects to arguments before passing them to the
appropriate dispatch
*/

const applyEffect = (source, destination) => {
  switch (source.op) {
    case "increase":
      destination.forEach(effect => (effect.amount += source.amount));
      break;
    case "multiply":
      destination.forEach(effect => (effect.amount += source.amount));
      break;
    default:
      break;
  }
};

export const doClick = ({ store, dispatch }, clickerId) => {
  let upgradedClicker = cloneDeep(CLICKERS[clickerId]);

  dispatch(
    resolveEffect({
      id: clickerId,
      target: "clicks",
      op: "increase",
      amount: 1
    })
  );

  // augment the clicker's effects by any upgrade needed
  Object.keys(store.upgrades).forEach(upgradeId => {
    if (store.upgrades[upgradeId] > 0) {
      UPGRADES[upgradeId].effects.forEach(effect => {
        if (effect.id === clickerId) {
          applyEffect(effect, upgradedClicker.onClick);
        }
      });
    }
  });

  upgradedClicker.onClick.forEach(effect => {
    dispatch(resolveEffect(effect));
  });
};

const checkIfObjectUnlocked = ({ store, dispatch }, data, objectStore) => {
  // Go through each defition
  Object.keys(data).forEach(objectId => {
    // check if the player already unlocked the object
    const owned = Array.isArray(objectStore)
      ? objectStore.includes(objectId)
      : objectId in objectStore;
    if (!owned) {
      let unlocked = true;
      const objectData = data[objectId];
      // if not, go through all the object's requirements
      // and check whether they are satisfied or not
      if (objectData.requirements) {
        objectData.requirements.forEach(req => {
          unlocked = checkRequirement(store, req);
        });
      }
      if (unlocked) {
        dispatch(unlockObject(objectId));
      }
    }
  });
};

export const doTick = ({ store, dispatch }, delta) => {
  // clone the buildings schema, keep only the 'onTick' property
  // so we can mutate it if necessary
  // TODO keep only useful properties
  let upgradedBuildings = Object.assign({}, BUILDINGS);

  // apply upgrades to the buildings' effects
  // TODO

  // calculate the earning rate for each owned building
  Object.keys(store.buildings).forEach(buildingId => {
    const storedBuilding = store.buildings[buildingId];
    if (storedBuilding > 0) {
      const building = upgradedBuildings[buildingId];
      building.onTick.forEach(effect => {
        dispatch(resolveEffect(effect, delta * storedBuilding));
      });
    }
  });

  // check if any building, upgrade or achievement has been unlocked
  checkIfObjectUnlocked({ store, dispatch }, BUILDINGS, store.buildings);
  checkIfObjectUnlocked({ store, dispatch }, UPGRADES, store.upgrades);
  checkIfObjectUnlocked({ store, dispatch }, ACHIEVEMENTS, store.achievements);
};
