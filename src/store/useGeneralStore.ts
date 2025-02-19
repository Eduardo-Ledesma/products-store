import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type SavedProduct = { id: number, quantity: number }

type GeneralStoreState = { 
    products: SavedProduct[]
}

type GeneralStoreActions = {
  setProduct: (product: SavedProduct) => void
  removeProduct: (id: number) => void
}

type GeneralStore = GeneralStoreState & GeneralStoreActions

export const useGeneralStore = create<GeneralStore>()(
    persist(
      (set) => ({
        products: [],
        setProduct: (product) => set((state) => ({ products: [...state.products, product] })),
        removeProduct: (id) => set((state) => ({ products: state.products.filter((product) => product.id !== id)}))
      }),
      { name: 'general-storage' },
    ),
)