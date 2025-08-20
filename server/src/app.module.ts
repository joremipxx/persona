import { Module } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { PersonaModule } from './modules/persona/persona.module';

@Module({
  imports: [
    ConfigModule,
    PersonaModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
