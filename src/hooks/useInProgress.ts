import {useState} from "react";
import {useLocalStorage} from "./useLocalStorage";

interface InProgressHook {
    inProgress: Array<string>;
    addToInProgress: (achievementName: string) => void;
    removeFromInProgress: (achievementName: string) => void;
}


export function useInProgress(gameId: string): InProgressHook {
    if (!gameId) {
        throw new Error("I need a game id!");
    }

    const {getValue, setValue} = useLocalStorage(`kanban_${gameId}`);

    const [inProgressArray, _setInProgress] = useState<Array<string>>(JSON.parse(getValue() || '[]'));

    const setInProgress = (value: Array<string>) => {
        setValue(JSON.stringify(value));
        _setInProgress(value);
    }

    return {
        inProgress: inProgressArray,
        addToInProgress: (achievementName: string) => {
            if (inProgressArray.includes(achievementName)) {
                return;
            }

            setInProgress([...inProgressArray, achievementName]);
        },
        removeFromInProgress: (achievementName: string) => {
            setInProgress(inProgressArray.filter((item) => item !== achievementName));
        }
    }
}
