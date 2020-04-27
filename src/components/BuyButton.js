import React from "react";
import { useStore, useDispatch } from "../context/GameContext";

import { purchaseObject } from "../actions/actions";
import { getCostsLabel, canAfford } from "../modules/utils";

export const BuyButton = ({ objectId, owned }) => {
  const dispatch = useDispatch();
  const { resources } = useStore();
  const [canBuy, costs] = canAfford(objectId, owned, resources);
  return (
    <button
      disabled={!canBuy}
      onClick={() => dispatch(purchaseObject(objectId))}
    >
      Buy {getCostsLabel(costs)}
    </button>
  );
};
