"use client"

import useCart from "../(store)/store"

export default function ProductPage(props) {
  const { searchParams } = props
  const { price_id } = props
  const product = useCart((state) => state.product)
  const { cost, productInfo, name, description } = product

  if (!product?.name) {
    window.location.href = "/"
  }
  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-1 md:grid-cols-1 w-full max-w-[1000px] mx-auto">
        <div>
          <img
            src={productInfo.images[0]}
            alt={name}
            className="w-full h-full object-cover"
          ></img>
        </div>
      </div>
    </div>
  )
}
