const InquireForm = () => {
  return (
    <form className="flex flex-col p-8 text-black">
      <input
        type="email"
        placeholder="fun_guy@example.com"
        className="my-2 p-4"
      />
      <textarea className="my-2 p-4 resize-none" />
      <input type="submit" value="submit" className="my-2 p-4" />
    </form>
  )
}

export default InquireForm
