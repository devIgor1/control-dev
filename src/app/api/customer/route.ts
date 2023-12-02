import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import prismaClient from "@/lib/prisma"
import prisma from "@/lib/prisma"

//GET ROUTE

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const customerEmail = searchParams.get("email")

  if (!customerEmail || customerEmail === "") {
    return NextResponse.json({ error: "Customer not found" }, { status: 400 })
  }

  try {
    const customer = await prisma.customer.findFirst({
      where: {
        email: customerEmail,
      },
    })

    return NextResponse.json(customer)
  } catch (error) {
    return NextResponse.json({ error: "Customer not found" }, { status: 400 })
  }
}

//DELETE ROUTE

export async function DELETE(request: Request) {
  const session = await getServerSession(authOptions)

  if (!session || !session.user) {
    return NextResponse.json({ error: "Not authorized" }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const userId = searchParams.get("id")

  if (!userId) {
    return NextResponse.json(
      { error: "Failed to delete customer." },
      { status: 400 }
    )
  }

  const findTickets = await prismaClient.ticket.findFirst({
    where: {
      customerId: userId,
    },
  })

  try {
    await prismaClient.customer.delete({
      where: {
        id: userId as string,
      },
    })

    return NextResponse.json({ message: "Customer successfully deleted!" })
  } catch (err) {
    console.log(err)
    return NextResponse.json(
      { error: "Failed to delete customer." },
      { status: 400 }
    )
  }
}

//POST ROUTE

export async function POST(request: Request) {
  const session = await getServerSession(authOptions)

  if (!session || !session.user) {
    return NextResponse.json({ error: "Not authorized" }, { status: 401 })
  }

  const { name, email, phone, address, userId } = await request.json()

  try {
    await prisma.customer.create({
      data: {
        name,
        phone,
        email,
        address: address ? address : "",
        userId: userId,
      },
    })

    return NextResponse.json({ message: "Customer Successfully Registered!" })
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to register a customer" },
      { status: 400 }
    )
  }
}
