import {Achievement} from "@/entities/Achievement";
import {SteamConfig} from "@/entities/SteamConfig";
import {getSteamConfig} from "@/services/getSteamConfig";

export default async function getAchievementData(args: {appId: string}): Promise<Array<Achievement>> {
    const query: SteamConfig = getSteamConfig();
    const resp = await (await fetch(`/api/achievementData?appid=${args.appId}&steamid=${query.userId}&key=${query.apiKey}&l=en_us`)).json()

    return (resp.response1.playerstats.achievements || []).map((entry: {
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