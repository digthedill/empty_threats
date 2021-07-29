import { gql } from 'graphql-request'
import Link from 'next/link'
import Image from 'next/image'

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

  return (
    <div>
      <Link href="/products">
        <div>
          <div className="fixed h-screen w-screen overflow-hidden cursor-pointer">
            <Image
              alt="bg-tyedye"
              src={img.url}
              layout="fill"
              objectFit="cover"
              quality={100}
              className="opacity-50"
            />
            <div className="relative flex flex-col h-screen w-screen justify-center items-center px-4">
              <div>
                <h1 className="text-6xl md:text-8xl">
                  EMPTY
                  <br /> THREATS
                </h1>
                <p className="text-xl w-40 md:w-64 ml-2">
                  {content.splashPageBlurb}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default splashPage
