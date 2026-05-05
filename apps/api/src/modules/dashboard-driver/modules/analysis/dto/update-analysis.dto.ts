import { PartialType } from '@nestjs/mapped-types';
import { CreateAnalysisDto } from './create-analysis.dto';

export class UpdateAnalysisDto extends PartialType(CreateAnalysisDto) {}
