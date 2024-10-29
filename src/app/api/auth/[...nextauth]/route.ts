import NextAuth from 'next-auth/next'

import type { NextRequest } from 'next/server'
import {getAuthOptions} from "@/app/auth";

import { getToken } from "next-auth/jwt"

const secret = process.env.NEXTAUTH_SECRET

async function handler(req: NextRequest, ctx: { params: { nextauth: string[] } }) {
    const token = await getToken({ req, secret, raw : true })
    console.log("JSON Web Token", token)
    return NextAuth(req, ctx, getAuthOptions(req))
}

export {
    handler as GET,
    handler as POST
}