import {BaseEntity, OptionalProps, PrimaryKey, Property} from "@mikro-orm/core";
import {randomUUID} from "crypto";

export abstract class AppEntity<OPTIONAL = never> extends BaseEntity<AppEntity<OPTIONAL>, "id"> {
    [OptionalProps]: OPTIONAL | "created" | "updated";

    @PrimaryKey({ onCreate: () => randomUUID()})
    id: string;

    @Property({ onCreate: () => new Date() })
    created: Date;

    @Property({ onCreate: () => new Date(), onUpdate: () => new Date() })
    updated: Date;
}
