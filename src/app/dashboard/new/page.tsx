import Container from "@/components/container"
import Link from "next/link"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import prisma from "@/lib/prisma"

export default async function NewTicket() {
  const session = await getServerSession(authOptions)

  if (!session || !session.user) {
    redirect("/")
  }

  const customers = await prisma.customer.findMany({
    where: {
      userId: session.user.id,
    },
  })

  async function handleRegisterTicket(formData: FormData) {
    "use server"
    const name = formData.get("name")
    const description = formData.get("description")
    const customerId = formData.get("customer")

    if (!name || !description || !customerId) {
      return
    }

    await prisma.ticket.create({
      data: {
        name: name as string,
        description: description as string,
        customerId: customerId as string,
        status: "OPEN",
        userId: session?.user.id,
      },
    })

    redirect("/dashboard")
  }

  return (
    <>
      {customers.length !== 0 ? (
        <Container>
          <main className="mt-9 mb-2">
            <div className="flex items-center gap-3">
              <Link
                href="/dashboard"
                className="text-white px-4 py-1 rounded bg-gray-900"
              >
                Back
              </Link>
              <h1 className="text-3xl font-bold">New Ticket</h1>
            </div>
            <form className="flex flex-col mt-6" action={handleRegisterTicket}>
              <label className="mb-1 font-medium text-lg">Name</label>
              <input
                className="w-full border-2 rounded-md px-2 mb-2 h-11"
                type="text"
                required
                name="name"
              />
              <label className="mb-1 font-medium text-lg">Description</label>
              <textarea
                className="w-full border-2 rounded-md px-2 mb-2 h-24 resize-none pt-2"
                required
                name="description"
              ></textarea>
              <label className="mb-1 font-medium text-lg">
                Select the customer
              </label>
              <select
                className="w-full border-2 rounded-md px-2 mb-2 h-11  bg-white"
                name="customer"
              >
                {customers.map((customer) => (
                  <option value={customer.id} key={customer.id}>
                    {customer.name}
                  </option>
                ))}
              </select>
              <button
                type="submit"
                className="bg-blue-500 text-white px-2 h-11 rounded-md my-4"
              >
                Register
              </button>
            </form>
          </main>
        </Container>
      ) : (
        <Container>
          <h1 className="text-red-500 text-lg">
            It looks like you don't have any customers registered to generate a
            ticket...
            <Link
              href="/dashboard/customer/new"
              className="text-blue-500 underline ml-2"
            >
              Register one here
            </Link>
          </h1>
        </Container>
      )}
    </>
  )
}
