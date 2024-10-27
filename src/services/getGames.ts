import {Game} from "@/entities/Game";
import {getSteamConfig} from "@/services/getSteamConfig";

export default async function getGames(): Promise<Array<Game>> {
    const steamInfo = getSteamConfig();
    const response = await fetch(`/api/games?&steamid=${steamInfo.userId}&key=${steamInfo.apiKey}`);
    return (await response.json()).games;
}
