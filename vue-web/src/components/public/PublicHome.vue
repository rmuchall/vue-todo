<script lang="ts">
import {defineComponent} from "vue";
import PublicStore from "./PublicStore.vue";
import PublicTodo from "./PublicTodo.vue";

export default defineComponent({
    name: "PublicHome",
    components: {
        PublicStore,
        PublicTodo
    }
});
</script>

<template>
  <div>
    <public-store></public-store>
    <public-todo></public-todo>
  </div>
</template>
