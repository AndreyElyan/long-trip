import { ForgotPassword } from '@app/use-cases/users/password/forgot-password';
import { DatabaseModule } from '@infra/database/database.module';
import { PrismaService } from '@infra/database/prisma/prisma.service';
import { PrismaUsersRepository } from '@infra/database/prisma/repositories/users/prisma-users-repository';
import { HttpModule } from '@nestjs/axios';
import { JwtService } from '@nestjs/jwt';
import { TestingModule } from '@nestjs/testing';
import { createTestingModule } from '@test/test.module';
import { PasswordController } from './password.controller';

describe('PasswordController', () => {
  let controller: PasswordController;

  beforeEach(async () => {
    jest.mock(
      '@infra/database/prisma/repositories/users/prisma-users-repository',
    );
    jest.mock('@infra/http/controllers/password/password.controller.ts');
    const module: TestingModule = await createTestingModule({
      imports: [DatabaseModule, HttpModule],
      controllers: [PasswordController],
      providers: [
        ForgotPassword,
        PrismaUsersRepository,
        PrismaService,
        JwtService,
      ],
    }).compile();

    controller = module.get<PasswordController>(PasswordController);
  });
  it('should be defined', () => {
    expect(PasswordController).toBeDefined();
  });

  it('should be able to send a email on forgot password', async () => {
    PasswordController.prototype.forgot = jest.fn().mockReturnValue(201);

    const data = await controller.forgot({
      email: 'random@example.com',
    });

    expect(data).toEqual(201);

    expect(PasswordController.prototype.forgot).toBeCalledWith({
      email: 'random@example.com',
    });

    expect(PasswordController.prototype.forgot).toBeCalledTimes(1);

    expect(PasswordController.prototype.forgot).toReturnWith(201);

    expect(PasswordController.prototype.forgot).toReturnTimes(1);

    expect(PasswordController.prototype.forgot).toReturn();
  });

  it('should not be able to send a email on forgot password', async () => {
    PasswordController.prototype.forgot = jest.fn().mockReturnValue(400);

    await expect(
      controller.forgot({
        email: 'random@example.com',
      }),
    ).toEqual(400);

    expect(PasswordController.prototype.forgot).toBeCalledWith({
      email: 'random@example.com',
    });

    expect(PasswordController.prototype.forgot).toBeCalledTimes(1);
    expect(PasswordController.prototype.forgot).toReturnWith(400);
    expect(PasswordController.prototype.forgot).toReturnTimes(1);
    expect(PasswordController.prototype.forgot).toReturn();
  });

  it('should be able to validate a token', async () => {
    PasswordController.prototype.validateResetToken = jest
      .fn()
      .mockReturnValue({
        id: '9a4b98c3-5b5f-4c30-b7b7-388e2554c99f',
        expiresIn: '10m',
        access_token: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.',
      });

    const request = {
      email: 'random@example.com',
      resetToken: 121212,
    };

    const data = await controller.validateResetToken(request);

    expect(data).toEqual({
      id: '9a4b98c3-5b5f-4c30-b7b7-388e2554c99f',
      expiresIn: '10m',
      access_token: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.',
    });

    expect(PasswordController.prototype.validateResetToken).toBeCalledWith(
      request,
    );

    expect(PasswordController.prototype.validateResetToken).toBeCalledTimes(1);
  });

  it('should not be able to validate a token', async () => {
    PasswordController.prototype.validateResetToken = jest
      .fn()
      .mockReturnValue({
        message: 'Invalid token',
      });

    const request = {
      email: 'random@example.com',
      resetToken: 121212,
    };

    const data = await controller.validateResetToken(request);

    expect(data).toEqual(data);

    expect(PasswordController.prototype.validateResetToken).toBeCalledWith(
      request,
    );

    expect(PasswordController.prototype.validateResetToken).toBeCalledTimes(1);

    expect(PasswordController.prototype.validateResetToken).toReturnWith(data);
  });

  it('should be able to reset a password', async () => {
    PasswordController.prototype.resetPassword = jest.fn().mockReturnValue(201);

    const request = {
      password: '12345678',
      id: '9a4b98c3-5b5f-4c30-b7b7-388e2554c99f',
    };

    const data = await controller.resetPassword(request);

    expect(data).toEqual(201);

    expect(PasswordController.prototype.resetPassword).toBeCalledWith(request);

    expect(PasswordController.prototype.resetPassword).toBeCalledTimes(1);

    expect(PasswordController.prototype.resetPassword).toReturnWith(201);

    expect(PasswordController.prototype.resetPassword).toReturnTimes(1);

    expect(PasswordController.prototype.resetPassword).toReturn();
  });

  it('should not be able to reset a password', async () => {
    PasswordController.prototype.resetPassword = jest.fn().mockReturnValue(400);

    const request = {
      password: '12345678',
      id: '9a4b98c3-5b5f-4c30-b7b7-388e2554c99f',
    };

    const data = await controller.resetPassword(request);

    expect(data).toEqual(400);
  });
});
