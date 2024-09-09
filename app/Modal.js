import React, { useEffect, useState } from "react"
import ReactDOM from "react-dom"
import useCart from "./(store)/store"
import { useRouter } from "next/navigation"

export default function Modal() {
  const [portalRoot, setPortalRoot] = useState(null)
  const closeModal = useCart((state) => state.setOpenModal)
  const cartItems = useCart((state) => state.cart)
  const openModal = useCart((state) => state.openModal)
  const isHydrated = useCart((state) => state.isHydrated)
  const removeItemFromCart = useCart((state) => state.removeItemFromCart)
  const updateItemQuantity = useCart((state) => state.updateItemQuantity)
  const router = useRouter()

  async function checkout() {
    const lineItems = cartItems.map((cartItem) => {
      return {
        price: cartItem.price_id,
        quantity: cartItem.quantity,
      }
    })
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ lineItems }),
    })
    const data = await res.json()
    router.push(data.session.url)
  }

  useEffect(() => {
    setPortalRoot(document.getElementById("portal"))
  }, [])

  if (!portalRoot || !openModal) return null

  return ReactDOM.createPortal(
    <div className="fixed top-0 left-0 w-screen h-screen z-50">
      <div onClick={closeModal} className="bg-transparent absolute inset-0">
        <div
          onClick={(e) => e.stopPropagation()}
          className="flex flex-col bg-white absolute right-0 top-0 h-screen w-screen sm:w-96 max-w-screen shadow-lg gap-4"
        >
          <div className="flex items-center p-6 justify-between text-xl">
            <h1>Cart</h1>
            <i
              onClick={closeModal}
              className="fa-regular fa-rectangle-xmark cursor-pointer hover:opacity-60"
            ></i>
          </div>
          <div className="p-4 overflow-scroll flex-1 flex flex-col gap-4">
            {!isHydrated ? (
              <p>Loading...</p>
            ) : cartItems.length === 0 ? (
              <p>There is nothing in your cart </p>
            ) : (
              <>
                {cartItems.map((cartItem, itemIndex) => {
                  return (
                    <div key={itemIndex} className="flex flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <h2>{cartItem.name}</h2>
                        <p>{(cartItem.cost * cartItem.quantity) / 100} £</p>
                      </div>
                      <div className="flex items-center justify-between items-center">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              updateItemQuantity({
                                itemIndex,
                                newQuantity: Math.max(1, cartItem.quantity - 1),
                              })
                            }}
                            className="bg-gray-200 px-2 py-1"
                          >
                            -
                          </button>
                          <input
                            type="number"
                            min="1"
                            value={cartItem.quantity}
                            onChange={(e) => {
                              e.stopPropagation()
                              updateItemQuantity({
                                itemIndex,
                                newQuantity: Math.max(
                                  1,
                                  parseInt(e.target.value)
                                ),
                              })
                            }}
                            className="w-16 text-center"
                            onClick={(e) => e.stopPropagation()}
                          />
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              updateItemQuantity({
                                itemIndex,
                                newQuantity: cartItem.quantity + 1,
                              })
                            }}
                            className="bg-gray-200 px-2 py-1"
                          >
                            +
                          </button>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            removeItemFromCart({ itemIndex: itemIndex })
                          }}
                          className="text-sm bg-red-400 text-white p-1 hover:bg-red-500 w-[100px] shadow"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  )
                })}
              </>
            )}
          </div>
          <div
            onClick={checkout}
            className="bg-amber-400 text-white text-xl m-4 p-4 uppercase grid place-items-center hover:opacity-60 cursor-pointer shadow-lg"
          >
            Checkout
          </div>
        </div>
      </div>
    </div>,
    portalRoot
  )
}
