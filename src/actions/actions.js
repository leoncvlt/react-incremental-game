export const actions = {
  PROCESS_EFFECT: "processEffect",
  UNLOCK_OBJECT: "unlockObjecy",
  EARN_ACHIEVEMENT: "earnAchievement",
  PURCHASE_OBJECT: "purchaseObject",
  TOGGLE_SHINY: "toggleShiny"
};

export const purchaseObject = id => ({
  type: actions.PURCHASE_OBJECT,
  id
});
export const processEffect = (effect, delta = 1) => ({
  type: actions.PROCESS_EFFECT,
  ...effect,
  delta
});
export const unlockObject = id => ({
  type: actions.UNLOCK_OBJECT,
  id
});
export const earnAchievement = id => ({
  type: actions.EARN_ACHIEVEMENT,
  id
});
export const toggleShiny = (shinyId, visible) => ({
  type: actions.TOGGLE_SHINY,
  shinyId,
  visible
});
