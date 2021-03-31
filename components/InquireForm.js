const InquireForm = () => {
  return (
    <div className="">
      <p className="text-2xl text-center mt-16">
        Inquires for Commission or Collaboration
      </p>
      <form className="flex flex-col md:p-8 text-black ">
        <input
          type="email"
          placeholder="fun_guy@example.com"
          className="my-2 p-4 rounded bg-yellow-100"
        />
        <textarea
          className="my-2 p-4 resize-none h-64 rounded bg-yellow-100"
          placeholder="I got $250, let's make some dope shit"
        />
        <input
          type="submit"
          value="submit"
          className="my-2 p-4 rounded bg-yellow-100"
        />
      </form>
    </div>
  )
}

export default InquireForm
