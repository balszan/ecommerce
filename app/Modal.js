"use client"
import React, { useEffect, useState } from "react"
import ReactDOM from "react-dom"
import useCart from "./(store)/store"

export default function Modal() {
  const [portalRoot, setPortalRoot] = useState(null)
  const closeModal = useCart((state) => state.setOpenModal)

  useEffect(() => {
    setPortalRoot(document.getElementById("portal"))
  }, [])

  if (!portalRoot) return null

  return ReactDOM.createPortal(
    <div className="fixed top-0 left-0 w-screen h-screen z-50">
      <div onClick={closeModal} className="bg-transparent absolute inset-0">
        <div className="flex flex-col bg-white absolute right-0 top-0 h-screen w-screen sm:w-96 max-w-screen shadow-lg gap-4">
          <div className="flex items-center p-6 justify-between text-xl relative">
            <h1>Cart</h1>
            <i
              onClick={closeModal}
              className="fa-regular fa-rectangle-xmark cursor-pointer hover:opacity-60"
            ></i>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[1px] bg-slate-300"></div>
          </div>
        </div>
      </div>
    </div>,
    portalRoot
  )
}
