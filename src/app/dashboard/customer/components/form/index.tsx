"use client"

import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/input"
import { api } from "@/lib/api"
import { useRouter } from "next/navigation"

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z
    .string()
    .email("Enter a valid email address")
    .min(1, "Email is required"),
  phone: z.string().refine(
    (val) => {
      return (
        /^(?:\d{2}\)\s?)?\d{9}$/.test(val) ||
        /^\d{2}\s\d{9}$/.test(val) ||
        /^\d{11}$/.test(val)
      )
    },
    {
      message: "Phone number is required",
    }
  ),
  address: z.string(),
})

type FormData = z.infer<typeof schema>

export function NewCustomerForm({ userId }: { userId: string }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const router = useRouter()

  async function handleRegisterCustomer(data: FormData) {
    await api.post("/api/customer", {
      name: data.name,
      phone: data.phone,
      email: data.email,
      address: data.address,
      userId: userId,
    })

    router.replace("/dashboard/customer")
  }

  return (
    <form
      className="flex flex-col mt-6"
      onSubmit={handleSubmit(handleRegisterCustomer)}
    >
      <label className="mb-1 text-lg font-medium">Name *</label>
      <Input
        type="text"
        name="name"
        placeholder="e.g. Igor Moraes"
        error={errors.name?.message}
        register={register}
      />
      <section className="flex gap-2 my-2 flex-col sm:flex-row">
        <div className="flex-1">
          <label className="mb-1 text-lg font-medium">Phone Number *</label>
          <Input
            type="number"
            name="phone"
            placeholder="e.g. (99) 99999-9999"
            error={errors.phone?.message}
            register={register}
          />
        </div>
        <div className="flex-1">
          <label className="mb-1 text-lg font-medium">Email *</label>
          <Input
            type="email"
            name="email"
            placeholder="e.g. email@example.com"
            error={errors.email?.message}
            register={register}
          />
        </div>
      </section>
      <label className="mb-1 text-lg font-medium">Address</label>
      <Input
        type="text"
        name="address"
        placeholder="e.g. Street Address 123"
        error={errors.address?.message}
        register={register}
      />

      <button
        className="bg-blue-500 my-4 px-2 h-11 rounded text-white font-bold hover:scale-105 duration-300 "
        type="submit"
      >
        Register
      </button>
    </form>
  )
}
