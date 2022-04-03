import { BaseEntity, OptionalProps, PrimaryKey, Property, types } from "@mikro-orm/core";
import {randomUUID} from "crypto";

export abstract class AppEntity<OPTIONAL = never> extends BaseEntity<AppEntity<OPTIONAL>, "id"> {
    [OptionalProps]: OPTIONAL | "created" | "updated";

    @PrimaryKey({ onCreate: () => randomUUID()})
    id: string;

    @Property({ type: types.integer, onCreate: () => new Date() })
    created: Date = new Date();

    @Property({ type: types.integer, onCreate: () => new Date(), onUpdate: () => new Date() })
    updated: Date = new Date();
}
