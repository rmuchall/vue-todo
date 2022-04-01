import {ProgressBarState} from "../interfaces/ProgressBarState";
import {Ref, ref} from "vue";

export abstract class ProgressBar {
    static state: Ref<ProgressBarState> = ref({
        progress: 0,
        isVisible: false,
        intervalId: undefined
    });

    static handleInterval(): void {
        if (ProgressBar.state.value.progress >= 100) {
            ProgressBar.state.value.progress = 100;
            ProgressBar.clearIntervalId();
            return;
        }

        ProgressBar.state.value.progress += 15;
    }

    static clearIntervalId(): void {
        if (ProgressBar.state.value.intervalId === undefined) {
            // Nothing to clear
            return;
        }

        clearInterval(ProgressBar.state.value.intervalId);
        ProgressBar.state.value.isVisible = false;
        setTimeout(() => {
            ProgressBar.state.value.progress = 0;
        }, 200);
    }

    static start(): void {
        ProgressBar.clearIntervalId();
        ProgressBar.state.value.isVisible = true;
        ProgressBar.state.value.intervalId = window.setInterval(ProgressBar.handleInterval, 100, this);
    }
}
