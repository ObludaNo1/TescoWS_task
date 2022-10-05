import { CanvasDrawer } from "./CanvasDrawer";
import { Cities } from "./Cities";
import { FORECAST_URL, OPEN_WEATHER_MAP_API_KEY } from "./constants";
import { Forecast } from "./Forecast";
import { HTTP } from "./http/HTTP";
import { SelectHandler } from "./SelectHandler";
import { TableFiller } from "./TableFiller";

const canvasDrawer = new CanvasDrawer(
    document.getElementById("canvas") as HTMLCanvasElement
);

const tableFiller = new TableFiller(
    document.getElementById("forecast-table") as HTMLTableElement
);

Cities.init()
    .then(() => {
        console.log("Cities successfuly initialized");

        SelectHandler.init();

        document.getElementById("form")!.addEventListener("submit", (ev) => {
            // debugger;
            ev.preventDefault();
            const input = document.getElementById(
                "city-selector"
            ) as HTMLInputElement;
            const value = input.value;
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
