'use client'
import AchievementCard from "@/components/achievement-card/achievement-card";
import getAchievementData from "@/services/getAchievementData";
import {useEffect, useState} from "react";
import {Achievement} from "@/entities/Achievement";
import {CircularProgress} from "@mui/material";

export default function Home() {
  const [achievements, setAchievements] = useState<Array<Achievement> | null>(null)

  useEffect(() => {
    getAchievementData().then((resp) => {
      setAchievements(resp);
    })
  }, []);

  if (achievements == null) {
    return (
        <div className="w-full h-full flex flex-col">
          <CircularProgress size="10rem" className="m-auto"/>
        </div>
    )
  }

  return (
      <div className="flex flex-wrap justify-around  gap-2">
        {achievements?.map((item, index) => <AchievementCard key={index} achievement={item}/>) }
      </div>
  );
}
