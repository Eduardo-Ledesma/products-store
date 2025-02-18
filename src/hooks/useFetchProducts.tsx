import { useState, useEffect } from "react"
import { getProducts } from "@/api/getProducts"
import type { Product } from "@/utils/types/Products"

export const useFetchProducts = () => {
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true)
            const response = await getProducts()
            if (response.status === 'error') {
                setError(response.message)
                setLoading(false)
                return
            }
            setProducts(response.data)
            setLoading(false)
        }

        fetchProducts()
    }, [])

    return { products, loading, error }
}