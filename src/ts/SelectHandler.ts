import { Cities } from "./Cities";
import { CityRecord } from "./types/Cities";

export class SelectHandler {
    private static input: HTMLInputElement;
    private static optionHolder: HTMLDivElement;

    private constructor() {}

    static init() {
        const input = document.getElementById(
            "city-selector"
        ) as HTMLInputElement;
        const optionHolder = document.getElementById(
            "autocomplete-option-holder"
        ) as HTMLDivElement;
        SelectHandler.input = input;
        SelectHandler.optionHolder = optionHolder;

        input.addEventListener("input", (e) => {
            SelectHandler.clearOptions();

            const ul = document.createElement("ul");
            const currentInputValue = input.value;
            const values = Cities.find(currentInputValue);

            const currentInputValueLength = currentInputValue.length;

            if (currentInputValueLength === 0) {
                return;
            }

            values.forEach((v, index) => {
                const li = document.createElement("li");
                li.id = "autocomplete-item" + index;
                li.classList.add("autocomplete-item");
                li.innerHTML = `<strong>${v.name.substring(
                    0,
                    currentInputValueLength
                )}</strong>${v.name.substring(
                    currentInputValueLength,
                    v.name.length
                )}`;
                li.addEventListener("click", (ev) => {
                    input.innerHTML = v.name;
                    SelectHandler.clearOptions();
                });
                ul.appendChild(li);
            });

            optionHolder.appendChild(ul);
        });
    }

    static clearOptions(): void {
        SelectHandler.optionHolder.innerHTML = "";
    }
}
