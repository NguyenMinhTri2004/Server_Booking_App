import OtpVerifyEmailService from "../../otp/otpVerifyEmail.service";
import TemplateService from "../../template.service";
import { transporter } from "../../../dbs/init.nodemailer";
import { replacePlaceholder } from "../../../utils";

class EmailService {
  static sendEmailLinkVerify = async ({
    html,
    toEmail,
    subject = "Xac nhan email dang ky",
    text = "xac nhan",
  }) => {
    try {
      const mailOptions = {
        from: "nguyenminhtri.vnpt2@gmail.com",
        to: toEmail,
        subject,
        text,
        html,
      };

      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          console.error(err);
        }

        console.log("Message sent", info?.messageId);
      });
    } catch (error) {
      console.error(error);
      return error;
    }
  };

  static sendEmailLoginToken = async ({ email = null }) => {
    try {
      // get token
      const token = await OtpVerifyEmailService.newOtp({ email });

      // get template
      const template = await TemplateService.getTemplateEmail({
        name: "HTML-EMAIL-TOKEN",
      });
      // replace placeholder with params

      const content = replacePlaceholder(template.html, {
        link_verify: `http://localhost:3000/checkEmailToken?token=${token.value}`,
      });

      // send email

      this.sendEmailLinkVerify({
        html: content,
        toEmail: email,
        subject: "Xac nhan email dang ky",
      });
    } catch (error) {
      console.error(error);
    }
  };

  static sendEmailResetPasswordToken = async ({ email = null }) => {
    try {
      // get token
      const token = await OtpVerifyEmailService.newOtp({ email });

      // get template
      const template = await TemplateService.getTemplateEmail({
        name: "HTML-EMAIL-TOKEN",
      });
      // replace placeholder with params

      const content = replacePlaceholder(template.html, {
        link_verify: `http://localhost:3000/checkResetPasswordToken?token=${token.value}`,
      });

      // send email

      this.sendEmailLinkVerify({
        html: content,
        toEmail: email,
        subject: "Xac nhan email quen mat khau",
      });
    } catch (error) {
      console.error(error);
    }
  };
}

export default EmailService;
