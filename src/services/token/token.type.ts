import { IsString } from 'class-validator';

export class CreateTokenDtos {
  @IsString()
  token: string;
}
