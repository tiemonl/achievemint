import {getSteamConfig} from "@/services/getSteamConfig";
import {useState} from "react";

interface InProgressHook {
    inProgress: Array<string>;
    addToInProgress: (achievementName: string) => void;
    removeFromInProgress: (achievementName: string) => void;
}

function getLocalStorageValue(game: string): Array<string> {
    const value = localStorage.getItem(`kanban_${game}`);
    if (value) {
        return JSON.parse(value);
    }
    return [];
}

function setLocalStorageValue(game: string, value: Array<string>) {
    localStorage.setItem(`kanban_${game}`, JSON.stringify(value));
}

export function useInProgress(): InProgressHook {
    const steamInfo = getSteamConfig();
    if (!steamInfo?.gameId) {
        throw new Error("Steam Info not found");
    }

    const [inProgressArray, _setInProgress] = useState<Array<string>>(getLocalStorageValue(steamInfo.gameId));

    const setInProgress = (value: Array<string>) => {
        setLocalStorageValue(steamInfo.gameId, value);
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