import type { Metadata } from "next"
import { Poppins } from "next/font/google"
import "./globals.css"
import { Header } from "@/components/header"
import { AuthProvider } from "@/providers/auth"
import { Toaster } from "react-hot-toast"
import { ModalProvider } from "@/providers/modal"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
})

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
          <ModalProvider>
            <Header />
            {children}
            <Toaster position="top-center" />
          </ModalProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
