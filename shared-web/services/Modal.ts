import {ModalState} from "../interfaces/ModalState";
import {ref, Ref} from "vue";

export abstract class Modal {
    static state: Ref<ModalState> = ref({
        isVisible: false,
        title: "",
        body: "",
        cssClass: ""
    });

    static green(title: string, body: string): void {
        Modal.show(title, body, "bg-green-500");
    }

    static blue(title: string, body: string): void {
        Modal.show(title, body, "bg-blue-500");
    }

    static orange(title: string, body: string): void {
        Modal.show(title, body, "bg-yellow-500");
    }

    static red(title: string, body: string): void {
        Modal.show(title, body, "bg-red-500");
    }

    static close(): void {
        Modal.state.value.isVisible = false;
        Modal.state.value.title = "";
        Modal.state.value.body = "";
        Modal.state.value.cssClass = "";
    }

    static show(title: string, body: string, cssClass: string): void {
        Modal.state.value.isVisible = true;
        Modal.state.value.title = title;
        Modal.state.value.body = body;
        Modal.state.value.cssClass = cssClass;
    }
}
