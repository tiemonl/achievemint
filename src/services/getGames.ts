import {Game} from "@/entities/Game";
import {SessionContextValue} from "next-auth/react";

export default async function getGames(session: SessionContextValue): Promise<Array<Game>> {
    const steamId = (session.data?.user as unknown)?.steam.steamid
    const response = await fetch(`/api/games?&steamid=${steamId}`);
    return (await response.json()).games;
}
