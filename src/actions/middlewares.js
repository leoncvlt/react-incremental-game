import { CLICKERS } from "../data/clickers";
import { BUILDINGS } from "../data/buildings";
import { UPGRADES } from "../data/upgrades";

import { processEffect, unlockObject, toggleShiny } from "./actions";
import { checkRequirements } from "../modules/requirement";

import cloneDeep from "lodash.clonedeep";
import { ACHIEVEMENTS } from "../data/achievements";
import { OPS } from "../constants/constants";
import { SHINIES } from "../data/shinies";
import { randomRange } from "../modules/utils";
import { EFFECTS } from "../data/effects";

/* 
Middlewares are functions that can run mutations and / or
add side effects to arguments before passing them to the
appropriate dispatch
*/

const resolveEffect = (effect, store) =>
  typeof effect === "string" ? EFFECTS[effect](store) : effect;

const compoundEffect = (sourceEffect, destinationEffect) => {
  const target = sourceEffect.target || "amount";
  switch (sourceEffect.op) {
    case OPS.ADD:
      destinationEffect[target] += sourceEffect.amount;
      break;
    case OPS.MULT:
      destinationEffect[target] *= sourceEffect.amount;
      break;
    default:
      break;
  }
};

export const doClick = ({ store, dispatch }, clickerId) => {
  const clickerModel = CLICKERS[clickerId];
  let clickerEffects = [];

  // resolve all clicker's onClick effects if necessary
  clickerEffects.push(
    ...clickerModel.onClick.map(e => resolveEffect(e, store))
  );

  // dispatch an effect to increase the clickers's clicks count by 1
  dispatch(
    processEffect({
      id: clickerId,
      op: OPS.ADD,
      amount: 1
    })
  );

  // augment the clicker's effects by any upgrade needed
  Object.keys(store.upgrades).forEach(upgradeId => {
    if (store.upgrades[upgradeId] > 0) {
      UPGRADES[upgradeId].effects.forEach(upgradeEffect => {
        if (upgradeEffect.id === clickerId) {
          clickerEffects.forEach(e => compoundEffect(upgradeEffect, e));
        }
      });
    }
  });

  // dispatch all clickers's click effects
  clickerEffects.forEach(effect => {
    dispatch(processEffect(effect));
  });
};

export const doShinyClick = ({ store, dispatch }, shinyId) => {
  const shinyModel = SHINIES[shinyId];
  let shinyEffects = [];

  // resolve all shiny's onClick effects if necessary
  shinyEffects.push(...shinyModel.onClick.map(e => resolveEffect(e, store)));

  // dispatch an effect to increase the shiny's clicks count by 1
  dispatch(
    processEffect({
      id: shinyId,
      op: OPS.ADD,
      amount: 1
    })
  );

  // augment the shinie's effects by any upgrade needed
  Object.keys(store.upgrades).forEach(upgradeId => {
    if (store.upgrades[upgradeId] > 0) {
      UPGRADES[upgradeId].effects.forEach(upgradeEffect => {
        if (upgradeEffect.id === shinyId) {
          shinyEffects.forEach(e => compoundEffect(upgradeEffect, e));
        }
      });
    }
  });

  // dispatch all shinie's click effects
  shinyEffects.forEach(effect => dispatch(processEffect(effect)));

  // dispatch an event to hide the clicked shiny
  dispatch(toggleShiny(shinyId, false));
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
        unlocked = checkRequirements(store, objectData.requirements);
      }
      if (unlocked) {
        dispatch(unlockObject(objectId));
      }
    }
  });
};

export const doSpawnShiny = ({ store, dispatch }, shinyId) => {
  const shinyModel = SHINIES[shinyId];
  const spawnEffect = {
    frequency: randomRange(shinyModel.frequency.min, shinyModel.frequency.max)
  };

  // check if any upgrade influences shinies' frequency
  Object.keys(store.upgrades).forEach(upgradeId => {
    if (store.upgrades[upgradeId] > 0) {
      UPGRADES[upgradeId].effects.forEach(effect => {
        if (effect.id in store.shinies && effect.target === "frequency") {
          compoundEffect(effect, spawnEffect);
        }
      });
    }
  });

  console.log(`Next ${shinyId} will spawn in ${spawnEffect.frequency} secs.`);
  setTimeout(() => {
    dispatch(toggleShiny(shinyId, true));
  }, spawnEffect.frequency * 1000);
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
        ...building.onTick.map(effect => {
          // resolve the building's effect if necessary
          const resolvedEffect = resolveEffect(effect, store);
          return {
            ...resolvedEffect,
            buildingId: buildingId,
            amount: resolvedEffect.amount * delta * storedBuilding.amount
          };
        })
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
  const uniqueEffects = pendingEffects.reduce((uniqueEffects, effect) => {
    const currentEffect = uniqueEffects.find(e => e.id === effect.id);
    if (!currentEffect) {
      uniqueEffects.push(effect);
    } else {
      compoundEffect(effect, currentEffect);
    }
    return uniqueEffects;
  }, []);

  // finally, go through each unique effect and dispatch it
  uniqueEffects.forEach(effect => {
    // if the effect is targeting a resource, add a "rate" flag to it so
    // that the reducer sets the current prodution rate for that resource
    if (effect.id in store.resources) {
      effect = { ...effect, rate: true };
    }
    dispatch(processEffect(effect));
  });

  // check if any building, upgrade or achievement has been unlocked
  checkIfObjectUnlocked({ store, dispatch }, BUILDINGS, store.buildings);
  checkIfObjectUnlocked({ store, dispatch }, UPGRADES, store.upgrades);
  checkIfObjectUnlocked({ store, dispatch }, ACHIEVEMENTS, store.achievements);
};
