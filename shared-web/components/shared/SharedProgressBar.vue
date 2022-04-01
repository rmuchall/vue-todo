<script lang="ts">
import {computed, defineComponent} from "vue";
import {ProgressBar} from "../../services/ProgressBar";

export default defineComponent({
    name: "SharedProgressBar",
    setup() {
        const cssObject = computed(() => {
            return {
                "width": `${ProgressBar.state.value.progress}%`,
                "opacity": `${ProgressBar.state.value.isVisible ? 100 : 0}`
            };
        });

        return {
            cssObject
        };
    }
});
</script>

<template>
  <div class="z-50 fixed top-0 left-0 h-2 bg-blue-200"
       style="transition: width 0.2s ease, opacity 0.2s ease"
       :style="cssObject"></div>
</template>
