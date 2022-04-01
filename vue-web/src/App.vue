<script lang="ts">
import {defineComponent} from "vue";
import {Modal} from "shared-web/services/Modal";
import SharedModal from "shared-web/components/shared/SharedModal.vue";
import SharedProgressBar from "shared-web/components/shared/SharedProgressBar.vue";

export default defineComponent({
    name: "App",
    components: {
        SharedModal,
        SharedProgressBar
    },
    setup() {
        return {
            Modal
        };
    }
});
</script>

<template>
  <div class="flex flex-col min-h-screen bg-gray-100">
    <shared-modal v-if="Modal.state.value.isVisible"></shared-modal>
    <shared-progress-bar></shared-progress-bar>
    <!-- Router content -->
    <router-view name="layout"></router-view>
  </div>
</template>
