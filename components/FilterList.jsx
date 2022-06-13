import React, { Fragment, useEffect, useState } from 'react'
import { Dialog, Disclosure, Menu, Transition } from '@headlessui/react'
import { XIcon } from '@heroicons/react/outline'
import { ChevronDownIcon, FilterIcon, MinusSmIcon, PlusSmIcon, ViewGridIcon } from '@heroicons/react/solid'
import Image from "next/image"

import Products from "./Products.jsx"

const sortOptions = [
  { name: 'Mest Populær', href: '#', current: true },
  { name: 'Nyeste', href: '#', current: false },
  { name: 'Pris: Lav til Høj', href: '#', current: false },
  { name: 'Pris: Høj til Lav', href: '#', current: false },
]

const filters = [
  {
    id: 'color',
    name: 'Farve',
    options: [
      { value: 'white', label: 'Hvid', checked: false },
      { value: 'beige', label: 'Beige', checked: false },
      { value: 'blue', label: 'Blå', checked: false },
      { value: 'brown', label: 'Brun', checked: false },
      { value: 'green', label: 'Grøn', checked: false },
      { value: 'purple', label: 'Lilla', checked: false },
    ],
  },
  {
    id: 'category',
    name: 'Kategori',
    options: [
      { value: 'battery', label: 'Batteri', checked: false },
      { value: 'rocket', label: 'Raket', checked: false },
      { value: 'fountain', label: 'Fontæne', checked: true },
      { value: 'pipe', label: 'Bomberør', checked: false },
      { value: 'package', label: 'Pakke', checked: false },
    ],
  },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function FilterList(props) {
    const [items, setItems] = useState([])

    useEffect(() => {
        fetch("http://192.168.1.144:3002/items")
            .then(res => res.json())
            .then(json => setItems(json))
    }, [])

    useEffect(() => {
    }, [items])

    return (    
        <React.Fragment>
            <div className="relative z-10 flex items-baseline justify-between pt-12 pb-6 border-b border-gray-200">
                <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">Kartotek af Fyrværkeri</h1>

                <div className="flex items-center">
                    <Menu as="div" className="relative inline-block text-left">
                        <div>
                            <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                                Sortér
                                <ChevronDownIcon
                                className="flex-shrink-0 -mr-1 ml-1 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                                aria-hidden="true"
                                />
                            </Menu.Button>
                        </div>

                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                        >
                            <Menu.Items className="origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-2xl bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                <div className="py-1">
                                    {sortOptions.map((option) => (
                                        <Menu.Item key={option.name}>
                                        {({ active }) => (
                                            <a
                                            href={option.href}
                                            className={classNames(
                                                option.current ? 'font-medium text-gray-900' : 'text-gray-500',
                                                active ? 'bg-gray-100' : '',
                                                'block px-4 py-2 text-sm'
                                            )}
                                            >
                                            {option.name}
                                            </a>
                                        )}
                                        </Menu.Item>
                                    ))}
                                </div>
                            </Menu.Items>
                        </Transition>
                    </Menu>           
                </div>
            </div>

            <section aria-labelledby="products-heading" className="pt-6 pb-24">
                <h2 id="products-heading" className="sr-only">
                Products
                </h2>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-x-8 gap-y-10">
                    {/* Filters */}
                    <form className="hidden lg:block">
                        {filters.map((section) => (
                        <Disclosure as="div" key={section.id} className="border-b border-gray-200 py-6">
                            {({ open }) => (
                            <>
                                <h3 className="-my-3 flow-root">
                                <Disclosure.Button className="py-3 bg-white w-full flex items-center justify-between text-sm text-gray-400 hover:text-gray-500">
                                    <span className="font-medium text-gray-900">{section.name}</span>
                                    <span className="ml-6 flex items-center">
                                    {open ? (
                                        <MinusSmIcon className="h-5 w-5" aria-hidden="true" />
                                    ) : (
                                        <PlusSmIcon className="h-5 w-5" aria-hidden="true" />
                                    )}
                                    </span>
                                </Disclosure.Button>
                                </h3>
                                <Disclosure.Panel className="pt-6">
                                <div className="space-y-4">
                                    {section.options.map((option, optionIdx) => (
                                    <div key={option.value} className="flex items-center">
                                        <input
                                        id={`filter-${section.id}-${optionIdx}`}
                                        name={`${section.id}[]`}
                                        defaultValue={option.value}
                                        type="checkbox"
                                        defaultChecked={option.checked}
                                        className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                                        />
                                        <label
                                        htmlFor={`filter-${section.id}-${optionIdx}`}
                                        className="ml-3 text-sm text-gray-600"
                                        >
                                        {option.label}
                                        </label>
                                    </div>
                                    ))}
                                </div>
                                </Disclosure.Panel>
                            </>
                            )}
                        </Disclosure>
                        ))}
                    </form>

                    <div className="lg:col-span-3">
                        <div className="border-4 lg:h-full">
                            <Products products={items} mainprops={props} />
                        </div>
                    </div>
                </div>
            </section>
        </React.Fragment>
    )
}