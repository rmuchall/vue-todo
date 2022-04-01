import {TodoDto} from "shared-server/dtos/TodoDto";
import {webFetchWithHooks} from "../utilities/web-fetch-with-hooks";
import {ScalarResultDto} from "shared-server/dtos/ScalarResultDto";

export abstract class TodoRequest {
    static getAllTodos(): Promise<TodoDto[]> {
        return webFetchWithHooks.get("/todo")
            .then(response => response.json() as Promise<TodoDto[]>);
    }

    static addTodo(todoDto: TodoDto): Promise<ScalarResultDto> {
        return webFetchWithHooks.post("/todo", {
            json: todoDto
        }).then(response => response.json() as Promise<ScalarResultDto>);
    }

    static deleteTodo(todoDto: TodoDto): Promise<ScalarResultDto> {
        return webFetchWithHooks.delete("/todo", {
            json: todoDto
        }).then(response => response.json() as Promise<ScalarResultDto>);
    }
}
