import { gql } from 'graphql-request'
import ProductGallery from '../../components/ProductGallery'

import { graphCmsClient } from '../../lib/graphCmsClient'
import { formatCurrencyValue } from '../../lib/helper'

export async function getStaticProps() {
  const { products } = await graphCmsClient.request(gql`
    {
      products(orderBy: available_DESC) {
        name
        id
        slug
        price
        available
        images {
          url
          width
          height
        }
      }
    }
  `)
  return {
    props: {
      products: products.map((product) => ({
        ...product,
        formattedPrice: formatCurrencyValue({ value: product.price })
      }))
    },
    revalidate: 25
  }
}

// look into revalidate props https://nextjs.org/docs/basic-features/data-fetching#incremental-static-regeneration

export default function Index({ products }) {
  return (
    <>
      <ProductGallery products={products} />
    </>
  )
}
