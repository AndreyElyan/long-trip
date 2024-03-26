import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';

@Module({
  imports: [TerminusModule, HttpModule],
  exports: [HttpModule],
  providers: [],
  controllers: [],
})
export class CommonModule {}
