<script lang="ts">
import {defineComponent} from "vue";
import {useLocalStore} from "../../stores/local-store";
import {useSharedStore} from "shared-web/stores/shared-store";

export default defineComponent({
    name: "PublicStore",
    setup() {
        const localStore = useLocalStore();
        const sharedStore = useSharedStore();
        return {
            localStore,
            sharedStore
        };
    }
});
</script>

<template>
  <div class="grid grid-cols-2 gap-6">
    <div class="p-4">
      <pre>Local store: {{localStore.counter}}</pre>
      <button class="app-btn m-2" @click="localStore.increment()">Increase counter</button>
    </div>
    <div class="p-4">
      <pre>Shared store: {{sharedStore.counter}}</pre>
      <button class="app-btn m-2" @click="sharedStore.increment()">Increase counter</button>
    </div>
  </div>
</template>
