'use client'

import {SteamConfig} from "@/entities/SteamConfig";

export function useSteamConfig(): SteamConfig {
    const retVal: SteamConfig = {
        gameId: "GAME_ID",
        userId: "USER_ID",
        apiKey: "API_KEY"
    }

    Object.keys(retVal).forEach(
        key => {
            const configDictionary: Record<string, string> = retVal as unknown as Record<string, string>;
            configDictionary[key] = window.localStorage.getItem(key) || ''
            window.localStorage.setItem(key, configDictionary[key])
        }
    )

    return retVal;
}