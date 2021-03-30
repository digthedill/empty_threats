import { useState } from 'react'
import '../styles/globals.css'
import Layout from '../components/Layout'

import CartContext from '../components/CartContext'

// global state

function MyApp({ Component, pageProps }) {
  const [cart, setCart] = useState([])

  if (Component.name === 'splashPage') {
    return <Component {...pageProps} />
  }
  return (
    <CartContext.Provider value={{ cart, setCart }}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </CartContext.Provider>
  )
}

export default MyApp
