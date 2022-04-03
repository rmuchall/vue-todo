<script lang="ts">
import {defineComponent, onMounted} from "vue";
import {Todo} from "../../services/Todo";

export default defineComponent({
    name: "PublicTodo",
    setup() {
        const todoService = new Todo();

        onMounted(async () => {
            await todoService.refreshTodos();
        });

        return {
            todoService
        };
    }
});
</script>

<template>
  <div class="pt-4">

    <form class="flex" novalidate @submit.prevent="todoService.addTodo()">
      <input v-model="todoService.newTodoDto.value.description" class="border px-2 mr-2" type="text" />
      <button class="app-btn">Add Todo</button>
    </form>

    <ul class="grid grid-cols-1 text-2xl bg-gray-200 mt-4">
      <li v-for="todo in todoService.todos.value" :key="todo.description" class="flex justify-between w-full py-2 border-4 border-gray-100">
        <span class="px-8">{{todo.description}}</span>
        <svg class="h-8 w-8 text-red-900 pr-2 cursor-pointer hover:text-red-600" @click="todoService.deleteTodo(todo)">
          <use href="/images/x-circle-solid.svg#x-circle-solid" />
        </svg>
      </li>
      <li v-if="todoService.todos.value.length === 0" class="p-2">No todos found in database.</li>
    </ul>

  </div>
</template>
