import React from "react";
import { useStore } from "../context/GameContext";

import { RESOURCES } from "../data/resources";

export const Resources = () => {
  const { resources } = useStore();
  return (
    <div
      style={{ fontSize: "x-large", display: "flex", justifyContent: "center" }}
    >
      {Object.keys(resources).map(resId => {
        const resourceData = RESOURCES[resId];
        const resource = resources[resId];
        return (
          <p
            title={resourceData.desc}
            key={resId}
            style={{ padding: "0.25em" }}
          >
            {resourceData.icon} {Math.ceil(resource.amount)}
          </p>
        );
      })}
    </div>
  );
};
