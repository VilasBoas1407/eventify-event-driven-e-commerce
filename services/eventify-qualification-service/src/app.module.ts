import { Module } from '@nestjs/common';
import { QualificationModule } from './qualification/qualification.module';

@Module({
  imports: [QualificationModule],
})
export class AppModule {}
