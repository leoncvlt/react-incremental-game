import { CLICKERS } from "../data/clickers";
import { BUILDINGS } from "../data/buildings";
import { UPGRADES } from "../data/upgrades";

import { resolveEffect, unlockObject } from "./actions";
import { checkRequirement } from "../modules/requirement";

import cloneDeep from "lodash.clonedeep";
import { ACHIEVEMENTS } from "../data/achievements";
import { OPS, TGT } from "../constants/constants";
import { RESOURCES } from "../data/resources";

/* 
Middlewares are functions that can run mutations and / or
add side effects to arguments before passing them to the
appropriate dispatch
*/

const compoundEffect = (sourceEffect, destinationEffect) => {
  switch (sourceEffect.op) {
    case OPS.ADD:
      destinationEffect.amount += sourceEffect.amount;
      break;
    case OPS.MULT:
      destinationEffect.amount *= sourceEffect.amount;
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
      op: OPS.ADD,
      amount: 1
    })
  );

  // augment the clicker's effects by any upgrade needed
  Object.keys(store.upgrades).forEach(upgradeId => {
    if (store.upgrades[upgradeId] > 0) {
      UPGRADES[upgradeId].effects.forEach(effect => {
        if (effect.id === clickerId) {
          upgradedClicker.onClick.forEach(e => compoundEffect(effect, e));
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
  // round delta to one decimal digit
  delta = Math.round(delta * 10) / 10;

  // clone the buildings schema, keep only the 'onTick' property
  // so we can mutate it if necessary
  // TODO keep only useful properties
  let upgradedBuildings = Object.assign({}, BUILDINGS);

  // prepare an object to store all onTick effect in
  const pendingEffects = [];

  // go through each building and store its onTick effects,
  // taking in consideration the amount of buildings and the delta time
  // also store the buildingId it came from so we can selectively apply upgrades
  Object.keys(store.buildings).forEach(buildingId => {
    const storedBuilding = store.buildings[buildingId];
    if (storedBuilding.amount > 0) {
      const building = upgradedBuildings[buildingId];
      pendingEffects.push(
        ...building.onTick.map(effect => ({
          ...effect,
          buildingId: buildingId,
          amount: effect.amount * delta * storedBuilding.amount
        }))
      );
    }
  });

  // apply eventual upgrades to all pending effects
  Object.keys(store.upgrades).forEach(upgradeId => {
    if (store.upgrades[upgradeId] > 0) {
      UPGRADES[upgradeId].effects.forEach(effect => {
        if (effect.id in store.buildings) {
          // building effect
          pendingEffects
            .filter(e => e.buildingId === effect.id)
            .forEach(e => compoundEffect(effect, e));
        } else if (effect.id in store.resources) {
          // resource effect
          pendingEffects
            .filter(e => e.id === effect.id)
            .forEach(e => compoundEffect(effect, e));
        }
      });
    }
  });

  // reduce all pending effects to a single effect per target
  const resourcesEffects = pendingEffects.reduce((resourcesEffects, effect) => {
    const resourceEffect = resourcesEffects.find(e => e.id === effect.id);
    if (!resourceEffect) {
      resourcesEffects.push(effect);
    } else {
      compoundEffect(effect, resourceEffect);
    }
    return resourcesEffects;
  }, []);

  // finally, go through each pending effects list and dispatch them
  dispatch({ type: "tick", effects: resourcesEffects });
  // resourcesEffects.forEach(effect => dispatch(resolveEffect(effect)));

  // check if any building, upgrade or achievement has been unlocked
  checkIfObjectUnlocked({ store, dispatch }, BUILDINGS, store.buildings);
  checkIfObjectUnlocked({ store, dispatch }, UPGRADES, store.upgrades);
  checkIfObjectUnlocked({ store, dispatch }, ACHIEVEMENTS, store.achievements);
};
