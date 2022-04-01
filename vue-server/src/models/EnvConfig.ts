import {IsNumber, IsString, IsValid} from "meta-validator";

export class EnvConfig {
    @IsNumber()
    apiPort: number;

    @IsString()
    staticFileDirectory: string;

    @IsValid()
    ormDropSchema: boolean;

    @IsValid()
    ormUpdateSchema: boolean;

    @IsValid()
    ormRunMigrations: boolean;
}
