import React from "react"
import Cart from "./Cart"

const Nav = ({cartItems}) => {

    return (
        <nav className="border-gray-200 px-2 sm:px-4 py-4 bg-gray-800 sticky top-0 z-50">
            <div className="container flex flex-wrap justify-between items-center mx-auto">
                <a href="#" className="flex items-center">
                    <span className="self-center text-xl font-semibold whitespace-nowrap text-white">Knudsen Krudt</span>
                </a>

                <Cart items={cartItems}/>
            </div>
        </nav>
    )

}

export default Nav