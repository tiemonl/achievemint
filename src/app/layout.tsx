import type {Metadata} from "next";
import localFont from "next/font/local";
import "./globals.css";
import {getServerSession} from "next-auth";
import React from "react";
import {SignIn, SignOut} from "@/components/steam-buttons/buttons";
import {Providers} from "@/app/providers";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Achievemint",
  description: "Steam achievement tracking",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    const session = await getServerSession()
    return (
        <html lang="en" className={"h-full"}>
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased h-full`}>
        <header>
            {session ? <SignOut/> : <SignIn/>}
        </header>
        <Providers>{children}</Providers>
        </body>
        </html>
    )
        ;
}
