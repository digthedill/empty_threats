// import NewsletterSignUp from '../components/NewsletterSignUp'

const Footer = () => {
  return (
    <footer className="flex flex-col p-4 items-center justify-center mt-24">
      <h3>Empty Threats LLC ©</h3>
      {/* <NewsletterSignUp /> */}
      <a
        href="https://www.instagram.com/empty__threats/"
        target="_blank"
        className=" my-4 px-4 py-2 rounded-full bg-yellow-600 text-black hover:bg-yellow-200"
      >
        Instagram
      </a>
    </footer>
  )
}

export default Footer
