import nodemailer from "nodemailer";

export type EmailData = {
  email: string;
  subject: string;
  message: string;
};

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.AUTH_USER,
    pass: process.env.AUTH_PASS,
  },
});

export async function sendEmail({ subject, email, message }: EmailData) {
  const mailData = {
    to: process.env.AUTH_USER,
    subject: `[BLOG] ${subject}`,
    email,
    html: `<h1>${subject}</h1>
      <div>${message}</div>
      <br/>
      <p>보낸사람: ${email}</p>
    `,
  };

  return transporter.sendMail(mailData);
}
