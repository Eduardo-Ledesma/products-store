import type { Product } from "@/utils/types/Products"
import { StarIcon, ShoppingCartIcon } from '@heroicons/react/24/solid'

interface ProductCardProps {
    product: Product
}

const productCard: React.FC<ProductCardProps> = (props) => {
    const { product } = props

    const truncateText = (text: string, length: number) => {
        return text.length > length ? text.substring(0, length) + '...' : text
    }

    return (
        <div className="border border-gray-200 rounded-md w-full max-w-[350px] h-[400px] mx-auto overflow-hidden">
            <div className="h-full max-h-[200px] w-full overflow-hidden bg-white relative">
                <img src={`${product.image}`} alt={`Image of ${product.title}`} width={348} height={200} 
                    className="h-[200px] object-center object-scale-down absolute top-0 left-0"
                />
                <div className="absolute bottom-2 left-1 bg-black bg-opacity-50 text-white px-2 text-sm rounded-full">
                    Sale
                </div>
            </div>

            <div className="bg-gray-700 h-full max-h-[200px] flex flex-col justify-between">
                <div className="flex flex-col gap-2">
                    <h3 className="text-white font-semibold p-2">{truncateText(product.title, 30)}</h3>
                    <p className="text-gray-200 p-2 text-sm">{truncateText(product.description, 80)}</p>
                </div>

                <div className="flex flex-col justify-between h-20">
                    <div className="flex items-center px-2 gap-1">
                        <StarIcon className="h-4 w-4 text-white" />
                        <p className="text-white text-sm">{product.rating.rate} <span className="text-gray-300 text-xs">({product.rating.count})</span></p>
                    </div>

                    <div className="flex justify-between items-center px-2 pb-2">
                        <p className="text-white font-semibold text-2xl">$ {product.price}</p>
                        <button className="bg-amber-300 text-black text-sm font-semibold px-3 py-1 flex items-center gap-2 
                            rounded-full hover:cursor-pointer  hover:bg-amber-400 transition-colors border-none"
                        >
                            <ShoppingCartIcon className="h-4 w-4" />
                            Buy
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default productCard