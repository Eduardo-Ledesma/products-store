import type { APISuccessResponse, APIErrorResponse } from "@/utils/types/General"
import type { Product } from "@/utils/types/Products"

export const getProduct = async (productId: string): Promise<APISuccessResponse<Product> | APIErrorResponse> => {
    try {
        const result = await fetch(`${import.meta.env.VITE_API_URL}/products/${productId}`)
        const response = await result.json()
        return { status: 'success', data: response }
    } catch {
        return { status: 'error', message: 'Something failed while fetching the product, please refresh the page.' }
    }
}