import { Cities } from "./Cities";
import { MIN_LETTERS_TO_AUTOCOMPLETE } from "./constants";

export class SelectHandler {
    private input: HTMLInputElement;
    private datalist: HTMLDataListElement;

    constructor(input: HTMLInputElement, datalist: HTMLDataListElement) {
        this.input = input;
        this.datalist = datalist;

        const eventFunction = (ev: Event) => {
            console.log("New event: " + ev.type);
        };

        const listeners: (keyof HTMLElementEventMap)[] = [
            "click",
            "select",
            "focus",
            "submit",
        ];
        listeners.forEach((ev) =>
            this.datalist.addEventListener(ev, eventFunction)
        );

        input.addEventListener("keypress", (e) => {
            if (e.key === "Enter") {
                return;
            }

            window.setTimeout(() => {
                this.clearOptions();

                console.log(`Input changed to "${input.value}"`);

                const currentInputValue = input.value;
                const values = Cities.findFollowing(currentInputValue);

                const currentInputValueLength = currentInputValue.length;

                if (currentInputValueLength < MIN_LETTERS_TO_AUTOCOMPLETE) {
                    return;
                }

                values.forEach((v, index) => {
                    const opt = document.createElement("option");
                    opt.id = "autocomplete-item" + index;
                    opt.classList.add("autocomplete-item");
                    opt.value = v.name;
                    listeners.forEach((ev) =>
                        opt.addEventListener(ev, eventFunction)
                    );
                    opt.addEventListener("focus", (ev) => {
                        input.innerHTML = v.name;
                        this.clearOptions();
                    });
                    datalist.appendChild(opt);
                });
            }, 0);
        });
    }

    getValue(): string {
        return this.input.value;
    }

    private clearOptions(): void {
        this.datalist.innerHTML = "";
    }
}
