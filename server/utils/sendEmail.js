const { config } = require("dotenv");
const sgMail = require("@sendgrid/mail");

config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

function sendEmail(receiver, source, subject, content) {
  try {
    const data = {
      to: receiver,
      from: source,
      subject,
      html: content,
    };
    return sgMail.send(data);
  } catch (e) {
    return newError(e);
  }
}

exports.sendEmail = sendEmail;
