import { CanvasDrawer } from "./CanvasDrawer";
import { Cities } from "./Cities";
import { Forecast } from "./Forecast";
import { SelectHandler } from "./SelectHandler";
import { TableFiller } from "./TableFiller";

const canvasDrawer = new CanvasDrawer(
    document.getElementById("canvas") as HTMLCanvasElement
);

const tableFiller = new TableFiller(
    document.getElementById("forecast-table") as HTMLTableElement
);

const selectHandler = new SelectHandler(
    document.getElementById("city-selector") as HTMLInputElement,
    document.getElementById("city-selector-options") as HTMLDataListElement
);

Cities.init()
    .then(() => {
        console.log("Cities successfuly initialized");

        document.getElementById("form")!.addEventListener("submit", (ev) => {
            // debugger;
            ev.preventDefault();
            const value = selectHandler.getValue();
            const city = Cities.find(value);

            if (city) {
                Forecast.loadFrom(city.coord.lat, city.coord.lon)
                    .then((fc) => {
                        tableFiller.fill(fc);
                        canvasDrawer.resizeCanvas(
                            fc.getRecordCount() *
                                tableFiller.getComputedCellWidth(),
                            60
                        );
                        canvasDrawer.draw(fc);
                    })
                    .catch((err) => {
                        throw err;
                    });
            }
        });
    })
    .catch((error) => console.error("Cities initialization failed", error));
