import { useState, useContext } from 'react'
import { FaShoppingCart } from 'react-icons/fa'
import Link from 'next/link'
import ShoppingCart from './ShoppingCart'
import CartContext from './CartContext'

// click off shopping cart component => cartOpen(false)

const Navbar = () => {
  const [cartOpen, setCartOpen] = useState(false)

  const { cart } = useContext(CartContext)

  return (
    <>
      <nav className="sticky top-0 flex justify-between items-center md:justify-around py-2 px-2 z-20 bg-black">
        <Link href="/products">
          <a className="nav-button">SHOP</a>
        </Link>

        <Link href="/commission">
          <a className="nav-button">CUSTOM</a>
        </Link>

        <a
          className="nav-button p-3 cursor-pointer flex space-x-1 items-center"
          onClick={() => setCartOpen(!cartOpen)}
        >
          {cart.length > 0 ? <p className="text-sm">{cart.length}</p> : null}
          <FaShoppingCart />
        </a>
      </nav>
      {cartOpen ? <ShoppingCart setCartOpen={setCartOpen} /> : null}
    </>
  )
}

export default Navbar
