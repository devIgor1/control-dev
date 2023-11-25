import Container from "@/components/container"
import Link from "next/link"

export function DashboardHeader() {
  return (
    <Container>
      <header className="w-full bg-gray-900 my-4 p-3 rounded flex gap-4 text-white">
        <Link className="hover:text-zinc-400" href="/dashboard">
          Tickets
        </Link>
        <Link className="hover:text-zinc-400" href="/dashboard/customer">
          Customers
        </Link>
      </header>
    </Container>
  )
}
