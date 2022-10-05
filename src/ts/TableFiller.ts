import { Forecast } from "./Forecast";
import { Metrics } from "./Metrics";

export class TableFiller {
    private table: HTMLTableElement;

    constructor(table: HTMLTableElement) {
        this.table = table;
    }

    fill(forecast: Forecast): void {
        const table = this.table;
        table.innerHTML = "";

        const dayRow = document.createElement("tr");
        const timeRow = document.createElement("tr");
        const tempRow = document.createElement("tr");
        const recordsPerDay = forecast.getDataPerDay();

        dayRow.classList.add("table-row-days");
        timeRow.classList.add("table-row-time");
        tempRow.classList.add("table-row-temp");

        let addOddClass = false;
        const oddClassName = "odd-day-backgound";

        recordsPerDay.forEach((recordsInDay) => {
            const dayCell = document.createElement("td");
            dayCell.colSpan = recordsInDay.length;
            dayCell.innerText = new Date(
                recordsInDay[0].dt * 1000
            ).toLocaleString([], {
                dateStyle: "short",
            });
            if (addOddClass) {
                dayCell.classList.add(oddClassName);
            }
            dayRow.appendChild(dayCell);
            recordsInDay.forEach((hourRecord) => {
                const timeCell = document.createElement("td");
                timeCell.innerText = new Date(
                    hourRecord.dt * 1000
                ).toLocaleString([], {
                    timeStyle: "short",
                });
                if (addOddClass) {
                    timeCell.classList.add(oddClassName);
                }
                timeRow.appendChild(timeCell);

                const tempCell = document.createElement("td");
                tempCell.innerText = Metrics.tempTo(hourRecord.main.temp, "C");
                if (addOddClass) {
                    tempCell.classList.add(oddClassName);
                }
                tempRow.appendChild(tempCell);
            });

            addOddClass = !addOddClass;
        });

        table.appendChild(tempRow);
        table.appendChild(timeRow);
        table.appendChild(dayRow);
    }

    getComputedCellWidth(): number {
        const cell = this.table.firstChild?.firstChild;
        if (cell) {
            // add flat 3 as compensation for border
            return parseFloat(getComputedStyle(cell as Element).width) + 3;
        } else {
            return 0;
        }
    }
}
