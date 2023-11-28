import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"
import { authOptions } from "@/lib/auth"
import prisma from "@/lib/prisma"

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
