"use client"

import { createContext, ReactNode, useState } from "react"
import { TicketProps } from "@/utils/ticket.type"
import { CustomerProps } from "@/utils/customer.type"
import { ModalTicket } from "@/components/modal"

interface ModalContextData {
  visible: boolean
  handleModalVisible: () => void
  ticket: TicketInfo | undefined
  setDetailTicket: (detail: TicketInfo) => void
}

interface TicketInfo {
  ticket: TicketProps
  customer: CustomerProps | null
}

export const ModalContext = createContext({} as ModalContextData)

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [visible, setVisible] = useState<boolean>(false)
  const [ticket, setTicket] = useState<TicketInfo>()

  function handleModalVisible() {
    setVisible(!visible)
  }

  function setDetailTicket(detail: TicketInfo) {
    setTicket(detail)
  }

  return (
    <ModalContext.Provider
      value={{ handleModalVisible, visible, ticket, setDetailTicket }}
    >
      {visible && <ModalTicket />}
      {children}
    </ModalContext.Provider>
  )
}
