"use client"

import { Input } from "@/components/input"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { api } from "@/lib/api"

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
})

type FormData = z.infer<typeof schema>

export function FormTicket() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  return (
    <form className="px-4 py-6 mt-16 rounded border-2">
      <div className="mb-5">
        <label className="mb-5 font-medium text-lg">Ticket name</label>
        <Input
          register={register}
          type="text"
          placeholder="Enter the ticket name"
          name="name"
          error={errors.name?.message}
        />
      </div>
      <label className="mb-1 font-medium text-lg">Description</label>
      <textarea
        className="w-full border-2 rounded-md h-24 resize-none mb-2 px-2 py-2"
        placeholder="Describe your problem"
        id="description"
        {...register("description")}
      ></textarea>
      {errors.description?.message && (
        <p className="text-red-500 my-1">{errors.description.message}</p>
      )}
      <button
        type="submit"
        className="bg-blue-500 rounded-md w-full h-11 px-2 text-white font-bold"
      >
        Submit
      </button>
    </form>
  )
}
