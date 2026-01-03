import type React from "react"
import type { Metadata } from "next"
import "./ch.css"
import { Geist, Geist_Mono } from "next/font/google"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })
export const metadata: Metadata = {
    title: "Our Story - Saturday School Foundation",
    description:
        "Discover the inspiring journey of Saturday School Foundation and how we're transforming Thai education through community participation.",
    generator: "v0.app",
    icons: {
        icon: [
            {
                url: "/icon-light-32x32.png",
                media: "(prefers-color-scheme: light)",
            },
            {
                url: "/icon-dark-32x32.png",
                media: "(prefers-color-scheme: dark)",
            },
            {
                url: "/icon.svg",
                type: "image/svg+xml",
            },
        ],
        apple: "/apple-icon.png",
    },
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
            <body className={`font-sans antialiased`}>
                {children}
            </body>
        </html>
    )
}
