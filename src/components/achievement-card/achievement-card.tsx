import React from 'react';
import {Achievement} from "@/entities/Achievement";

interface AchievementCardProps {
    achievement: Achievement;
}

export default function AchievementCard(props: AchievementCardProps): React.ReactElement {
    const backgroundColor = props.achievement.unlocked ? 'bg-green-500' : 'bg-gray-500';
    return (
    <div className={"border-4 rounded-md border-blue-400 " + backgroundColor} >
      <h3 className="font-bold">{ props.achievement.name }</h3>
      <p className="text-xs">{props.achievement.description}</p>
    </div>
  );
}