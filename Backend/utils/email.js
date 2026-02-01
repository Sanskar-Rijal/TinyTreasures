import nodemailer from "nodemailer";
import pug from "pug";
import { htmlToText } from "html-to-text";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//new Email, SendWelcome message
class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.name.split(" ")[0];
    this.url = url;
    this.from = `Tiny-Treasures <${process.env.GMAIL_USER}>`;
  }

  onCreateTransport() {
    return nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });
  }

  async send(template, subject) {
    //1)Render the html based on a pug template
    const html = pug.renderFile(`${__dirname}/../Templates/${template}.pug`, {
      firstName: this.firstName,
      url: this.url,
      subject,
    });
    //2)Define the email options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject: subject,
      html: html,
      text: htmlToText(html),
    };

    //creating a transport and sending email
    await this.onCreateTransport().sendMail(mailOptions);
  }

  //for welcome email
  async sendWelcome() {
    await this.send("welcomeEmail", "Welcome to the Online-Store Website!");
  }

  async sendPasswordReset() {
    await this.send(
      "passwordReset",
      "Your password reset token, valid only for 10 minutes",
    );
  }
}

export default Email;
