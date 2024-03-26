import { CreateEvaluation } from '@app/use-cases/evaluations/create-evaluation';
import { GetEvaluationsByDriverId } from '@app/use-cases/evaluations/get-evaluations-by-driver-id';
import { JwtAuthGuard } from '@infra/auth/jwt-auth.guard';
import { CreateEvaluationBody } from '@infra/http/dtos/evaluations/create-evaluation.entity';
import {
  Body, Controller, Get, Param, Post, UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('evaluations')
@ApiTags('Evaluations')
export class EvaluationController {
  constructor(
    private createEvaluation: CreateEvaluation,
    private getEvaluationsByDriverId: GetEvaluationsByDriverId,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post('/')
  @ApiOperation({ summary: 'Create a new evaluation to a user or driver' })
  @ApiResponse({
    status: 201,
    description: 'Evaluation created',
  })
  async create(@Body() body: CreateEvaluationBody) {
    const response = await this.createEvaluation.execute(body);

    return response;
  }

  @UseGuards(JwtAuthGuard)
  @Get('/driver/:id')
  @ApiOperation({ summary: 'Get the average of evaluations of a driver' })
  @ApiResponse({
    status: 200,
    description: 'Average of evaluations',
  })
  async getAverageOfEvaluationsByDriverId(@Param('id') id: string) {
    const response = await this.getEvaluationsByDriverId.execute(id);

    return response;
  }
}
