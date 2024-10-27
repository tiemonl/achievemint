'use client'

import {SteamConfig} from "@/entities/SteamConfig";
import {useLocalStorage} from "@/hooks/useLocalStorage";

export function getSteamConfig(): SteamConfig {
    const retVal: SteamConfig = {
        userId: "placeholder",
        apiKey: "placeholder"
    }

    Object.keys(retVal).map((key) => useLocalStorage(key)).forEach(
        ({getValue, setValue, storageKey}) => {
            const configDictionary: Record<string, string> = retVal as unknown as Record<string, string>;
            configDictionary[storageKey] = getValue() || '';
            setValue(configDictionary[storageKey]);
        }
    )

    return retVal;
}