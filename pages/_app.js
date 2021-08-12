import { useState } from 'react'
import '../styles/globals.css'
import { useRouter } from 'next/router'
import { AnimateSharedLayout } from 'framer-motion'
import Layout from '../components/Layout'

import CartContext from '../components/CartContext'

// global state

function MyApp({ Component, pageProps }) {
  const [cart, setCart] = useState([])
  const router = useRouter()

  if (router.asPath === '/') {
    // add head and meta tags!!
    return <Component {...pageProps} />
  } else {
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
}
export default MyApp
