import {MikroORMOptions} from "@mikro-orm/core";

const ormConfig: Partial<MikroORMOptions> = {
    debug: false,
    validate: true,
    strict: true,
    type: "sqlite",
    dbName: "vue-todo.db",
    entities: ["./src/entities"],
    // https://mikro-orm.io/docs/migrations/#configuration
    migrations: {
        tableName: "migrations",
        path: "./src/migrations",
        glob: "**/!(*.d).ts",
        disableForeignKeys: false,
        snapshot: false
    },
    seeder: {
        path: "./src/seeders",
        defaultSeeder: "DatabaseSeeder"
    },
};

export default ormConfig;
