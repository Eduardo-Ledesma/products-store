import { useState, useEffect } from "react"
import { getProduct } from "@/api/getProduct"
import type { Product } from "@/utils/types/Products"

export const useFetchProduct = (productId: string | undefined) => {
    const [product, setProduct] = useState<Product | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    const isValidId = (value: string) => {
        const regex = /^[0-9]*$/
        return regex.test(value)
    }

    useEffect(() => {
        if (productId === undefined || !isValidId(productId)) {
            setError('Invalid product ID')
            setLoading(false)
            return
        }

        const fetchProduct = async () => {
            setLoading(true)
            const response = await getProduct(productId)
            if (response.status === 'error') {
                setError(response.message)
                setLoading(false)
                return
            }
            setProduct(response.data)
            setLoading(false)
        }

        fetchProduct()
    }, [productId])

    return { product, loading, error }
}