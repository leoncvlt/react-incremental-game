import React from "react";
import { useStore, useDispatch } from "../context/GameContext";

import { doClick } from "../actions/middlewares";
import { CLICKERS } from "../data/clickers";

export const Clicker = ({ clickerId }) => {
  // const { store, dispatch } = useContext(GameContext);
  const store = useStore();
  const dispatch = useDispatch();
  const clickerData = CLICKERS[clickerId];
  return (
    <div title={clickerData.desc}>
      <button
        style={{ padding: "1em" }}
        onClick={() => doClick({ store, dispatch }, clickerId)}
      >
        {clickerData.icon} {clickerData.name}
      </button>
    </div>
  );
};
