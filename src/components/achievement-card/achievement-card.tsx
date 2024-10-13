import React from 'react';
import {Achievement} from "@/entities/Achievement";

interface AchievementCardProps {
    achievement: Achievement;
}

function UnlockDate (args:{date: number, unlocked: boolean}) {
    if (args.unlocked) {
        const formattedDate =  new Intl.DateTimeFormat("en-US", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
        }).format(args.date);
        return <p className={"text-xs"}>{formattedDate}</p>
    }
}

export default function AchievementCard(props: AchievementCardProps): React.ReactElement {
    const backgroundColor = props.achievement.unlocked ? 'bg-green-500' : 'bg-gray-500';
    return (
        <div className={"border-4 flex rounded-md border-blue-400 p-1 " + backgroundColor}>
            <img className={"w-12 h-12"}
                 src={props.achievement.unlocked ? props.achievement.icon : props.achievement.iconGray}
                 alt={"achievement icon"}/>
            <div className={"flex-col pb-2 pl-1"}>
                <h3 className="font-bold">{props.achievement.name}</h3>
                <p className="text-xs">{props.achievement.description}</p>
            </div>
            <div className={"flex-col pl-2"}>
                <UnlockDate date={props.achievement.unlockDate}
                            unlocked={props.achievement.unlocked}/>
            </div>
        </div>
    );
}