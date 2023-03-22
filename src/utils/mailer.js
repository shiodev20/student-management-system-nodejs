const mailer = require('nodemailer')
const mailConfig = require('../config/mail.config')

  
const sendMail = (to, subject, html) => {
  const transport = mailer.createTransport({
    host: mailConfig.host,
    port: mailConfig.port,
    secure: false,
    auth: {
      user: mailConfig.username,
      pass: mailConfig.password,
    }
  })

  const options = {
    from: mailConfig.fromAddress,
    to,
    subject,
    html,
  }

  return transport.sendMail(options)
}

module.exports = {
  sendMail,
}
