import nodemailer from 'nodemailer';


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,  // your Gmail address
    pass: process.env.EMAIL_PASS   // your Gmail app password
  }
});


// For saving in file
// export const sendEmail = async (to, subject, html, attachmentPath = null) => {
//   const mailOptions = {
//     from: `"Flight Booking System" <${process.env.EMAIL_USER}>`,
//     to,
//     subject,
//     html
//   };

//    if (attachmentPath) {
//         mailOptions.attachments = [
//         {
//             filename: attachmentPath.split('/').pop(),
//             path: attachmentPath
//         }
//         ];
//     }

//   await transporter.sendMail(mailOptions);
// };

export const sendEmail = async (to, subject, html, attachment = null) => {
  const mailOptions = {
    from: `"Flight Booking System" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html,
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

  await transporter.sendMail(mailOptions);
};
