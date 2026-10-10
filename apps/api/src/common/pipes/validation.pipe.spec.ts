import { describe, it, expect } from 'vitest';
import { ValidationPipe, BadRequestException } from '@nestjs/common';
import { IsInt, IsNotEmpty, IsString, Min } from 'class-validator';
import { Type } from 'class-transformer';

class SampleDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  age!: number;
}

describe('Request Validation Infrastructure', () => {
  const pipe = new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
    transformOptions: {
      enableImplicitConversion: false,
    },
  });

  it('should accept a valid DTO payload', async () => {
    const raw = {
      name: 'Agritech Incubator',
      age: 25,
    };

    const transformed = await pipe.transform(raw, {
      type: 'body',
      metatype: SampleDto,
    });

    expect(transformed).toBeInstanceOf(SampleDto);
    expect(transformed.name).toBe('Agritech Incubator');
    expect(transformed.age).toBe(25);
  });

  it('should reject requests with unknown/unwhitelisted fields', async () => {
    const rawWithExtra = {
      name: 'Valid Name',
      age: 30,
      maliciousField: 'exploit_value',
    };

    await expect(
      pipe.transform(rawWithExtra, {
        type: 'body',
        metatype: SampleDto,
      }),
    ).rejects.toThrow(BadRequestException);
  });

  it('should reject payloads with invalid data types', async () => {
    const invalidTypes = {
      name: 12345, // should be string
      age: 'not-a-number',
    };

    await expect(
      pipe.transform(invalidTypes, {
        type: 'body',
        metatype: SampleDto,
      }),
    ).rejects.toThrow(BadRequestException);
  });

  it('should reject payloads with missing required fields', async () => {
    const missingName = {
      age: 20,
    };

    await expect(
      pipe.transform(missingName, {
        type: 'body',
        metatype: SampleDto,
      }),
    ).rejects.toThrow(BadRequestException);
  });
});
