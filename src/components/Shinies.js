import React, { useEffect, useState } from "react";
import { useStore, useDispatch } from "../context/GameContext";
import { toggleShiny } from "../actions/actions";
import { doShinyClick, doSpawnShiny } from "../actions/middlewares";
import { SHINIES } from "../data/shinies";
import { randomRange } from "../modules/utils";

const ShinyButton = ({ shinyId, store }) => {
  const dispatch = useDispatch();
  const shiny = store.shinies[shinyId];
  const shinyModel = SHINIES[shinyId];

  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [speed, setSpeed] = useState({ x: 0, y: 0 });

  useEffect(() => {
    initialize();
    if (!shiny.visible) {
      doSpawnShiny({ store, dispatch }, shinyId);
    }
    tick();
    return () => {
      cancelAnimationFrame(tick);
    };
  }, [shiny.visible]); // eslint-disable-line react-hooks/exhaustive-deps

  const tick = () => {
    setPos({
      x: (Date.now() * speed.x) % window.innerWidth,
      y: (Date.now() * speed.y) % window.innerHeight
    });
    requestAnimationFrame(tick);
  };

  const initialize = () => {
    setSpeed({
      x: randomRange(shinyModel.speed.min, shinyModel.speed.max) * 0.01,
      y: randomRange(shinyModel.speed.min, shinyModel.speed.max) * 0.01
    });
    setPos({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight
    });
  };

  return (
    <>
      {shiny.visible && (
        <button
          onClick={() => doShinyClick({ store, dispatch }, shinyId)}
          style={{
            fontSize: "x-large",
            padding: "0.5em",
            pointerEvents: "auto",
            position: "absolute",
            left: `${pos.x}px`,
            top: `${pos.y}px`
          }}
        >
          <span>🥕</span>
        </button>
      )}
    </>
  );
};

export const Shinies = () => {
  const store = useStore();
  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        width: window.innerWidth,
        height: window.innerHeight,
        pointerEvents: "none",
        overflow: "hidden"
      }}
    >
      {Object.keys(store.shinies).map(shinyId => (
        <ShinyButton key={shinyId} shinyId={shinyId} store={store} />
      ))}
    </div>
  );
};
