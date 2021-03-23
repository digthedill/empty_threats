import Stripe from 'stripe'
const stripe = new Stripe(process.env.STRIPE_SECRET)
import { gql } from 'graphql-request'

import { graphCmsMutationClient } from '../../lib/graphCmsClient'

export default async (req, res) => {
  const event = req.body

  const session = await stripe.checkout.sessions.retrieve(
    event.data.object.id,
    {
      expand: ['line_items.data.price.product', 'customer']
    }
  )
  const line_items = session.line_items.data
  const customer = session.customer

  // // create order and order items in GraphCMS
  const order = await graphCmsMutationClient.request(
    gql`
      mutation CreateOrderMutation($data: OrderCreateInput!) {
        createOrder(data: $data) {
          id
          email
          total
        }
      }
    `,
    {
      data: {
        email: customer.email,
        total: session.amount_total,
        stripeCheckoutId: session.id,
        orderItems: {
          create: line_items.map((li) => ({
            quantity: li.quantity,
            total: li.amount_total,
            product: {
              connect: {
                slug: li.price.product.metadata.productSlug
              }
            }
          }))
        }
      }
    }
  )
  console.log(order)

  // update product info to flip availability

  const updateAvailability = await graphCmsMutationClient.request(
    gql`
      mutation UpdateProductMutation(
        $where: ProductWhereUniqueInput!
        $data: ProductUpdateInput!
      ) {
        updateProduct(where: $where, data: $data) {
          name
          id
        }
      }
    `,
    {
      where: {
        slug: line_items.map((li) => li.price.product.metadata.productSlug)[0]
      },
      data: {
        available: false
      }
    }
  )
  console.log(updateAvailability)

  res.json({ message: 'success' })
}
