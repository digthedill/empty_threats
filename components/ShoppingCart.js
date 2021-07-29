import { useContext, useRef } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { motion } from 'framer-motion'

import { FaShoppingCart } from 'react-icons/fa'

import CartContext from './CartContext'
import CheckoutBtn from './CheckoutBtn'
import useOutsideClick from '../hooks/useOutsideClick'
import CartItem from './CartItem'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)

const ShoppingCart = ({ cartOpen, setCartOpen }) => {
  const { cart, setCart } = useContext(CartContext)
  const ref = useRef()

  useOutsideClick(ref, () => {
    if (cartOpen) setCartOpen(false)
  })

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
      ref={ref}
      className="fixed top-20 inset-y-0 right-0 w-full
                 sm:w-3/4 md:w-1/2 xl:w-1/4 h-1/2 z-50 text-black px-2 box-shadow-2xl 
                 bg-gray-200 border-black border-4 rounder-lg"
    >
      <div className="flex items-center justify-between my-2 mb-8">
        <div className="ml-4 text-2xl text-gray-800">
          <FaShoppingCart />
        </div>
        <button
          className="mr-8 text-white font-black bg-red-500 px-4 py-1 
                  hover:bg-red-400 rounded-lg"
          onClick={() => setCartOpen(false)}
        >
          X
        </button>
      </div>
      <div className="h-full flex flex-col">
        {cart.length > 0 ? (
          <div>
            {cart.map((item) => {
              return (
                <CartItem
                  key={item.id}
                  item={item}
                  cart={cart}
                  setCart={setCart}
                />
              )
            })}
            <div className="absolute bottom-4 right-4">
              <CheckoutBtn stripePromise={stripePromise} cart={cart} />
            </div>
          </div>
        ) : (
          <>
            <h3 className="mt-8 text-2xl">So Empty ; )</h3>
            <p>Pop some merch in here</p>
          </>
        )}
      </div>
    </motion.div>
  )
}

export default ShoppingCart
