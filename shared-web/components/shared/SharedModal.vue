<script lang="ts">
import {defineComponent} from "vue";
import {Modal} from "../../services/Modal";

export default defineComponent({
    name: "SharedModal",
    setup() {
        return {
            Modal
        };
    }
});
</script>

<template>
  <div class="fixed inset-0 flex flex-col justify-center items-center bg-black z-50 bg-opacity-75">
    <div class="w-1/2 rounded bg-gray-100" style="word-wrap: break-word; margin-top: -10%;">
      <div class="flex justify-between items-center rounded-t p-4" :class="Modal.state.value.cssClass">
        <p class="text-white text-lg font-semibold">{{Modal.state.value.title}}</p>
        <svg class="h-10 w-10 text-gray-900 pr-2 cursor-pointer hover:text-gray-600" @click="Modal.close()">
          <use href="/images/x-circle-solid.svg#x-circle-solid" />
        </svg>
      </div>
      <p class="p-4">{{Modal.state.value.body}}</p>
      <div class="rounded-b p-4" :class="Modal.state.value.cssClass">
        <a class="sd-btn" @click="Modal.close()">Close</a>
      </div>
    </div>
  </div>
</template>

<style lang="css">
.sd-btn {
    @apply inline-block px-6 py-2 rounded text-lg text-white bg-gray-900 cursor-pointer;
}

.sd-btn:hover {
    @apply bg-gray-600;
}
</style>
