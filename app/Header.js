"use client"
import React from "react"
import Link from "next/link"
import useCart from "./(store)/store"
import Modal from "./Modal"

export default function Header() {
  const cartItems = useCart((state) => state.cart)
  const openModal = useCart((state) => state.openModal)
  const handleOpenModal = useCart((state) => state.setOpenModal)

  return (
    <header className="sticky top-0 p-6 bg-white shadow-md z-50 text-2xl flex item-center justify-between">
      {openModal && <Modal />}
      <Link href="/">
        <h1 className="hover:scale-110 cursor-pointer font-bold">FoodShop</h1>
      </Link>
      <div
        onClick={handleOpenModal}
        className="cursor-pointer group relative grid place-items-center"
      >
        {cartItems.length > 0 && (
          <div
            className="absolute top-0 right-0 bg-amber-400 text-white
           rounded-full aspect-square h-6 grid place-items-center
            -translate-y-1/2 translate-x-1/2 pointer-events-none"
          >
            <p className="text-sm">{cartItems.length}</p>
          </div>
        )}
        <i className="fa-solid fa-cart-shopping cursor-pointer group-hover:text-slate-400"></i>
      </div>
    </header>
  )
}
