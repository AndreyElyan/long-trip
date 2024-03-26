import * as nodemailer from 'nodemailer';
import mailConfig from '../../config/mail';

class Mail {
  sendMail(message) {
    this.validateMailConfig();

    const {
      host, port, secure, auth,
    } = mailConfig;

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: auth.user ? auth : null,
    });
    transporter.sendMail({
      ...mailConfig.default,
      ...message,
    });
  }

  private validateMailConfig() {
    if (!process.env.MAIL_HOST) throw new Error('MAIL_HOST not defined');
    if (!process.env.MAIL_PORT) throw new Error('MAIL_PORT not defined');
    if (!process.env.MAIL_USER) throw new Error('MAIL_USER not defined');
    if (!process.env.MAIL_PASS) throw new Error('MAIL_PASS not defined');
  }
}
export default new Mail();
