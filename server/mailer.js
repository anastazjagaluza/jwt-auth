const nodemailer = require("nodemailer");

async function main(from, to, subject, text) {
  let testAccount = await nodemailer.createTestAccount();

  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass, // generated ethereal password
    },
    tls: {
                rejectUnauthorized: false
            }
  });

  let info = await transporter.sendMail({
    from: from, // sender address
    to: to, // list of receivers
    subject: subject, // Subject line
    text: text, // plain text body
  });

  return {"Message sent: %s": info.messageId, "PreviewURL": nodemailer.getTestMessageUrl(info)};
}

module.exports = main;