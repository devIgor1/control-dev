import type { Metadata } from "next"
import { Poppins } from "next/font/google"
import "./globals.css"
import { Header } from "@/components/header"
import { AuthProvider } from "@/providers/auth"

const poppins = Poppins({ subsets: ["latin"], weight: ["800", "400"] })

export const metadata: Metadata = {
  title: "Dev Control - Your management system ",
  description: "Manage your customers and services easily",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <AuthProvider>
          <Header />
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
