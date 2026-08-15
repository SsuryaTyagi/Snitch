import nodemailer from "nodemailer";
import config from "../config/config";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: config.SMTP_USER,
    pass: config.SMTP_PASS,
  },
});

const sendVerificationEmail = async (email, name, token) => {
  const verifyURL = `${config.CLIENT_URL}/verify-email/${token}`;

  await transporter.sendMail({
    from: `"SNITCH" <${config.SMTP_USER}>`,
    to: email,
    subject: "Verify your SNITCH account",
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Verify your SNITCH account</title>
        </head>

        <body style="
          margin:0;
          padding:0;
          background:#f5f5f5;
          font-family:Arial, Helvetica, sans-serif;
          color:#111111;
        ">

          <table width="100%" cellpadding="0" cellspacing="0" border="0">
            <tr>
              <td align="center" style="padding:40px 15px;">

                <table
                  width="100%"
                  cellpadding="0"
                  cellspacing="0"
                  border="0"
                  style="
                    max-width:560px;
                    background:#ffffff;
                    border-radius:4px;
                    overflow:hidden;
                  "
                >

                  <!-- Header -->
                  <tr>
                    <td align="center" style="padding:32px 30px 24px;">
                      <div style="
                        font-size:28px;
                        font-weight:800;
                        letter-spacing:3px;
                        color:#111111;
                      ">
                        SNITCH
                      </div>

                      <div style="
                        margin-top:8px;
                        font-size:11px;
                        letter-spacing:2px;
                        color:#777777;
                        text-transform:uppercase;
                      ">
                        Modern Fashion
                      </div>
                    </td>
                  </tr>

                  <!-- Divider -->
                  <tr>
                    <td style="padding:0 40px;">
                      <div style="height:1px;background:#eeeeee;"></div>
                    </td>
                  </tr>

                  <!-- Content -->
                  <tr>
                    <td style="padding:40px;">

                      <p style="
                        margin:0 0 20px;
                        font-size:14px;
                        color:#777777;
                        letter-spacing:1px;
                        text-transform:uppercase;
                      ">
                        Welcome to SNITCH
                      </p>

                      <h1 style="
                        margin:0 0 20px;
                        font-size:30px;
                        line-height:1.2;
                        font-weight:700;
                        color:#111111;
                      ">
                        Verify your email
                      </h1>

                      <p style="
                        margin:0 0 14px;
                        font-size:16px;
                        line-height:1.6;
                        color:#333333;
                      ">
                        Hi ${name},
                      </p>

                      <p style="
                        margin:0 0 30px;
                        font-size:15px;
                        line-height:1.7;
                        color:#555555;
                      ">
                        Thanks for joining SNITCH. Please verify your email
                        address to activate your account and start exploring
                        our latest styles.
                      </p>

                      <!-- CTA -->
                      <table cellpadding="0" cellspacing="0" border="0">
                        <tr>
                          <td>
                            <a
                              href="${verifyURL}"
                              style="
                                display:inline-block;
                                background:#111111;
                                color:#ffffff;
                                text-decoration:none;
                                padding:15px 30px;
                                font-size:14px;
                                font-weight:700;
                                letter-spacing:1px;
                                text-transform:uppercase;
                              "
                            >
                              Verify Email
                            </a>
                          </td>
                        </tr>
                      </table>

                      <p style="
                        margin:30px 0 8px;
                        font-size:12px;
                        line-height:1.6;
                        color:#999999;
                      ">
                        This verification link will expire in 24 hours.
                      </p>

                      <p style="
                        margin:0;
                        font-size:12px;
                        line-height:1.6;
                        color:#999999;
                      ">
                        If you didn't create a SNITCH account, you can safely
                        ignore this email.
                      </p>

                    </td>
                  </tr>

                  <!-- Footer -->
                  <tr>
                    <td style="
                      padding:25px 40px;
                      background:#fafafa;
                      border-top:1px solid #eeeeee;
                    ">

                      <p style="
                        margin:0 0 8px;
                        font-size:12px;
                        color:#777777;
                        text-align:center;
                      ">
                        © ${new Date().getFullYear()} SNITCH. All rights reserved.
                      </p>

                      <p style="
                        margin:0;
                        font-size:11px;
                        color:#aaaaaa;
                        text-align:center;
                      ">
                        This is an automated email. Please do not reply.
                      </p>

                    </td>
                  </tr>

                </table>

              </td>
            </tr>
          </table>

        </body>
      </html>
    `,
  });
};

export default sendVerificationEmail;
