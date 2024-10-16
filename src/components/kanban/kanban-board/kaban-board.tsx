import {Achievement} from "@/entities/Achievement";
import KanbanSection from "@/components/kanban/kanban-section/kanban-section";
import LockIcon from "@mui/icons-material/Lock";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import {DndContext, DragEndEvent, useDroppable} from "@dnd-kit/core";
import {useState} from "react";

export default function KanbanBoard({achievements}: { achievements: Achievement[] }): React.ReactElement {
    const locked: Array<Achievement> = []
    const unlocked: Array<Achievement> = []
    const inProgressAchievements: Array<Achievement> = []

    // useState list of string
    const [inProgress, setInProgress] = useState<Array<string>>([]);

    achievements.forEach((achievement) => {
        if (inProgress.includes(achievement.name)) {
            inProgressAchievements.push(achievement)
        } else if (achievement.unlocked) {
            unlocked.push(achievement)
        } else {
            locked.push(achievement)
        }
    })

    const {setNodeRef} = useDroppable({
        id: 'droppable'
    });

    const handleDrop = (event: DragEndEvent) => {
        setInProgress((prev) => [...prev, event.active.id.toString()])
    }

    return (
        <div className={"flex justify-around max-h-full"}>
            <DndContext onDragEnd={handleDrop}>
                <KanbanSection achievements={locked} title={"Locked Achievements"} icon={<LockIcon/>}/>
                <div ref={setNodeRef}>
                    <KanbanSection achievements={inProgressAchievements} title={"In Progress"}
                                   icon={<SportsEsportsIcon/>}/>
                </div>
                <KanbanSection achievements={unlocked} title={"Unlocked Achievements"} icon={<LockOpenIcon/>}/>
            </DndContext>
        </div>
    );
}