import React from "react";
import ReactDOM from "react-dom";

import App from "./components/App";
import { GameProvider } from "./context/GameContext";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <GameProvider>
      <App />
    </GameProvider>
  </React.StrictMode>,
  rootElement
);
