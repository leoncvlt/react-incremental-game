import { actions } from "../actions/actions";
import { canAfford } from "../modules/utils";

import { BUILDINGS } from "../data/buildings";
import { UPGRADES } from "../data/upgrades";
import { ACHIEVEMENTS } from "../data/achievements";

import cloneDeep from "lodash.clonedeep";
import { OPS } from "../constants/constants";
import { schema } from "../store/schema";
import { checkRequirements } from "../modules/requirement";

// const expendResources = (resourceStore, expenses) => {
//   const updatedResources = cloneDeep(resourceStore);
//   expenses.forEach(expense => {
//     updatedResources[expense.id].amount -= expense.amount;
//   });
//   return updatedResources;
// };

export const storeReducer = (store, action) => {
  switch (action.type) {
    case actions.PURCHASE_OBJECT: {
      // purchases either a building or an upgrade
      const { id } = action;

      // get the amount owned if the object is a building to calculate
      // the costs, else use normal cost for upgrades
      let amountOwned = id in BUILDINGS ? store.buildings[id].amount : 1;
      const [canBuy, costs] = canAfford(id, amountOwned, store.resources);

      if (canBuy) {
        // if the played can afford the object,
        // subratct the resources necessary for purchase
        const expendedResources = cloneDeep(store.resources);
        costs.forEach(cost => {
          expendedResources[cost.id].amount -= cost.amount;
        });

        // increase the number of owned objects
        if (id in BUILDINGS) {
          const updatedBuildings = cloneDeep(store.buildings);
          updatedBuildings[id].amount += 1;
          return {
            ...store,
            resources: expendedResources,
            buildings: updatedBuildings
          };
        } else if (id in UPGRADES) {
          const updatedUpgrades = cloneDeep(store.upgrades);
          updatedUpgrades[id] = true;
          return {
            ...store,
            resources: expendedResources,
            upgrades: updatedUpgrades
          };
        }
      }
      return store;
    }
    case actions.UNLOCK_OBJECT: {
      // unlocks a building or upgrade for purchase,
      // or marks an achievement as achieved
      const { id } = action;
      if (id in BUILDINGS) {
        return {
          ...store,
          buildings: {
            ...store.buildings,
            [id]: Object.assign({}, schema.building)
          }
        };
      } else if (id in UPGRADES) {
        return {
          ...store,
          upgrades: {
            ...store.upgrades,
            [id]: schema.upgrade
          }
        };
      } else if (id in ACHIEVEMENTS) {
        return {
          ...store,
          achievements: [...store.achievements, id]
        };
      }
      return store;
    }

    case actions.PROCESS_EFFECT: {
      // takes an effect, applies it to the store
      const { id, op, amount, req, rate } = action;
      const { delta } = action;

      if (req) {
        if (!checkRequirements(store, req)) {
          return store;
        }
      }

      if (id in store.resources) {
        // if the resolved effect is targeting a resource, increase its amount
        const updatedResources = cloneDeep(store.resources);
        if (op === OPS.ADD) {
          updatedResources[id].amount += amount * delta;
          updatedResources[id].total += amount * delta;
        }
        if (rate) updatedResources[id].rate = amount * delta;
        return { ...store, resources: updatedResources };
      } else if (id in store.buildings) {
        //TODO
      } else if (id in store.clickers) {
        const updatedClickers = cloneDeep(store.clickers);
        if (op === OPS.ADD) {
          updatedClickers[id].clicks += amount * delta;
        }
        return { ...store, clickers: updatedClickers };
      } else if (id in store.shinies) {
        const updatedShinies = cloneDeep(store.shinies);
        if (op === OPS.ADD) {
          updatedShinies[id].clicks += amount * delta;
        }
        return { ...store, shinies: updatedShinies };
      }
      return store;
    }

    case actions.TOGGLE_SHINY: {
      const updatedShinies = cloneDeep(store.shinies);
      updatedShinies[action.shinyId].visible = action.visible;
      return { ...store, shinies: updatedShinies };
    }

    default:
      console.error(`🛑 Unknown action dispatched!`, action);
  }
};
