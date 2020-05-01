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
            <span style={{ fontSize: "small" }}>
              ({resource.rate > 0 ? resource.rate.toFixed(1) : "0.0"}
              /s)
            </span>
          </p>
        );
      })}
    </div>
  );
};
