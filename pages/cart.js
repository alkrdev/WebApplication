import { CheckIcon, ClockIcon, QuestionMarkCircleIcon, XIcon } from '@heroicons/react/solid'
import { useEffect, useState } from 'react'

import cookieCutter from "cookie-cutter"
import { useRouter } from 'next/router'

import AmountCounter from '../components/AmountCounter'

export default function Cart() {
    const [cartProducts, setCartProducts] = useState([])
    const [fullPrice, setFullPrice] = useState();
    const router = useRouter()

    const UpdateCart = (newContent) => {
        var id = cookieCutter.get('cartid')
        fetch(process.env.NEXT_PUBLIC_WEB_SERVER + "/carts/" + id, {
            method: "PUT", // SHOULD USE DELETE METHOD
            headers: {
                "Content-type": "application/json"
            },

            body: JSON.stringify({
                items: newContent ?? cartProducts
            })      
        })
    }

    const DeleteProductFromCart = (elm) => {
        var newContent = cartProducts.filter(p => p.id !== elm.id)
        UpdateCart(newContent)
        setCartProducts(newContent)
    }

    useEffect(() => {
        setFullPrice(cartProducts.reduce((prev, curr) => prev + (curr.amount * curr.price), 0))
    }, [cartProducts])

    const inc = (pro) => {
        var newCart = cartProducts.map(pr => {
            if (pr.id === pro.id) {
                pr.amount++;
            }

            return pr
        })
        
        setCartProducts(newCart)
        UpdateCart(newCart)
    }

    const dec = (pro) => {
        if (pro.amount < 2) return;
        var newCart = cartProducts.map(pr => {
            if (pr.id === pro.id) {
                pr.amount--;
            }

            return pr
        })
        
        setCartProducts(newCart)
        UpdateCart(newCart)
    }

    useEffect(() => {        
        var id = cookieCutter.get('cartid')

        if (id !== undefined) {
            fetch(process.env.NEXT_PUBLIC_WEB_SERVER + "/carts/" + id)
                .then(async res => {
                    if (res.status == 401) {
                        router.back();
                    } else {
                        var json = await res.json()
                        setCartProducts(json.content)
                    }
                })
        } else {            
            router.push("/")
        }

    }, [])

    return (
        <div className="bg-white">
            <div className="max-w-2xl mx-auto pt-16 pb-24 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">Indkøbskurv</h1>
                <form className="mt-12 lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start xl:gap-x-16">
                    <section aria-labelledby="cart-heading" className="lg:col-span-7">
                        <ul role="list" className="border-t border-b border-gray-200 divide-y divide-gray-200">
                        {cartProducts ? cartProducts.map((product) => {                      
                            var capitalizedColor = product.color.charAt(0).toUpperCase() + product.color.slice(1)
                            var capitalizedCategory = product.category.charAt(0).toUpperCase() + product.category.slice(1)
                            return <li key={product.id} className="flex py-6 sm:py-10">
                                <div className="flex-shrink-0">
                                    <img
                                        src={product.imageSrc}
                                        alt={product.imageAlt}
                                        className="w-24 h-24 rounded-md object-center object-cover sm:w-48 sm:h-48"
                                    />
                                </div>

                                <div className="ml-4 flex-1 flex flex-col justify-between sm:ml-6">
                                    <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                                    <div>
                                        <div className="flex justify-between">
                                            <h3 className="text-sm font-medium text-gray-700 hover:text-gray-800">
                                                {product.title}
                                            </h3>
                                        </div>
                                        <div className="mt-1 flex text-sm">
                                            <p className="text-gray-500">{capitalizedColor}</p>
                                            {capitalizedCategory ? (
                                                <p className="ml-4 pl-4 border-l border-gray-200 text-gray-500">{capitalizedCategory}</p>
                                            ) : null}
                                        </div>
                                        <p className="mt-1 text-sm font-medium text-gray-900">kr. {product.price},-</p>
                                    </div>

                                    <div className="mt-4 sm:mt-0 sm:pr-9">
                                        <AmountCounter amount={product.amount} inc={() => inc(product)} dec={() => dec(product)}/>

                                        <div className="absolute top-0 right-0">
                                        <button type="button" className="-m-2 p-2 inline-flex text-gray-400 hover:text-gray-500" onClick={() => DeleteProductFromCart(product)}>
                                            <span className="sr-only">Remove</span>
                                            <XIcon className="h-5 w-5" aria-hidden="true" />
                                        </button>
                                        </div>
                                    </div>
                                    </div>

                                    <p className="mt-4 flex text-sm text-gray-700 space-x-2">
                                    {!product.soldOut ? (
                                        <CheckIcon className="flex-shrink-0 h-5 w-5 text-green-500" aria-hidden="true" />
                                    ) : (
                                        <ClockIcon className="flex-shrink-0 h-5 w-5 text-gray-300" aria-hidden="true" />
                                    )}

                                    <span>{!product.soldOut ? 'Tilgængelig' : `Utilgængelig`}</span>
                                    </p>
                                </div>
                            </li>
                        }) : <></>}
                        </ul>
                    </section>

                    {/* Order summary */}
                    <section
                        aria-labelledby="summary-heading"
                        className="mt-16 bg-gray-50 rounded-lg px-4 py-6 sm:p-6 lg:p-8 lg:mt-0 lg:col-span-5"
                    >
                        <h2 id="summary-heading" className="text-lg font-medium text-gray-900">
                            Købsoversigt
                        </h2>

                        <dl className="mt-6 space-y-4">
                            <div className="flex items-center justify-between">
                                <dt className="text-sm text-gray-600">Subtotal</dt>
                                <dd className="text-sm font-medium text-gray-900">kr. {fullPrice * 0.8},-</dd>
                            </div>
                            <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
                                <dt className="flex text-sm text-gray-600">Moms</dt>
                                <dd className="text-sm font-medium text-gray-900">kr. {fullPrice * 0.2},-</dd>
                            </div>
                            <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
                                <dt className="text-base font-medium text-gray-900">Total med moms</dt>
                                <dd className="text-base font-medium text-gray-900">kr. {fullPrice},-</dd>
                            </div>
                        </dl>

                        <div className="mt-6">
                            <button
                                type="submit"
                                className="w-full bg-indigo-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
                            >
                                Gå til betaling
                            </button>
                        </div>


                        <div className="mt-6 text-sm text-center">
                            <p>
                                eller{' '}
                                <a href="#" className="text-indigo-600 font-medium hover:text-indigo-500" onClick={() => router.push("/")}>
                                fortsæt med at vælge produkter<span aria-hidden="true"> &larr;</span>
                                </a>
                            </p>
                        </div>
                    </section>
                </form>
            </div>
        </div>
    )
}