require('dotenv/config');

const config = {
  mailer: process.env.MAIL_MAILER,
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  username: process.env.MAIL_USERNAME,
  password:  process.env.MAIL_PASSWORD,
  encrytion: process.env.MAIL_ENCRYPTION,
  fromAddress: process.env.MAIL_FROM_ADDRESS,
  fromName: process.env.MAIL_FROM_NAME
}

module.exports = config
