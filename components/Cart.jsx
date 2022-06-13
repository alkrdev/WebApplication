import React, { useEffect, useState } from "react"
import { ShoppingBagIcon } from '@heroicons/react/outline'

import Link from "next/link"

const Cart = ({ items }) => {
    const [amount, setAmount] = useState(0)


    return (
        <div className="flow-root ml-4 lg:ml-6">
            <Link href="/cart">
                <a href="#" className="group -m-2 p-2 flex items-center">
                    <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800 text-white">{items.length}</span>
                    <ShoppingBagIcon
                        className="flex-shrink-0 h-12 w-12 text-gray-400 group-hover:text-gray-500"
                        aria-hidden="true"
                    />
                    <span className="sr-only">items in cart, view bag</span>
                </a>
            </Link>
        </div>
    )
}

export default Cart;