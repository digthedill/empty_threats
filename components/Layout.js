import Head from 'next/head'
import Navbar from './Navbar'
import Hero from './HeroHead'
import Footer from './Footer'

// SEO CONTENT
// DYNAMIC TITLE RENDER

const Layout = ({ children }) => {
  return (
    <div>
      <Head>
        <title>Empty Threats</title>
      </Head>
      <Hero />
      <Navbar />
      <main className="m-4 min-h-screen">{children}</main>
      <Footer />
    </div>
  )
}

export default Layout
