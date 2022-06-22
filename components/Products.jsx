import cookieCutter from "cookie-cutter"

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Products({ filtersApplied, products, mainprops }) {
    const AddProductToCart = (product) => {
        
        if (!mainprops.cartItems.some(item => item.id == product.id)) {
            var newContent = [...mainprops.cartItems, product]
        
            mainprops.setCartItems(newContent)
            
            var id = cookieCutter.get('cartid')
            fetch(process.env.NEXT_PUBLIC_WEB_SERVER + "/carts/" + id, {
                method: "PUT",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    items: newContent
                })      
            })
                .then(() => {
                    toast.success("Vare tilføjet!")
                })
        } else {            
            toast.info("Vare er allerede i kurv!")
        }
        
    }

    return (
        <div className="bg-white">
            <div className="max-w-2xl mx-auto py-4 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
  
                <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                    {products.filter(pro => {
                        var hasFilters = filtersApplied.color.length > 0 || filtersApplied.category.length > 0
                        if (!hasFilters) return true;

                        var hasColor = filtersApplied.color.includes(pro.color)
                        var hasCategory = filtersApplied.category.includes(pro.category)

                        return hasColor || hasCategory
                    }).map((product) => (
                        <div key={product.id} className="group relative hover:bg-green-200 cursor-pointer" onClick={() => AddProductToCart(product)}>
                            <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 overflow-hidden  group-hover:opacity-75 lg:h-80 lg:aspect-none">
                                <img
                                    src={product.imageSrc}
                                    alt={product.imageAlt}
                                    className="w-full h-full object-center object-cover lg:w-full lg:h-full"
                                />
                            </div>
                            <div className="mt-4 flex justify-between">
                                <div>
                                    <h3 className="text-sm text-gray-700">
                                        <a href={product.href}>
                                            <span aria-hidden="true" className="absolute inset-0" />
                                            {product.title}
                                        </a>
                                    </h3>
                                    <p className="mt-1 text-sm text-gray-500">{product.description}</p>
                                </div>
                                <p className="text-sm font-medium text-gray-900">kr. {product.price},-</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <ToastContainer  
                position="bottom-right"
                autoClose={1500}
                hideProgressBar
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss={false}
                draggable
                pauseOnHover
            />
        </div>
    )
}