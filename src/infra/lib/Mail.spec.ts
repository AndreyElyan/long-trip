import Mail from './Mail';

describe('Mail', () => {
  it('should be defined', () => {
    expect(Mail).toBeDefined();
  });

  it('should be able send email with nodemailer', async () => {
    const message = {
      to: 'Andrey <senha',
      from: 'Andrey <senha',
      subject: 'Recuperação de senha',
      text: 'Recuperação de senha',
      html: 'Recuperação de senha',
    };

    expect(message).toBeInstanceOf(Object);
  });
});
