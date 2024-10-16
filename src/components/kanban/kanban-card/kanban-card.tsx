import {Achievement} from "@/entities/Achievement";
import {useDraggable} from "@dnd-kit/core";
import AchievementCard from "@/components/achievement-card/achievement-card";
import {CSS} from "@dnd-kit/utilities";

export default function KanbanCard({achievement}: {achievement: Achievement}): React.ReactElement {
    const { attributes, listeners, setNodeRef, transform} = useDraggable({ id: achievement.name});

    const styleClass = transform ? 'opacity-50 cursor-grabbing' : '';

    return <div ref={setNodeRef} {...attributes} {...listeners} className={styleClass + ''} style={{transform: CSS.Translate.toString(transform)}}>
        <AchievementCard  achievement={achievement}/>
    </div>
}