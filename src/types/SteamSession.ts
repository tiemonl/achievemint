import {DefaultSession} from "next-auth"

interface SteamSession {
        steam?: {
            steamid?: string
        }
}

declare module "next-auth" {

    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session extends DefaultSession {
        user: SteamSession & DefaultSession["user"]
    }
}

