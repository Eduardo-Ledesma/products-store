import { useFetchProducts } from "@/hooks/useFetchProducts"
import ProductCard from "./ProductCard"
import SkeletonCard from "./SkeletonCard"

const CardsContainer = () => {
    const { products, loading, error } = useFetchProducts()

    

    return (
        error ? <div className="text-red-500 text-3xl text-center">{error}</div> : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-8 max-w-[1600px] mx-auto px-4 my-10">
                {
                    loading ? 
                        Array.from({ length: 8 }).map((_, index) => <SkeletonCard key={index} />) 
                    : 
                        products.map((product) => (
                            <ProductCard product={product} key={product.id} />
                        ))
                }
            </div>
        )
    )
}

export default CardsContainer