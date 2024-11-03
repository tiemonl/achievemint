import SteamProvider, { PROVIDER_ID } from 'next-auth-steam'

import type { AuthOptions } from 'next-auth'
import type { NextRequest } from 'next/server'

export function getAuthOptions(req?: NextRequest): AuthOptions {
    return {
        providers: req
            ? [
                SteamProvider(req, {
                    clientSecret: process.env.STEAM_SECRET!,
                    callbackUrl: `${process.env.NEXTAUTH_URL}/api/auth/callback`
                })
            ]
            : [],
        callbacks: {
            jwt({ token, account, profile }) {
                if (account?.provider === PROVIDER_ID) {
                    token.steam = profile
                }
                return token
            },
            session({ session, token }) {
                if ('steam' in token) {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-expect-error
                    session.user.steam = token.steam
                }
                return session
            }
        }
    }
}