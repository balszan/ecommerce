"use client"
import React from "react"
import Link from "next/link"

export default function Header() {
  return (
    <header className="sticky top-0 p-6 bg-white shadow-md z-50 text-2xl flex item-center justify-between">
      <Link href="/">
        <h1 className="hover:scale-110 cursor-pointer font-bold">FoodShop</h1>
      </Link>
      <i className="fa-solid fa-cart-shopping cursor-pointer hover:scale-110"></i>
    </header>
  )
}
