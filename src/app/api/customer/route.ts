import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"
import { authOptions } from "@/lib/auth"
import prisma from "@/lib/prisma"

//Deleting customers
export async function DELETE(req: Request) {
  const session = await getServerSession(authOptions)

  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { searchParams } = new URL(req.url)

  const userId = searchParams.get("id")

  if (!userId) {
    return NextResponse.json(
      { error: "Failure when trying to delete a customer" },
      { status: 400 }
    )
  }

  const findTickets = await prisma.ticket.findFirst({
    where: {
      customerId: userId,
    },
  })

  if (findTickets) {
    return NextResponse.json(
      { error: "Failure when trying to delete a customer" },
      { status: 400 }
    )
  }
}

//Registering customers
export async function POST(req: Request) {
  const session = await getServerSession(authOptions)

  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { name, email, phone, address, userId } = await req.json()

  try {
    await prisma.customer.create({
      data: { name, email, phone, address: address ? address : "", userId },
    })
    return NextResponse.json({ message: "Customer successfully registered!" })
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to register a new customer" },
      { status: 400 }
    )
  }
}
