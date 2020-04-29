export const actions = {
  RESOLVE_EFFECT: "resolveEffect",
  UNLOCK_OBJECT: "unlockObjecy",
  EARN_ACHIEVEMENT: "earnAchievement",
  PURCHASE_OBJECT: "purchaseObject",
  TOGGLE_SHINY: "toggleShiny"
};

export const purchaseObject = id => ({
  type: actions.PURCHASE_OBJECT,
  id
});
export const resolveEffect = (effect, delta = 1) => ({
  type: actions.RESOLVE_EFFECT,
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
