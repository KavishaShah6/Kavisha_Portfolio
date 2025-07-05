import type React from "react"
import type { Metadata } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  title: "Kavisha Shah",
  description:
    "Innovative full-stack developer specializing in modern web technologies, 3D experiences, and scalable applications.",
  keywords: ["full stack developer", "3D web development", "React", "Three.js", "Node.js", "portfolio"],
  authors: [{ name: "Kavisha Shah" }],
  openGraph: {
    title: "Kavisha Shah",
    description: "Building digital futures, one line of code at a time.",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}>{children}</body>
    </html>
  )
}
