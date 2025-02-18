import { ShoppingCartIcon } from '@heroicons/react/24/solid'

const Navbar = () => {
    return (
        <nav className="flex w-full px-14 z-50 py-3">
            <div className="flex-grow"></div>
            <button type='button' className='flex items-center gap-2 hover:cursor-pointer hover:scale-110 transition-transform'>
                <ShoppingCartIcon className="h-8 w-8 text-amber-400" />
                <p className='text-amber-400'>Cart</p>
            </button>
            
        </nav> 
    )
}

export default Navbar