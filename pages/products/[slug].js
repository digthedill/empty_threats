import { gql } from 'graphql-request'
import Link from 'next/link'
import Image from 'next/image'
import { loadStripe } from '@stripe/stripe-js'

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

const PayBtn = ({ slug, stripePromise }) => {
  const handleClick = async (e) => {
    e.preventDefault()
    const stripe = await stripePromise

    // create checkout session
    const session = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        slug: slug
      })
    }).then((res) => res.json())

    console.log(session)
    await stripe.redirectToCheckout({
      sessionId: session.id
    })
  }
  return (
    <div>
      <button onClick={handleClick}>Pay</button>
    </div>
  )
}

const Product = ({ product }) => {
  const { name, formattedPrice, images, slug } = product
  return (
    <div>
      <Link href="/">Back</Link>
      <PayBtn slug={slug} stripePromise={stripePromise} />
      <h1>{name}</h1>
      <p>{formattedPrice}</p>
      {images
        ? images.map((img) => {
            return (
              <Image
                src={img.url}
                key={img.id}
                width={img.width}
                height={img.height}
              />
            )
          })
        : null}
    </div>
  )
}

export default Product
