import Link from 'next/link'

import { graphCmsClient } from '../lib/graphCmsClient'
import { formatCurrencyValue } from '../lib/helper'

export async function getStaticProps() {
  const { products } = await graphCmsClient.request(`
  {
    products {
      name
      id
      slug
      price
    }
  }
`)
  return {
    props: {
      products: products.map((product) => ({
        ...product,
        formattedPrice: formatCurrencyValue({ value: product.price })
      }))
    }
  }
}

// look into revalidate props https://nextjs.org/docs/basic-features/data-fetching#incremental-static-regeneration

export default function Index({ products }) {
  return products.map(({ name, id, slug }) => (
    <div key={id}>
      <Link href={`/products/${slug}`}>
        <a>{name}</a>
      </Link>
    </div>
  ))
}
