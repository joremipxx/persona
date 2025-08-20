import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseUUIDPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { PersonaService } from './persona.service';
import { CreatePersonaDto } from '../../common/dto/create-persona.dto';
import { UpdatePersonaDto } from '../../common/dto/update-persona.dto';

@Controller('personas')
export class PersonaController {
  constructor(private readonly personaService: PersonaService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createPersonaDto: CreatePersonaDto) {
    return this.personaService.create(createPersonaDto);
  }

  @Get()
  async findAll(@Query('userId') userId?: string) {
    return this.personaService.findAll(userId);
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.personaService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updatePersonaDto: UpdatePersonaDto,
  ) {
    return this.personaService.update(id, updatePersonaDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.personaService.remove(id);
  }

  @Get(':id/frontend-format')
  async findOneInFrontendFormat(@Param('id', ParseUUIDPipe) id: string) {
    const dbPersona = await this.personaService.findOne(id);
    return this.personaService.transformFromDatabase(dbPersona);
  }
}
