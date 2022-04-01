<script lang="ts">
import {defineComponent} from "vue";
import PublicHeader from "./public/PublicHeader.vue";
import PublicFooter from "./public/PublicFooter.vue";

export default defineComponent({
    name: "PublicLayout",
    components: {
        PublicHeader,
        PublicFooter
    }
});
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <public-header></public-header>
    <router-view name="content" class="flex flex-grow flex-col items-center"></router-view>
    <public-footer></public-footer>
  </div>
</template>
