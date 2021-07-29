const validateCaptcha = (response_key) => {
  return new Promise((resolve, reject) => {
    const secret_key = process.env.RECAPTCHA_SECRET

    const url = `https://www.google.com/recaptcha/api/siteverify?secret=${secret_key}&response=${response_key}`

    fetch(url, {
      method: 'post'
    })
      .then((response) => response.json())
      .then((google_response) => {
        if (google_response.success == true) {
          resolve(true)
        } else {
          resolve(false)
        }
      })
      .catch((err) => {
        console.log(err)
        resolve(false)
      })
  })
}

export default async function (req, res) {
  require('dotenv').config()

  if (!(await validateCaptcha(req.body.recaptchaValue))) {
    return res.redirect('/')
  }
  delete req.body.recaptchaValue

  let nodemailer = require('nodemailer')

  const transporter = nodemailer.createTransport({
    port: 465,
    host: 'smtp.gmail.com',
    auth: {
      user: process.env.BURNER_EMAIL,
      pass: process.env.BURNER_PASSWORD
    },
    secure: true
  })

  const mailData = {
    from: process.env.BURNER_EMAIL,
    to: 'dillon@dkelley.dev', //change to dj email
    subject: `New Message From: ${req.body.name}`,
    text: req.body.message + ' | Sent from: ' + req.body.email,
    html: `<div>${req.body.message}</div><p>Sent from:
    ${req.body.email}</p>`
  }

  transporter.sendMail(mailData, (err, info) => {
    if (err) {
      console.log(err)
      res.status(400).end()
    } else {
      console.log(info)
      res.status(200).end()
    }
  })
}
