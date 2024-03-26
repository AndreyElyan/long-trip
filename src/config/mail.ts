export default {
  host: String(process.env.MAIL_HOST) || '',
  port: Number(process.env.MAIL_PORT) || 0,
  secure: false,
  auth: {
    user: String(process.env.MAIL_USER) || '',
    pass: String(process.env.MAIL_PASS) || '',
  },
  default: {
    from: 'Equipe LongTrip<norely-longtrip@longtrip.app.br>',
  },
};
