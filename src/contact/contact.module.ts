import { Module } from '@nestjs/common';
import { ContactService } from './contact.service';
import { ContactController } from './contact.controller';

@Module({
  exports: [ContactService],
  providers: [ContactService],
  controllers: [ContactController],
})
export class ContactModule {}
