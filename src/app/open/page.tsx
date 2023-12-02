"use client"

import { Input } from "@/components/input"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { FiSearch, FiX } from "react-icons/fi"
import { useState } from "react"
import { FormTicket } from "./components/FormTicket"
import { api } from "@/lib/api"

const schema = z.object({
  email: z
    .string()
    .email("Enter the customer email address please")
    .min(1, "Email is required"),
})

type FormData = z.infer<typeof schema>

export interface CustomerInfo {
  id: string
  name: string
}

export default function OpenTicket() {
  const [customer, setCustomer] = useState<CustomerInfo | null>(null)

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  function handleClearCustomer() {
    setCustomer(null)
    setValue("email", "")
  }

  async function handleSearchCustomer(data: FormData) {
    const response = await api.get("/api/customer", {
      params: {
        email: data.email,
      },
    })

    if (response.data === null) {
      setError("email", { type: "custom", message: "Customer not found" })
      return
    }

    setCustomer({
      id: response.data.id,
      name: response.data.name,
    })
  }

  return (
    <div className="w-full max-w-2xl mx-auto px-2">
      <h1 className="text-3xl text-center mt-24 font-medium">Open a ticket</h1>
      <main className="flex flex-col mt-4 mb-2">
        {customer ? (
          <div className="bg-slate-200 py-6 px-2 rounded border-2 flex items-center justify-between">
            <p className="text-lg">
              <strong>Selected customer: </strong>
              <span className="text-blue-500 ml-2">{customer.name}</span>
            </p>
            <button
              className="h-11 px-2 flex items-center justify-center rounded"
              onClick={handleClearCustomer}
            >
              <FiX size={28} color={"#dc143c"} />
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit(handleSearchCustomer)}>
            <div>
              <Input
                name="email"
                placeholder="Enter the customer email address please"
                type="text"
                error={errors.email?.message}
                register={register}
              />
              <button
                type="submit"
                className="w-full bg-blue-500 flex flex-row items-center justify-center gap-2 h-11 mt-2 text-white font-medium rounded active:translate-y-2 duration-300"
              >
                Search Customer <FiSearch size={28} />
              </button>
            </div>
          </form>
        )}

        {customer !== null && <FormTicket customer={customer} />}
      </main>
    </div>
  )
}
