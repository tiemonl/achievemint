import {Achievement} from "@/entities/Achievement";
import {Avatar} from "@mui/material";
import {ReactElement} from "react";
import KanbanCard from "@/components/kanban/kanban-card/kanban-card";

export default function KanbanSection({achievements, title, icon}: { achievements: Array<Achievement>, title: string, icon: ReactElement }): React.ReactElement {
    return (
        <div className={"flex flex-col rounded-md border-blue-400 border-8 p-3"}>
            <div className={"flex items-center"}>
                {icon}
                <h1 className="text-3xl font-bold flex grow">{title}</h1>
                <Avatar className={"flex self-end"} >{achievements.length}</Avatar>
            </div>

            <div className={"flex flex-col gap-3 overflow-y-auto"} style={{scrollbarWidth: "thin", scrollbarColor: "#000000 gray"}}>
                {achievements?.map((item, index) => <KanbanCard achievement={item} key={index}/> )}
            </div>
        </div>
    )
}