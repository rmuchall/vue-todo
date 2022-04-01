import {AppDto} from "./asbtract/AppDto";
import {IsString} from "meta-validator";

export class TodoDto extends AppDto {
    @IsString() description: string;
}
