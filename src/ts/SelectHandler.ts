import { Cities } from "./Cities";
import { MIN_LETTERS_TO_AUTOCOMPLETE } from "./constants";
import { CityRecord } from "./types/Cities";

export class SelectHandler {
    private static input: HTMLInputElement;
    private static datalist: HTMLDataListElement;

    private constructor() {}

    static init() {
        const input = document.getElementById(
            "city-selector"
        ) as HTMLInputElement;
        const datalist = document.getElementById(
            "city-selector-options"
        ) as HTMLDataListElement;
        SelectHandler.input = input;
        SelectHandler.datalist = datalist;

        input.addEventListener("input", (e) => {
            SelectHandler.clearOptions();

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
                // opt.innerHTML = `<strong>${v.name.substring(
                //     0,
                //     currentInputValueLength
                // )}</strong>${v.name.substring(
                //     currentInputValueLength,
                //     v.name.length
                // )}`;
                opt.value = v.name;
                opt.addEventListener("click", (ev) => {
                    input.innerHTML = v.name;
                    SelectHandler.clearOptions();
                });
                datalist.appendChild(opt);
            });
        });
    }

    static clearOptions(): void {
        SelectHandler.datalist.innerHTML = "";
    }
}
