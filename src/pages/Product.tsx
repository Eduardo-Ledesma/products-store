import React, { useState } from "react"
import { useParams, NavLink } from "react-router"
import { useFetchProduct } from "@/hooks/useFetchProduct"
import SkeletonCard from "@/components/SkeletonCard"
import type { Product } from "@/utils/types/Products"
import { StarIcon, ShoppingCartIcon, ArrowUturnLeftIcon } from '@heroicons/react/24/solid'
import { useGeneralStore } from '@/store/useGeneralStore'
import toast, { Toaster } from 'react-hot-toast'

const ProductData: React.FC<{ product: Product }> = ({ product }) => {
    const [quantity, setQuantity] = useState<number>(1)
    const [calculatedPrice, setCalculatedPrice] = useState<number>(product.price)
    const [adding, setAdding] = useState<boolean>(false)
    const setProduct = useGeneralStore(state => state.setProduct)

    if (!product) return null

    const handleSetQuantity = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setQuantity(Number(e.target.value))
        setCalculatedPrice(product.price * Number(e.target.value))
    }

    const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        setAdding(true)
        setTimeout(() => {
            setProduct({ id: product.id, quantity })
            setAdding(false)
            setQuantity(1)
            toast.success('Product added to cart')
        }, 1500)
    }

    return (
        <div className="w-full max-w-[1200px] flex gap-6 mx-auto mt-20">
            <div className="w-[50%] max-h-[732px] bg-white rounded-md overflow-hidden shadow-lg py-4">
                <img src={product.image} alt={product.title} className="w-fit max-h-[700px] object-contain object-center mx-auto" />
            </div>
            
            <div className="w-[50%] text-white flex flex-col gap-4">
                <h1 className="text-4xl font-semibold">{product.title}</h1>
                <p className="text-lg text-gray-100">{product.description}</p>
                
                <div className="flex items-center gap-6">
                    <p className="text-4xl font-semibold">${calculatedPrice}</p>
                    <div className="flex items-center px-2 gap-1">
                        <StarIcon className="h-4 w-4 text-white" />
                        <p className="text-white text-sm">{product.rating.rate} <span className="text-gray-300 text-xs">({product.rating.count})</span></p>
                    </div>
                </div>

                <form className="w-full flex flex-col gap-4 mt-1">
                    <div className="flex items-center gap-4">
                        <label className="font-semibold text-lg">Select quantity</label>
                        <select 
                            value={quantity} 
                            onChange={(e) => handleSetQuantity(e)}
                            className="bg-gray-800 text-white text-lg font-semibold px-4 w-20 py-2 rounded-md border border-white hover:cursor-pointer">
                            <option value="1" className="bg-gray-800">1</option>
                            <option value="2" className="bg-gray-800">2</option>
                            <option value="3" className="bg-gray-800">3</option>
                            <option value="4" className="bg-gray-800">4</option>
                            <option value="5" className="bg-gray-800">5</option>
                        </select>
                    </div>

                    <button className="bg-gradient-to-br from-amber-300 to-amber-600 text-black font-semibold px-4 py-2 flex items-center 
                        justify-center gap-2 rounded-full hover:cursor-pointer hover:from-amber-600 hover:to-amber-300 transition-colors 
                        border-none mt-1 disabled:from-amber-200 disabled:to-amber-200 disabled:cursor-not-allowed disabled:hover:from-amber-200 disabled:hover:to-amber-200"
                        type="submit"
                        onClick={handleAddToCart}
                        disabled={adding}
                    >
                        <ShoppingCartIcon className="h-6 w-6" />
                        { adding ? 'Adding...' : 'Add to cart' }
                    </button>
                </form>

                <NavLink to="/" className="w-fit mt-auto">
                    <button className="text-gray-300 text-xl font-bold px-3 py-1 flex items-center gap-2 
                        rounded-full hover:cursor-pointer transition-colors border-none hover:text-white hover:bg-gray-100/10"
                    >
                        <ArrowUturnLeftIcon className="h-6 w-6" />
                        Go back
                    </button>
                </NavLink>
            </div>
            <Toaster/>
        </div>
    )
}

const Product: React.FC = () => {
    const { productId } = useParams()
    const { product, loading, error } = useFetchProduct(productId)

    return (
        <>
            { error ? <div className="text-red-500 text-3xl text-center mt-20">{error}</div> : (
                <div className="mx-auto px-4 my-10">
                    { loading ? <SkeletonCard /> : 
                        !product ? <div className="text-red-500 text-3xl text-center">Product not found</div> :
                        <ProductData product={product} />  }
                </div>
            )}
        </>
  )
}

export default Product
