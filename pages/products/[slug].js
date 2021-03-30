import { useContext, useState } from 'react'
import { gql } from 'graphql-request'
import Link from 'next/link'
import Image from 'next/image'
import { loadStripe } from '@stripe/stripe-js'
import PayBtn from '../../components/PayBtn'
import CartContext from '../../components/CartContext'

import { formatCurrencyValue } from '../../lib/helper'
import { graphCmsClient } from '../../lib/graphCmsClient'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)

export async function getStaticProps({ params }) {
  const { product } = await graphCmsClient.request(
    gql`
      query ProductPageQuery($slug: String!) {
        product(where: { slug: $slug }) {
          description
          name
          slug
          price
          available
          images {
            id
            url
            width
            height
          }
        }
      }
    `,
    { slug: params.slug }
  )
  return {
    props: {
      product: {
        ...product,
        formattedPrice: formatCurrencyValue({ value: product.price })
      }
    }
  }
}

export async function getStaticPaths() {
  const { products } = await graphCmsClient.request(gql`
    {
      products {
        name
        slug
      }
    }
  `)
  return {
    paths: products.map((product) => ({
      params: {
        slug: product.slug
      }
    })),
    fallback: false
  }
}

const Product = ({ product }) => {
  const [error, setError] = useState(false)
  const { cart, setCart } = useContext(CartContext)
  const { name, formattedPrice, images, slug, description, available } = product

  const addToCart = () => {
    try {
      cart.forEach((item) => {
        if (item.slug === slug) {
          throw new Error('Cannot have duplicate items in cart')
        }
      })
      setCart([...cart, product])
    } catch (e) {
      setError(true)
    }
  }

  return (
    <>
      <div className="flex flex-col items-center lg:mx-64">
        <div className="flex flex-col items-center">
          {images
            ? images.map((img) => {
                return (
                  <div key={img.id}>
                    <Image
                      src={img.url}
                      width={img.width}
                      height={img.height}
                      className="object-cover rounded-lg"
                    />
                    <br />
                  </div>
                )
              })
            : null}
        </div>
        <div className="sticky bottom-0 bg-black w-full py-4">
          {error ? (
            <div className="bg-red-600 py-2 flex justify-around items-center">
              <p>Item already in Cart!</p>
              <button className="p-1" onClick={() => setError(false)}>
                <h1>x</h1>
              </button>
            </div>
          ) : null}
          <div className="flex justify-around items-center">
            <div>
              <h1>{name}</h1>
              <p>{description}</p>
            </div>
            <button onClick={addToCart}>Add to Cart</button>
            <div>
              <p>{formattedPrice}</p>
              <PayBtn
                slug={slug}
                stripePromise={stripePromise}
                available={available}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Product
