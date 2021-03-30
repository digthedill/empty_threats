const Footer = () => {
  return (
    <footer className="flex flex-col p-4 items-center justify-center mt-40">
      <h3>Empty Threats LLC ©</h3>
      <form className="flex flex-col mx-2">
        <label>Newsletter:</label>
        <div className="flex space-x-1">
          <input type="email" placeholder="funGuy@email.com" className="p-2" />
          <input
            type="submit"
            value="Join"
            className="text-white bg-yellow-900 p-2"
          />
        </div>
      </form>
      <a href="#">Instagram</a>
    </footer>
  )
}

export default Footer
