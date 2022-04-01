import {defineStore} from "pinia";

export const useSharedStore = defineStore("sharedStore", {
    state: () => {
        return {
            counter: 0,
        };
    },
    actions: {
        increment(): void {
            this.counter++;
        }
    }
});
