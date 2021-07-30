import Stripe from 'stripe'
import { gql } from 'graphql-request'
import { graphCmsClient } from '../../lib/graphCmsClient'

const stripe = new Stripe(process.env.STRIPE_SECRET)

export default async (req, res) => {
  const { slugs } = req.body

  if (!slugs) {
    throw new Error('No Product Slug provided')
  }
  const { products } = await graphCmsClient.request(
    gql`
      query ProductPageQuery($slug: [String!]!) {
        products(where: { slug_in: $slug }) {
          name
          slug
          price
          images {
            url
          }
        }
      }
    `,
    {
      slug: slugs
    }
  )

  try {
    const session = await stripe.checkout.sessions.create({
      success_url: 'http://emptythreats.org/?id={CHECKOUT_SESSION_ID}',
      cancel_url: `http://emptythreats.org/products/`,
      mode: 'payment',
      payment_method_types: ['card'],
      shipping_rates: ['shr_1IaUwTE10EPIH4I0bKs4CTyn'],
      shipping_address_collection: {
        allowed_countries: ['US']
      },
      line_items: products.map((product) => {
        return {
          price_data: {
            unit_amount: product.price,
            currency: 'USD',
            product_data: {
              images: product.images.map((img) => img.url),
              name: product.name,
              metadata: {
                productSlug: product.slug
              }
            }
          },
          quantity: 1
        }
      })
    })

    return res.json(session)
  } catch (e) {
    res.json({ error: { message: e } })
    return
  }
}
