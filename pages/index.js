import { gql } from 'graphql-request'
import Image from 'next/link' //not working? might be better to source logo internally
import Link from 'next/link'

import { graphCmsClient } from '../lib/graphCmsClient'

export async function getStaticProps() {
  const splashPageContent = await graphCmsClient.request(gql`
    {
      splashPages {
        splashImage {
          url
          width
          height
        }
        splashPageBlurb
      }
    }
  `)
  return {
    props: {
      splashPageContent
    }
  }
}

const splashPage = ({ splashPageContent }) => {
  const [content] = splashPageContent.splashPages
  const img = content.splashImage
  console.log(img.url)

  return (
    <div className="flex justify-center items-center h-screen w-screen">
      <Link href="/products">
        <div className="m-2 cursor-pointer flex flex-col items-center justify-center">
          <h1>EMPTY THREATS</h1>
          <p>{content.splashPageBlurb}</p>
          <img
            src={img.url}
            width={img.width}
            height={img.height}
            className="lg:w-1/2"
          />
        </div>
      </Link>
    </div>
  )
}

export default splashPage
