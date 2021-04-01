import Head from 'next/head'
import Navbar from './Navbar'
import Hero from './HeroHead'
import Footer from './Footer'
import { motion } from 'framer-motion'
// SEO CONTENT
// DYNAMIC TITLE RENDER

const Layout = ({ children }) => {
  return (
    <div>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Custom tie dyed garments based out of Chicago, IL"
        />
        <meta name="url" content="http://emptythreats.org" />
        <meta charSet="utf-8" />
        <meta keywords="tie dyes, chicago, custom, trippy, grateful dead" />
        <meta property="og:title" content="Empty Threats" key="title" />
        <meta property="og:url" content="https://emptythreats.org" key="url" />
        <meta property="og:image" content="" />
        <meta property="og:type" content="website" />
        <meta name="og:site_name" content="Empty Threats" />
        <meta
          property="og:description"
          content="Custom tie dyed garments based out of Chicago, IL"
        />{' '}
        <title>Empty Threats</title>
      </Head>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <Hero />
        <Navbar />
        <main className="m-4 min-h-screen">{children}</main>
        <Footer />
      </motion.div>
    </div>
  )
}

export default Layout
