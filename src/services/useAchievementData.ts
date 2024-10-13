import {Achievement} from "@/entities/Achievement";
import {SteamConfig} from "@/entities/SteamConfig";
import {useSteamConfig} from "@/services/useSteamConfig";

export default async function useAchievementData(): Promise<Array<Achievement>> {
    const query: SteamConfig = useSteamConfig();
    const resp = await (await fetch(`/api/achievementData?appid=${query.gameId}&steamid=${query.userId}&key=${query.apiKey}&l=en_us`)).json()

    return resp.response1.playerstats.achievements.map((entry: {
        apiname: string,
        name: string,
        description: string,
        achieved: number,
        unlocktime: number,
    } ) => {
        const gameSchema = resp.response2.game.availableGameStats.achievements.find((schema: {
            name: string,
            defaultvalue: number,
            displayName: string,
            hidden: number,
            icon: string,
            icongray: string,
        }) => {
            if (schema.name === entry.apiname) {
                return true;
            }
        });
        const achievement: Achievement = {
            name: entry.name,
            description: entry.description,
            unlocked: !!(entry.achieved),
            unlockDate: entry.unlocktime,
            icon: gameSchema.icon,
            iconGray: gameSchema.icongray
        }
        return achievement;
    });
}