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
        glob: "**/*.js",
        disableForeignKeys: false,
        snapshot: false
    },
    seeder: {
        path: "./peardrop-server/src/seeders",
        defaultSeeder: "DatabaseSeeder"
    },
};

export default ormConfig;
