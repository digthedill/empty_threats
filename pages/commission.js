import { gql } from 'graphql-request'
import { graphCmsClient } from '../lib/graphCmsClient'
import InquireForm from '../components/InquireForm'

// is markdown the whole page the best way??

// alt: picture associated with body of text
// less wordy and more flexible design opportunity

const commission = ({ commissionPageMarkdown }) => {
  const md = commissionPageMarkdown.commissions[0].pageContent.html
  return (
    <div className="mx-4 sm:mx-28 lg:mx-96">
      <div dangerouslySetInnerHTML={{ __html: md }}></div>
      <div>
        <InquireForm />
      </div>
    </div>
  )
}

export default commission

export async function getStaticProps() {
  const commissionPageMarkdown = await graphCmsClient.request(gql`
    query {
      commissions {
        pageContent {
          html
        }
      }
    }
  `)
  return {
    props: {
      commissionPageMarkdown
    }
  }
}
