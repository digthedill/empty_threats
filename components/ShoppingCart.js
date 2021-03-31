import { useContext, useRef, useCallback } from 'react'
import Transition from 'react-transition-group/Transition'
import Image from 'next/image'
import { loadStripe } from '@stripe/stripe-js'

import CartContext from './CartContext'
import CheckoutBtn from './CheckoutBtn'
import useOutsideClick from '../hooks/useOutsideClick'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)

// smooth transition for chopping cart

const ShoppingCart = ({ cartOpen, setCartOpen }) => {
  const { cart, setCart } = useContext(CartContext)
  const ref = useRef()

  useOutsideClick(ref, () => {
    if (cartOpen) setCartOpen(false)
  })

  const removeFromCart = useCallback((id) => {
    setCart(cart.filter((item) => item.id !== id))
    if (cart.length < 1) {
      setCartOpen(false)
    }
  }, [])

  // transition props:

  const duration = 1000

  const defaultStyle = {
    transition: `opacity ${duration}ms ease-in-out`,
    opacity: 0
  }
  const transitionStyles = {
    entering: { opacity: 1 },
    entered: { opacity: 1 },
    exiting: { opacity: 0 },
    exited: { opacity: 0 }
  }

  return (
    <Transition in={cartOpen} timeout={duration} classNames={'slide'}>
      {(state) => (
        <div
          className="relative  flex justify-end"
          style={{
            ...defaultStyle,
            ...transitionStyles[state]
          }}
        >
          <div
            ref={ref}
            className="fixed top-20 inset-y-0 right-0 w-full sm:w-3/4 md:w-1/2 xl:w-1/4 h-1/2 m-0 z-50 bg-green-900 shadow-lg px-2"
          >
            <div className="flex justify-between my-2">
              <h1>CART</h1>
              <button
                className="mr-8 text-white bg-red-500 px-4 py-1 hover:bg-red-800"
                onClick={() => setCartOpen(false)}
              >
                X
              </button>
            </div>
            <div className="h-full flex flex-col">
              {cart.length > 0 ? (
                <div>
                  {cart.map((item, i) => {
                    return (
                      <div
                        key={i}
                        className="flex justify-between mx-4 items-center space-x-10 mb-1"
                      >
                        <div className="flex space-x-1">
                          <Image
                            src={item.images[0].url}
                            width={75}
                            height={75}
                            className="object-contain"
                          />
                          <div>
                            <p>{item.name}</p>
                            <p>{item.formattedPrice}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="border px-1 hover:bg-red-500"
                        >
                          Remove
                        </button>
                      </div>
                    )
                  })}
                  <div className="absolute bottom-4 right-4">
                    <CheckoutBtn stripePromise={stripePromise} cart={cart} />
                  </div>
                </div>
              ) : (
                <>
                  <h1 className="mt-8">So Empty ;)</h1>
                  <p>Pop some merch in here</p>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </Transition>
  )
}

export default ShoppingCart
