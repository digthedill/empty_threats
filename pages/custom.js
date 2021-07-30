import { gql } from 'graphql-request'
import Image from 'next/image'
import { graphCmsClient } from '../lib/graphCmsClient'
import InquireForm from '../components/InquireForm'

export async function getStaticProps() {
  const customPageContent = await graphCmsClient.request(gql`
    query {
      customPage(where: { id: "ckmxreuwwajnw0b76itxx8t1w" }) {
        oneText
        oneImage {
          url
        }
        twoText
        twoImage {
          url
        }
        threeText
        threeImage {
          url
        }
      }
    }
  `)
  return {
    props: {
      customPageContent
    },
    revalidate: 25
  }
}

const custom = ({ customPageContent }) => {
  const {
    oneText,
    oneImage,
    twoText,
    twoImage,
    threeText,
    threeImage
  } = customPageContent.customPage

  return (
    <div className="flex flex-col w-full items-center justify-center">
      <div id="custom-page-content" className="p-4 rounded-lg">
        <div id="1" className="custom-content-container">
          <Image
            src={oneImage.url}
            width={500}
            height={500}
            alt="empty threats custom tye dye"
            className="custom-content-img"
          />
          <div className="custom-text-wrapper">
            <p className="custom-content-text">{oneText}</p>
          </div>
        </div>
        <div id="2" className="custom-content-container">
          <div className="custom-text-wrapper order-last md:order-first">
            <p className="custom-content-text text-left md:text-right">
              {twoText}
            </p>
          </div>
          <Image
            src={twoImage.url}
            width={500}
            height={500}
            alt="empty threats custom tye dye"
            className="custom-content-img"
          />
        </div>
        <div id="3" className="custom-content-container">
          <Image
            src={threeImage.url}
            width={500}
            height={500}
            alt="empty threats custom tye dye"
            className="custom-content-img"
          />
          <div className="custom-text-wrapper">
            <p className="custom-content-text">{threeText}</p>
          </div>
        </div>
      </div>

      <InquireForm />
    </div>
  )
}

export default custom
