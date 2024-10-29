'use client'

import { signIn, signOut } from 'next-auth/react'

export function SignIn() {
    return <button onClick={() => signIn()}>Sign In</button>
}

export function SignOut() {
    return <button onClick={() => signOut()}>Sign Out</button>
}