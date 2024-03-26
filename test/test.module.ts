import * as merge from 'deepmerge';
import { Test } from '@nestjs/testing';
import { LoggerModule } from 'nestjs-pino';

import { ModuleMetadata } from '@nestjs/common/interfaces';
import { CommonModule } from '@infra/common/common.module';

export function createTestingModule(metadata: ModuleMetadata) {
  const moduleRef = Test.createTestingModule(
    merge(
      {
        imports: [
          LoggerModule.forRoot({ pinoHttp: { level: 'silent' } }),
          CommonModule,
        ],
        providers: [],
      } as ModuleMetadata,
      metadata,
    ),
  );

  return moduleRef;
}
