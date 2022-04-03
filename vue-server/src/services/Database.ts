import {MikroORM, RequestContext} from "@mikro-orm/core";
import {EntityRepository, SqliteDriver, SqlEntityManager} from "@mikro-orm/sqlite";
import {TodoEntity} from "../entities/TodoEntity";
import {Log} from "./Log";
import {Config} from "./Config";
import {DatabaseSeeder} from "../seeders/DatabaseSeeder";

export abstract class Database {
    static mikroOrm: MikroORM;

    static async initialize(): Promise<void> {
        if (Database.mikroOrm) {
            throw new Error("Database is already initialized");
        }

        Database.mikroOrm = await MikroORM.init(Config.orm);
        Log.info(`Database: Connected to server = [${Config.orm.host}]`);

        // Drop schema
        const generator = Database.mikroOrm.getSchemaGenerator();
        if (Config.env.ormDropSchema) {
            Log.info("Database: Dropping schema");
            await generator.dropSchema({
                wrap: false,
                dropMigrationsTable: true,
                dropDb: false
            });
        }

        // Update schema
        if (Config.env.ormUpdateSchema) {
            Log.info("Database: Updating schema");
            await generator.updateSchema({
                wrap: false,
                safe: false,
                dropTables: true
            });
        }

        // Run migrations
        if (Config.env.ormRunMigrations) {
            const migrator = Database.mikroOrm.getMigrator();
            Log.info("Database: Executing migrations");
            await migrator.up();
        }

        // Run seeders
        if (Config.env.ormDropSchema && Config.env.ormRunMigrations) {
            const seeder = Database.mikroOrm.getSeeder();
            Log.info("Database: Executing seeders");
            await seeder.seed(DatabaseSeeder);
        }
    }

    static get globalEntityManager(): SqlEntityManager {
        const em = Database.mikroOrm.em as SqlEntityManager | undefined;
        if (!em) {
            throw new Error("Error creating database entity manager");
        }

        return em;
    }

    static get requestContextEntityManager(): SqlEntityManager {
        const em = RequestContext.getEntityManager() as SqlEntityManager | undefined;
        if (!em) {
            throw new Error("Error creating database entity manager");
        }

        return em;
    }

    static get driver(): SqliteDriver {
        return Database.requestContextEntityManager.getDriver() as SqliteDriver;
    }

    // -----
    // Repositories
    static get todoRepository(): EntityRepository<TodoEntity> {
        return Database.requestContextEntityManager.getRepository(TodoEntity);
    }
}
