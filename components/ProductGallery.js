import Link from 'next/link'
import Image from 'next/image'

const productAvailable = (available) => {
  return available
    ? {
        opacity: '1'
      }
    : {
        opacity: '0.3'
      }
}

const ProductGallery = ({ products }) => {
  return (
    <div className="space-y-4 md:space-y-0 md:grid md:grid-cols-2 md:gap-2">
      {products.map(({ name, id, slug, images, available, formattedPrice }) => (
        <div
          key={id}
          className="flex flex-col"
          style={productAvailable(available)}
        >
          <Link href={`/products/${slug}`}>
            <div className="product-thumb group">
              <Image
                src={images[0].url}
                width={1200}
                height={1000}
                className="object-cover w-full m-0 rounded-lg group-hover:filter-hue"
              />
              <div className="flex justify-around bg-yellow-600 text-black m-0 rounded-lg group-hover:bg-yellow-200">
                <a>{name}</a>
                <a>{available ? formattedPrice : 'sold out :('}</a>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  )
}

export default ProductGallery
