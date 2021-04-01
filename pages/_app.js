import { useState } from 'react'
import '../styles/globals.css'
import { AnimateSharedLayout } from 'framer-motion'
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
      <AnimateSharedLayout>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AnimateSharedLayout>
    </CartContext.Provider>
  )
}

export default MyApp
