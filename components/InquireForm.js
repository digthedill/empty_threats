import { useState, useRef } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'

const InquireForm = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [captchaChecked, setCaptchaCheck] = useState(false)
  const recaptchaRef = useRef()

  const handleSubmit = (e) => {
    e.preventDefault()
    const recaptchaValue = recaptchaRef.current.getValue()
    const data = {
      name,
      email,
      message,
      recaptchaValue,
      time: Date.now()
    }
    fetch('/api/contact', {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then((res) => {
      if (res.status === 200) {
        setSubmitted(true)
        setEmail('')
        setName('')
        setMessage('')
      }
      if (res.status === 400) {
        throw new Error("Something didn't work")
      }
    })
  }

  return (
    <div className="w-full sm:w-3/4 lg:w-1/2">
      <h2 className="text-4xl text-center mt-16 text-yellow-100">
        Drop a Line
      </h2>
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="flex flex-col md:p-8 text-black font-body"
      >
        <input
          type="text"
          placeholder="Full Name"
          className="my-2 p-4 rounded bg-yellow-100 placeholder-gray-700"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="fun_guy@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="my-2 p-4 rounded bg-yellow-100 placeholder-gray-700"
          required
        />
        <textarea
          className="my-2 p-4 resize-none h-64 rounded bg-yellow-100 placeholder-gray-700"
          placeholder="Make me a tye dye!"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
        <button
          type="submit"
          disabled={!captchaChecked}
          className="my-2 p-4 rounded bg-yellow-100 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          Submit
        </button>
        <div className="flex justify-center">
          <ReCAPTCHA
            ref={recaptchaRef}
            size="normal"
            className="my-2"
            onChange={() => setCaptchaCheck(true)}
            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_KEY}
          />
        </div>
      </form>
    </div>
  )
}

export default InquireForm
