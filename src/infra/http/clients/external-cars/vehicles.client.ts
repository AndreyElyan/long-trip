import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { map } from 'rxjs';

@Injectable()
export class VehiclesClient {
  constructor(private readonly http: HttpService) {}

  carsFormData = 'codigoTipoVeiculo=1&codigoTabelaReferencia=293';

  getAvailableMakes() {
    return this.http
      .post(this.getURL('ConsultarMarcas'), this.carsFormData, {
        headers: this.getRequestHeaders(),
      })
      .pipe(map((response) => response.data));
  }

  getModels(makeId: string) {
    const formData = `${this.carsFormData}&codigoMarca=${makeId}`;

    return this.http
      .post(this.getURL('ConsultarModelos'), formData, {
        headers: this.getRequestHeaders(),
      })
      .pipe(map((response) => response.data));
  }

  getAvailableYears(makeId: string, modelId: string) {
    const formData = `${this.carsFormData}&codigoMarca=${makeId}&codigoModelo=${modelId}`;

    return this.http
      .post(this.getURL('ConsultarAnoModelo'), formData, {
        headers: this.getRequestHeaders(),
      })
      .pipe(
        map((response) => {
          const { data } = response;

          if (data.length === 0) {
            return [];
          }

          return data.map((item) => ({
            year: item.Value,
            label: item.Label.replace(/\D/g, ''),
          }));
        }),
      );
  }

  private getRequestHeaders() {
    return {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept-Encoding': 'gzip,deflate,compress',
    };
  }

  private getURL(path: string) {
    return `https://veiculos.fipe.org.br/api/veiculos//${path}`;
  }
}
