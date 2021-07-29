import { useCallback } from 'react'
import Image from 'next/image'

const CartItem = ({ item, cart, setCart }) => {
  const removeFromCart = useCallback((id) => {
    setCart(cart.filter((item) => item.id !== id))
    if (cart.length < 1) {
      setCartOpen(false)
    }
  }, [])
  return (
    <div
      key={item.id}
      className="flex justify-between mx-4 items-center space-x-10 mb-1"
    >
      <div className="flex space-x-1 mb-2">
        <Image
          src={item.images[0].url}
          width={100}
          height={100}
          objectFit="cover rounded-lg"
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
}

export default CartItem
