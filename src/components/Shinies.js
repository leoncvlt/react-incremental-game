import React, { useEffect, useState, useRef } from "react";
import { useStore, useDispatch } from "../context/GameContext";
import { toggleShiny } from "../actions/actions";
import { doShinyClick } from "../actions/middlewares";

const ShinyButton = ({ shinyId, store }) => {
  const dispatch = useDispatch();
  const shiny = store.shinies[shinyId];
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const speed = 0.05;
  const seed = Math.random();

  useEffect(() => {
    initialize();
    setTimeout(() => {
      dispatch(toggleShiny(shinyId, true));
    }, 3000);
    tick();
    return () => {
      cancelAnimationFrame(tick);
    };
  }, [shiny.visible]);

  const tick = () => {
    setPos({
      x: (Date.now() * speed) % window.innerWidth,
      y: (Date.now() * speed * seed) % window.innerHeight
    });
    requestAnimationFrame(tick);
  };

  const initialize = () => {
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