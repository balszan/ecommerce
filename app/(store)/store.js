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
        set((state) => ({
          ...state,
          cart: [...state.cart, newItem],
        }))
      },
      removeItemFromCart: (params) => {
        const { itemIndex } = params
        set((state) => ({
          ...state,
          cart: state.cart.filter((_, index) => index !== itemIndex),
        }))
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
