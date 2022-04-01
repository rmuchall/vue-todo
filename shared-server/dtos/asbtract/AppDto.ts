import {Exclude} from "meta-transformer";

export abstract class AppDto {
    @Exclude()
    id: string;

    @Exclude()
    created: Date;

    @Exclude()
    updated: Date;
}
