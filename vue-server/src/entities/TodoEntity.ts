import {Entity, Property, Unique} from "@mikro-orm/core";
import {AppEntity} from "./abstract/AppEntity";

@Entity({
    tableName: "todo"
})
export class TodoEntity extends AppEntity {
    @Property()
    @Unique()
    description: string;
}
