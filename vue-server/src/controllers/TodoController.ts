import {Body, HttpError, JsonController, Route} from "meta-controller";
import {TodoDto} from "shared-server/dtos/TodoDto";
import {HttpMethod, HttpStatus} from "http-status-ts";
import {Database} from "../services/Database";
import {MetaTransformer} from "meta-transformer";
import {ScalarResultDto} from "shared-server/dtos/ScalarResultDto";

@JsonController("/todo")
export class TodoController {
    @Route(HttpMethod.GET)
    async getAllTodos(): Promise<TodoDto[]> {
        const userEntities = await Database.todoRepository.findAll();
        return MetaTransformer.toClass(TodoDto, userEntities);
    }

    @Route(HttpMethod.POST)
    async addTodo(@Body() todoDto: TodoDto): Promise<ScalarResultDto> {
        if (await Database.todoRepository.count({description: todoDto.description}) === 1) {
            throw new HttpError(HttpStatus.BAD_REQUEST, "A todo with that description already exists.");
        }

        const newUserEntity = Database.todoRepository.create(todoDto);
        await Database.todoRepository.persistAndFlush(newUserEntity);
        return new ScalarResultDto(true);
    }

    @Route(HttpMethod.DELETE)
    async deleteTodo(@Body() todoDto: TodoDto): Promise<ScalarResultDto> {
        if (await Database.todoRepository.count({description: todoDto.description}) !== 1) {
            throw new HttpError(HttpStatus.BAD_REQUEST, "Todo not found in database.");
        }

        const userToDelete = await Database.todoRepository.findOneOrFail({
            description: todoDto.description
        });
        await Database.todoRepository.removeAndFlush(userToDelete);
        return new ScalarResultDto(true);
    }
}
