import {Achievement} from "@/entities/Achievement";
import {Avatar} from "@mui/material";
import AchievementCard from "@/components/achievement-card/achievement-card";
import {ReactElement} from "react";

export default function KanbanSection({achievements, title, icon}: { achievements: Array<Achievement>, title: string, icon: ReactElement }): React.ReactElement {

    return (
        <div className={"flex flex-col rounded-md border-blue-400 border-8 p-3"}>
            <div className={"flex items-center"}>
                {icon}
                <h1 className="text-3xl font-bold flex grow">{title}</h1>
                <Avatar className={"flex self-end"} >{achievements.length}</Avatar>
            </div>

            <div className={"flex flex-col gap-3"}>
                {achievements?.map((item, index) => <AchievementCard key={index} achievement={item}/>) }
            </div>
        </div>
    )
}