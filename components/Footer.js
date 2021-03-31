import NewsletterSignUp from '../components/NewsletterSignUp'

const Footer = () => {
  return (
    <footer className="flex flex-col p-4 items-center justify-center mt-40">
      <h3>Empty Threats LLC ©</h3>
      <NewsletterSignUp />
      <a href="#">Instagram Link?</a>
    </footer>
  )
}

export default Footer
