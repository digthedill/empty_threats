import Stripe from 'stripe'
import { gql } from 'graphql-request'

import { graphCmsClient } from '../../lib/graphCmsClient'

const stripe = new Stripe(process.env.STRIPE_SECRET)

export default async (req, res) => {
  const { slug } = req.body

  const { product } = await graphCmsClient.request(
    gql`
      query ProductPageQuery($slug: String!) {
        product(where: { slug: $slug }) {
          name
          slug
          price
        }
      }
    `,
    {
      slug: slug
    }
  )
  try {
    const session = await stripe.checkout.sessions.create({
      success_url: 'http://localhost:3000/?id={CHECKOUT_SESSION_ID}',
      cancel_url: `http://localhost:3000/products/${slug}`,
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            unit_amount: product.price,
            currency: 'USD',
            product_data: {
              name: product.name,
              metadata: {
                productSlug: slug
              }
            }
          },
          quantity: 1
        }
      ]
    })
    return res.json(session)
  } catch (e) {
    res.json({ error: { message: e } })
    return
  }
}
