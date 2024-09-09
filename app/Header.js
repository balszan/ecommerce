"use client"

import React, { useEffect, useState } from "react"
import Link from "next/link"
import useCart from "./(store)/store"
import Modal from "./Modal"

export default function Header() {
  const [cartState, setCartState] = useState({
    items: [],
    totalQuantity: 0,
    isOpen: false,
  })

  const { cart, openModal, setOpenModal } = useCart()

  useEffect(() => {
    const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0)
    setCartState({
      items: cart,
      totalQuantity,
      isOpen: openModal,
    })
  }, [cart, openModal])

  const handleOpenModal = () => {
    setOpenModal()
  }

  return (
    <header className="sticky top-0 p-6 bg-white shadow-md z-50 text-2xl flex item-center justify-between">
      <Link href="/">
        <h1 className="hover:scale-110 cursor-pointer font-bold">FoodShop</h1>
      </Link>
      {cartState.isOpen && <Modal />}
      <div
        onClick={handleOpenModal}
        className="cursor-pointer group relative grid place-items-center"
      >
        {cartState.totalQuantity > 0 && (
          <div
            className="absolute top-0 right-0 bg-amber-400 text-white
             rounded-full aspect-square h-6 grid place-items-center
              -translate-y-1/2 translate-x-1/2 pointer-events-none"
          >
            <p className="text-sm">{cartState.totalQuantity}</p>
          </div>
        )}
        <i className="fa-solid fa-cart-shopping cursor-pointer group-hover:text-slate-400"></i>
      </div>
    </header>
  )
}
