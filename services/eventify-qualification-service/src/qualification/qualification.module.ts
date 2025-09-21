import { Module } from '@nestjs/common';
import { QualificationService } from './qualification.service';

@Module({
  providers: [QualificationService],
  exports: [QualificationService],
})
export class QualificationModule {}
