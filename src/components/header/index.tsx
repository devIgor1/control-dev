"use client"

import { FiUser, FiLogOut, FiLoader, FiLogIn } from "react-icons/fi"
import Link from "next/link"
import { signIn, signOut, useSession } from "next-auth/react"

export function Header() {
  const { status, data } = useSession()

  async function handleLogin() {
    await signIn()
  }

  async function handleLogout() {
    await signOut()
  }

  return (
    <header className="w-full flex items-center px-2 py-4 bg-white h-20 shadow-lg">
      <div className="w-full flex items-center justify-between max-w-7xl mx-auto">
        <Link href="/">
          <h1 className="font-bold text-2xl pl-1 hover:tracking-wide duration-300">
            <span className="text-blue-500">Dev</span> Control
          </h1>
        </Link>

        {status === "loading" && (
          <button className="animate-spin">
            <FiLoader size={26} color="#4b5563" />
          </button>
        )}

        {status === "unauthenticated" && (
          <button className="flex items-center gap-2" onClick={handleLogin}>
            Sign in <FiLogIn size={26} />
          </button>
        )}

        {status === "authenticated" && (
          <div className="flex items-center gap-5">
            <Link className="flex items-center gap-2" href="/dashboard">
              <FiUser size={26} color="#4b5563" />
              <p>{data.user.name}</p>
            </Link>
            <button onClick={handleLogout}>
              <FiLogOut size={26} color="#dc143c" />
            </button>
          </div>
        )}
      </div>
    </header>
  )
}
