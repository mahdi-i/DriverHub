import { PartialType } from '@nestjs/mapped-types';

import { CreateAuthDto } from './create-phone.dto';

export class UpdateAuthDto extends PartialType(CreateAuthDto) {}
