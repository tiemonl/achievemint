import {Achievement} from "@/entities/Achievement";
import {SteamConfig} from "@/entities/SteamConfig";
import {useSteamConfig} from "@/services/useSteamConfig";

export default async function useAchievementData(): Promise<Array<Achievement>> {
    const query: SteamConfig = useSteamConfig();
    const resp = await (await fetch(`/api/achievementData?appid=${query.gameId}&steamid=${query.userId}&key=${query.apiKey}&l=en_us`)).json()

    return resp.playerstats.achievements.map((entry: {
        name: string,
        description: string,
        achieved: number,
        unlocktime: number
    } ) => {
        const achievement: Achievement = {
            name: entry.name,
            description: entry.description,
            unlocked: !!(entry.achieved),
            unlockDate: entry.unlocktime.toString()
        }
        return achievement;
    });
}