import { IsDate, IsNumber, IsString } from 'class-validator';


export class CreateCommentDto {
    @IsNumber()
    public post_id: number;

    @IsNumber()
    public user_id: number;

    @IsString()
    public media: string;

    @IsString()
    public context: string;

    @IsDate()
    public created_at: Date

    @IsDate()
    public updated_at: Date
}