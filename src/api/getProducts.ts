import type { APISuccessResponse, APIErrorResponse } from "@/utils/types/General"
import type { Product } from "@/utils/types/Products"

export const getProducts = async (): Promise<APISuccessResponse<Product[]> | APIErrorResponse> => {
    try {
        const result = await fetch(`${import.meta.env.VITE_API_URL}/products`)
        const response = await result.json()
        return { status: 'success', data: response }
    } catch {
        return { status: 'error', message: 'Something failed while fetching the products, please refresh the page.' }
    }
}