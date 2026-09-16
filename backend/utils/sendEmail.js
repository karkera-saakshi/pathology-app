const nodemailer = require("nodemailer");


// Gmail transporter
const transporter = nodemailer.createTransport({
  service: "gmail",

  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});


// Send OTP email
const sendOTPEmail = async (email, otp) => {

  await transporter.sendMail({

    from: `"PathConnect MV" <${process.env.EMAIL_USER}>`,

    to: email,

    subject: "PathConnect MV - Email Verification OTP",

    text: `Your PathConnect MV verification OTP is ${otp}. This OTP is valid for 5 minutes.`,

    html: `
      <div style="font-family: Arial, sans-serif;">

        <h2>PathConnect MV</h2>

        <p>Your email verification OTP is:</p>

        <h1>${otp}</h1>

        <p>This OTP is valid for <b>5 minutes</b>.</p>

        <p>
          If you did not request this OTP,
          you can safely ignore this email.
        </p>

      </div>
    `,
  });
};


module.exports = sendOTPEmail;