"use client"

import { api } from "@/lib/api"
import { CustomerProps } from "@/utils/customer.type"
import { FiFile, FiCheckSquare } from "react-icons/fi"
import { useRouter } from "next/navigation"
import { TicketProps } from "@/utils/ticket.type"
import { useContext } from "react"
import { ModalContext } from "@/providers/modal"

interface TicketItemProps {
  ticket: TicketProps
  customer: CustomerProps | null
}

export function TicketItem({ customer, ticket }: TicketItemProps) {
  const { handleModalVisible, setDetailTicket } = useContext(ModalContext)

  const router = useRouter()

  async function handleChangeStatus() {
    try {
      const response = await api.patch("/api/ticket", {
        id: ticket.id,
      })

      router.refresh()
    } catch (error) {
      console.log(error)
    }
  }

  function handleOpenModal() {
    handleModalVisible()
    setDetailTicket({
      customer: customer,
      ticket: ticket,
    })
  }

  return (
    <>
      <tr className="border-b-2 border-b-slate-200 h-16 last:border-b-0 bg-slate-100 hover:bg-gray-200 duration-300">
        <td className="text-left pl-1">{customer?.name}</td>
        <td className="text-left">
          {ticket.created_at?.toLocaleDateString("pt-br")}
        </td>
        <td className="text-left">
          <span className="bg-green-500 px-2 py-1 rounded-lg">
            {ticket.status}
          </span>
        </td>
        <td className="text-left">
          <button className="mr-3" onClick={handleChangeStatus}>
            <FiCheckSquare size={24} color="#121212" />
          </button>
          <button onClick={handleOpenModal}>
            <FiFile size={24} color="3B82F6" />
          </button>
        </td>
      </tr>
    </>
  )
}
