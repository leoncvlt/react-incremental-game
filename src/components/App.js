import React from "react";

import { Buildings } from "./Buildings";
import { Upgrades } from "./Upgrades";
import { Resources } from "./Resources";
import { Clicker } from "./Clicker";
import { Achievements } from "./Achievements";

import "../styles.css";

export default function App() {
  return (
    <>
      <div className="App">
        <div style={{ textAlign: "center" }}>
          <Resources />
          <Clicker clickerId={"bunnyButton"} />
        </div>
        <div style={{ display: "flex" }}>
          <div style={{ flex: "1" }}>
            <Buildings />
          </div>
          <div style={{ flex: "1" }}>
            <Upgrades />
          </div>
          <div style={{ flex: "0.5" }}>
            <Achievements />
          </div>
        </div>
      </div>
    </>
  );
}
