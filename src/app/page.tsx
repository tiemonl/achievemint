'use client'
import getAchievementData from "@/services/useAchievementData";
import {useEffect, useState} from "react";
import {Achievement} from "@/entities/Achievement";
import {CircularProgress} from "@mui/material";
import KanbanSection from "@/components/kanban/kanban-section/kanban-section";
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';

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

  const locked: Array<Achievement> = []
  const unlocked: Array<Achievement> = []

  achievements.forEach((achievement) => {
    if (achievement.unlocked) {
      unlocked.push(achievement)
    } else {
      locked.push(achievement)
    }
  })

  return (
      <div className={"flex justify-around"}>
        <KanbanSection achievements={locked} title={"Locked Achievements"} icon={<LockIcon/>}/>
        <KanbanSection achievements={[]} title={"In Progress"} icon={<SportsEsportsIcon/>}/>
        <KanbanSection achievements={unlocked} title={"Unlocked Achievements"} icon={<LockOpenIcon/>} />
      </div>
  );
}
