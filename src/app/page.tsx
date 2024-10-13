'use client'
import getAchievementData from "@/services/getAchievementData";
import {useEffect, useState} from "react";
import {Achievement} from "@/entities/Achievement";
import {CircularProgress} from "@mui/material";
import KanbanBoard from "@/components/kanban/kanban-board/kaban-board";

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

  return <KanbanBoard achievements={achievements} />
}
