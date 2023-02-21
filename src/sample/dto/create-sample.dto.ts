import { IsString, IsEmpty } from 'class-validator';

export class CreateSampleDto {
    @IsString()
    @IsEmpty()
    title: string;

    @IsString()
    @IsEmpty()
    name: string;
}
