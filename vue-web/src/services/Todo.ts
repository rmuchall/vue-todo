import {Ref, ref} from "vue";
import {TodoDto} from "shared-server/dtos/TodoDto";
import {isEmpty} from "meta-validator";
import {Modal} from "shared-web/services/Modal";
import {TodoRequest} from "../requests/TodoRequest";

export class Todo {
    todos: Ref<TodoDto[]> = ref([]);
    newTodoDto: Ref<TodoDto> = ref(new TodoDto());

    async addTodo(): Promise<void> {
        if (isEmpty(this.newTodoDto.value.description)) {
            console.log("Display modal");
            Modal.red("Error", "You must specify a todo description");
            return;
        }

        try {
            await TodoRequest.addTodo(this.newTodoDto.value);
            this.newTodoDto.value = new TodoDto();
            await this.refreshTodos();
        } catch (error) {
            Modal.red("Error", error.message);
        }
    }

    async deleteTodo(todoDto: TodoDto): Promise<void> {
        try {
            await TodoRequest.deleteTodo(todoDto);
            await this.refreshTodos();
        } catch (error) {
            Modal.red("Error", error.message);
        }
    }

    async refreshTodos(): Promise<void> {
        try {
            this.todos.value = await TodoRequest.getAllTodos();
        } catch (error) {
            Modal.red("Error", error.message);
        }
    }
}
