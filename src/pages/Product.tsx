import { useParams } from "react-router"
import { useFetchProduct } from "@/hooks/useFetchProduct"
import SkeletonCard from "@/components/SkeletonCard"
import type { Product } from "@/utils/types/Products"

const ProductData: React.FC<{ product: Product }> = ({ product }) => {
    if (!product) return null

    return (
        <div>
            Hola manola
        </div>
    )
}

const Product: React.FC = () => {
    const { productId } = useParams()
    const { product, loading, error } = useFetchProduct(productId)

    return (
        <>
            { error ? <div className="text-red-500 text-3xl text-center">{error}</div> : (
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
