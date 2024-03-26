import { DatabaseModule } from '@infra/database/database.module';
import { AddressClient } from '@infra/http/clients/external-address/address.client';
import { HttpModule } from '@nestjs/axios';
import { TestingModule } from '@nestjs/testing';
import { createTestingModule } from '@test/test.module';
import { Observable } from 'rxjs';
import { AddressController } from './address.controller';

describe('Address Controller', () => {
  let controller: AddressController;

  beforeEach(async () => {
    const module: TestingModule = await createTestingModule({
      imports: [HttpModule, DatabaseModule],
      controllers: [AddressController],
      providers: [AddressClient],
    }).compile();

    controller = module.get<AddressController>(AddressController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should be able to get address by cep', async () => {
    const addressResponse = {
      cep: '01001000',
      logradouro: 'Praça da Sé',
      complemento: 'lado ímpar',
      bairro: 'Sé',
      localidade: 'São Paulo',
      uf: 'SP',
      unidade: '',
      ibge: '3550308',
      gia: '1004',
    };

    const response = new Observable((subscriber) => {
      subscriber.next(addressResponse);
    });

    jest
      .spyOn(controller, 'getAddress')
      .mockImplementation(async () => response);

    (await controller.getAddress({ address: '912350178' })).subscribe(
      (result) => {
        expect(result).toEqual(addressResponse);
      },
    );
  });

  it('should be able to get address by address', async () => {
    const addressResponse = {
      cep: '01001000',
      logradouro: 'Praça da Sé',
      complemento: 'lado ímpar',
      bairro: 'Sé',
      localidade: 'São Paulo',
      uf: 'SP',
      unidade: '',
      ibge: '3550308',
      gia: '1004',
    };

    const response = new Observable((subscriber) => {
      subscriber.next(addressResponse);
    });

    jest
      .spyOn(controller, 'getAddress')
      .mockImplementation(async () => response);

    (await controller.getAddress({ address: 'Praça da Sé' })).subscribe(
      (result) => {
        expect(result).toEqual(addressResponse);
      },
    );
  });

  it('should be able to get address by address and number', async () => {
    const addressResponse = {
      cep: '01001000',
      logradouro: 'Praça da Sé',
      complemento: 'lado ímpar',
      bairro: 'Sé',
      localidade: 'São Paulo',
      uf: 'SP',
      unidade: '',
      ibge: '3550308',
      gia: '1004',
    };

    const response = new Observable((subscriber) => {
      subscriber.next(addressResponse);
    });

    jest
      .spyOn(controller, 'getAddress')
      .mockImplementation(async () => response);

    (
      await controller.getAddress({ address: 'Praça da Sé numero 10' })
    ).subscribe((result) => {
      expect(result).toEqual(addressResponse);
    });
  });
});
