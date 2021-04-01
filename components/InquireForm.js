const InquireForm = () => {
  return (
    <div className="w-full sm:w-3/4 lg:w-1/2">
      <h2 className="text-4xl text-center mt-16 text-yellow-100">
        Drop a Line
      </h2>
      <form className="flex flex-col md:p-8 text-black font-body">
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
          value="Submit"
          className="my-2 p-4 rounded bg-yellow-100"
        />
      </form>
    </div>
  )
}

export default InquireForm
