import React from "react";
import { useStore } from "../context/GameContext";

import { ACHIEVEMENTS } from "../data/achievements";

const AchievementEntry = ({ achievementId }) => {
  const achievementData = ACHIEVEMENTS[achievementId];
  return (
    <span title={achievementData.name + "\n" + achievementData.desc}>
      {achievementData.icon}
    </span>
  );
};

export const Achievements = () => {
  const { achievements } = useStore();
  return (
    <div>
      <h4 style={{ textAlign: "center" }}>Achievements</h4>
      {achievements.map(achievementId => (
        <AchievementEntry key={achievementId} achievementId={achievementId} />
      ))}
    </div>
  );
};
