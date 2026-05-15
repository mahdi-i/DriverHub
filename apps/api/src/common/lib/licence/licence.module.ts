import { Module } from '@nestjs/common';
import { LicenseManager } from './licence.service';

@Module({
  imports: [],
  controllers: [],
  providers: [LicenseManager],
  exports: [LicenseManager],
})
export class LicenseModule {}
