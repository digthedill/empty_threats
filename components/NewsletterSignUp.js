const NewsletterSignUp = () => {
  const handleSubmit = (e) => {
    window.open(
      'https://tinyletter.com/EmptyThreats',
      'popupwindow',
      'scrollbars=yes,width=800,height=600'
    )
    return true
  }
  return (
    <form
      className="flex flex-col mx-2"
      action="https://tinyletter.com/EmptyThreats"
      method="post"
      target="popupwindow"
      onSubmit={handleSubmit}
    >
      <label>Newsletter:</label>
      <div className="flex space-x-1">
        <input
          aria-label="Email address"
          type="email"
          name="email"
          id="tlemail"
          placeholder="funGuy@email.com"
          className="p-2"
          required
        />
        <input type="hidden" value="1" name="embed" />
        <button type="submit">OK</button>
      </div>
    </form>
  )
}

export default NewsletterSignUp
