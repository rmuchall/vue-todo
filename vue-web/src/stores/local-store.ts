import {defineStore} from "pinia";

export const useLocalStore = defineStore("localStore", {
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
