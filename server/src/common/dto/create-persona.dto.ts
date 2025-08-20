import {
  IsString,
  IsNumber,
  IsArray,
  IsOptional,
  IsNotEmpty,
  Min,
  Max,
  ArrayMinSize,
} from 'class-validator';

export class CreatePersonaDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @Min(1)
  @Max(120)
  age: number;

  @IsString()
  @IsNotEmpty()
  gender: string;

  @IsString()
  @IsNotEmpty()
  location: string;

  @IsString()
  @IsNotEmpty()
  profession: string;

  @IsString()
  @IsNotEmpty()
  industry: string;

  @IsString()
  @IsNotEmpty()
  companySize: string;

  @IsNumber()
  @Min(0)
  @Max(60)
  experienceYears: number;

  @IsString()
  @IsNotEmpty()
  income: string;

  @IsString()
  @IsNotEmpty()
  careerLevel: string;

  @IsArray()
  @IsString({ each: true })
  careerGoals: string[];

  @IsArray()
  @IsString({ each: true })
  challenges: string[];

  @IsArray()
  @IsString({ each: true })
  preferredTools: string[];

  @IsArray()
  @IsString({ each: true })
  communicationPreferences: string[];

  @IsArray()
  @IsString({ each: true })
  socialNetworks: string[];

  @IsArray()
  @IsString({ each: true })
  contentInterests: string[];

  @IsString()
  @IsNotEmpty()
  painPoints: string;

  @IsString()
  @IsNotEmpty()
  motivations: string;

  @IsOptional()
  @IsString()
  userId?: string;
}
