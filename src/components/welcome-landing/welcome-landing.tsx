'use client'

import {
    Button,
} from "@mui/material";
import Link from "next/link";
import {useSession} from "next-auth/react";

export default function Home() {
    const session = useSession()
    const sessionData = session.data as unknown as SteamSession

    const sessionLayout = <div>
        <ul>
            <li>Session status: {session.status}</li>
            <li>
                Session data:
                <pre>{JSON.stringify(session.data, null, 2)}</pre>
            </li>

            <li>
                Session test: {sessionData?.user?.steam?.steamid}
            </li>
        </ul>
    </div>

    const linkToGamesPage = <Link href={"/games"}><Button variant={"contained"} color={"primary"}>View game
        list</Button></Link>


    return (
        <div className="w-full h-full flex flex-col items-center justify-around">
            <div className={"flex flex-col gap-4"}>
                <h1 className={"text-4xl font-bold"}>Welcome to Achievemint!</h1>
                {sessionLayout}
                {linkToGamesPage}
            </div>
        </div>
    )
}