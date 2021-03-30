import { useContext } from 'react'
import Image from 'next/image'
import { loadStripe } from '@stripe/stripe-js'

import CartContext from './CartContext'
import CheckoutBtn from './CheckoutBtn'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)

// product thumb component
// ability to remove product
// payNow BTN

const ShoppingCart = ({ setCartOpen }) => {
  const { cart, setCart } = useContext(CartContext)

  const removeFromCart = (id, e) => {
    e.preventDefault()
    setCart(
      cart.filter((item) => {
        item.id !== id
      })
    )
    setCartOpen(false)
  }
  return (
    <div className="flex justify-end sticky top-20 z-50 mr-24 h-32">
      <div className="w-1/4 bg-green-900 rounded-lg flex justify-center">
        {cart.length > 0 ? (
          <div>
            {cart.map((item, i) => {
              return (
                <div
                  key={i}
                  className="flex justify-around items-center space-x-10"
                >
                  <Image src={item.images[0].url} width={50} height={50} />

                  <div>
                    <p>{item.name}</p>
                    <p>{item.formattedPrice}</p>
                  </div>
                  <button onClick={(e) => removeFromCart(item.id, e)}>
                    Remove
                  </button>
                </div>
              )
            })}
            <div>
              <CheckoutBtn stripePromise={stripePromise} cart={cart} />
            </div>
          </div>
        ) : (
          <h1>Cart so Empty</h1>
        )}
      </div>
    </div>
  )
}

export default ShoppingCart
