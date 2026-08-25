import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',

  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

export const sendEmail = async (
  to,
  subject,
  html,
  attachment = null
) => {
  try {
    const mailOptions = {
      from: `"Flight Booking System" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html
    };

    if (attachment) {
      mailOptions.attachments = [
        {
          filename: attachment.filename,
          content: attachment.content,
          contentType: attachment.contentType
        }
      ];
    }

    const result =
      await transporter.sendMail(mailOptions);

    console.log(
      `Email sent successfully to ${to}`
    );

    return result;
  } catch (error) {
    console.error(
      'Email sending failed:',
      error.message
    );

    throw error;
  }
};
