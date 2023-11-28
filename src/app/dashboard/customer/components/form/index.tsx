"use client"

import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

export function NewCustomerForm() {
  return (
    <form>
      <label>Name</label>
      <input type="text" />
    </form>
  )
}
