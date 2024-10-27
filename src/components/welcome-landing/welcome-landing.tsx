'use client'

import {getSteamConfig} from "@/services/getSteamConfig";
import {Alert, Button, Link as MatLink, List, ListItem, ListItemAvatar, ListItemText} from "@mui/material";
import Link from "next/link";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import {useRouter} from "next/navigation";
import React from "react";

export default function WelcomeLanding(): React.ReactElement {
    const config = getSteamConfig();
    const appConfigured = config.apiKey && config.userId;

    const router = useRouter();

    const linkToGamesPage = <Link href={"/games"}><Button variant={"contained"} color={"primary"}>View game
        list</Button></Link>

    const appNeedsKeyAlert = <Alert severity={"info"}>
        <div>
            Please add your Steam API key & your steam ID to the application local storage to use the app. (Press
            F12 {">"} app
            tab {">"} local storage)
        </div>
        <List>
            <ListItem>
                <ListItemAvatar>
                    <AccountCircleIcon/>
                </ListItemAvatar>
                <ListItemText>
                    You can get your steam account ID in your <MatLink href={"https://store.steampowered.com/account/"}
                                                                       target={"_blank"}>steam account details</MatLink>.
                </ListItemText>
            </ListItem>
            <ListItem>
                <ListItemAvatar>
                    <VpnKeyIcon/>
                </ListItemAvatar>
                <ListItemText>
                    You can get your steam API key in the <MatLink href={"https://steamcommunity.com/dev/apikey"}
                                                                   target={"_blank"}>steam developer portal</MatLink>.
                </ListItemText>
            </ListItem>
            <ListItem>
                <Button variant={"contained"} color={"primary"} onClick={() => router.refresh()}>Confirm keys added</Button>
            </ListItem>
        </List>
    </Alert>

    const appIsReadyAlert = <Alert severity={"success"}>App is ready!</Alert>

    return (
        <div className="w-full h-full flex flex-col items-center justify-around">
            <div className={"flex flex-col gap-4"}>
                <h1 className={"text-4xl font-bold"}>Welcome to Achievemint!</h1>
                {appConfigured ? appIsReadyAlert : appNeedsKeyAlert}
                {appConfigured ? linkToGamesPage : null}
            </div>
        </div>
    )
}