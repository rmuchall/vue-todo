import type {EntityManager} from "@mikro-orm/core";
import {Seeder} from "@mikro-orm/seeder";
import {Log} from "../services/Log";
import {TodoEntity} from "../entities/TodoEntity";

export class DatabaseSeeder extends Seeder {
    async run(em: EntityManager): Promise<void> {
        const todoRepository = em.getRepository(TodoEntity);

        // Add default todos
        Log.info("Seeder: Inserting default todos");
        const todos: TodoEntity[] = [];
        todos.push(todoRepository.create({
            description: "One"
        }));
        todos.push(todoRepository.create({
            description: "Two"
        }));
        todos.push(todoRepository.create({
            description: "Three"
        }));
        todoRepository.persist(todos);

        // Execute transaction
        await em.flush();
    }
}
