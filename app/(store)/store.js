import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"

const useCart = create(
  persist(
    (set, get) => ({
      cart: [],
      product: {},
      openModal: false,
      isHydrated: false,
      setOpenModal: () => {
        set((state) => ({
          ...state,
          openModal: !state.openModal,
        }))
      },
      setProduct: (params) => {
        const { newProduct } = params
        set((state) => ({
          ...state,
          product: newProduct,
        }))
      },
      addItemToCart: (params) => {
        const { newItem } = params
        set((state) => {
          const existingItemIndex = state.cart.findIndex(
            (item) => item.price_id === newItem.price_id
          )
          if (existingItemIndex !== -1) {
            // If item exists, update quantity
            const updatedCart = [...state.cart]
            updatedCart[existingItemIndex].quantity += newItem.quantity
            return { ...state, cart: updatedCart }
          } else {
            // If item doesn't exist, add new item
            return { ...state, cart: [...state.cart, newItem] }
          }
        })
      },
      removeItemFromCart: (params) => {
        const { itemIndex } = params
        set((state) => ({
          ...state,
          cart: state.cart.filter((_, index) => index !== itemIndex),
        }))
      },
      updateItemQuantity: (params) => {
        const { itemIndex, newQuantity } = params
        set((state) => {
          const updatedCart = [...state.cart]
          updatedCart[itemIndex].quantity = newQuantity
          return { ...state, cart: updatedCart }
        })
      },
      emptyCart: () => {
        set((state) => ({
          ...state,
          cart: [],
        }))
      },
      setHydrated: () => set({ isHydrated: true }),
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        state.setHydrated()
      },
    }
  )
)

export default useCart
