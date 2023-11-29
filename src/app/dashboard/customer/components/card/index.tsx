"use client"

import { api } from "@/lib/api"
import { CustomerProps } from "@/utils/customer.type"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"

export function CardCustomer({ customer }: { customer: CustomerProps }) {
  const router = useRouter()

  async function handleDeleteCustomer() {
    try {
      await api.delete("/api/customer", {
        params: {
          id: customer.id,
        },
      })

      toast.success("Customer deleted successfully", {
        style: {
          border: "#3B82F6",
          padding: "16px",
          color: "#3B82F6",
        },
        iconTheme: {
          primary: "#3B82F6",
          secondary: "#FFFAEE",
        },
      })
      router.refresh()
    } catch (error) {}
  }
  return (
    <article className="flex flex-col bg-gray-100 border-2 p-2 rounded-lg gap-2 hover:scale-105 duration-300">
      <h2>
        <span className="font-bold">Name: </span>
        {customer.name}
      </h2>
      <p>
        <span className="font-bold">Email: </span>
        {customer.email}
      </p>
      <p>
        <span className="font-bold">Phone: </span>
        {customer.phone}
      </p>
      <button
        className="bg-red-500 px-4 rounded text-white mt-2 self-start"
        onClick={handleDeleteCustomer}
      >
        Delete
      </button>
    </article>
  )
}
