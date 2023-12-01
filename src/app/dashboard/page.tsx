import Container from "@/components/container"
import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth"
import Link from "next/link"
import { redirect } from "next/navigation"
import { TicketItem } from "./components/ticket"
import prisma from "@/lib/prisma"

export default async function Dashboard() {
  const session = await getServerSession(authOptions)

  if (!session || !session.user) {
    redirect("/")
  }

  const tickets = await prisma.ticket.findMany({
    where: {
      userId: session.user.id,
      status: "OPEN",
    },
    include: {
      customer: true,
    },
  })

  return (
    <Container>
      <main className="mt-9 mb-2">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Tickets</h1>
          <Link
            href="/dashboard/new"
            className="bg-blue-500 px-4 py-1 rounded text-white"
          >
            Open a new ticket
          </Link>
        </div>
        <table className="min-w-full my-2">
          <thead>
            <tr>
              <th className="font-medium text-left pl-2">CUSTOMER</th>
              <th className="font-medium text-left">REGISTRATION DATE</th>
              <th className="font-medium text-left">STATUS</th>
              <th className="font-medium text-left">#</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket) => (
              <TicketItem
                key={ticket.id}
                customer={ticket.customer}
                ticket={ticket}
              />
            ))}
          </tbody>
        </table>

        {tickets.length === 0 && (
          <h1 className="mt-10 text-2xl">
            It looks like you don't have any open tickets, you need to
            <span className="text-blue-500 hover:underline">
              <Link href="/dashboard/new"> register one </Link>
            </span>
            to see it here!
          </h1>
        )}
      </main>
    </Container>
  )
}
