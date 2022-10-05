import { Cities } from "./Cities";
import { FORECAST_URL, OPEN_WEATHER_MAP_API_KEY } from "./constants";
import { HTTP } from "./http/HTTP";
import { SelectHandler } from "./SelectHandler";

const http = new HTTP();

Cities.init()
    .then(() => {
        console.log("Cities successfuly initialized");

        Cities.findFollowing("Londo");

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
                http.get(FORECAST_URL, {
                    lat: city.coord.lat.toString(),
                    lon: city.coord.lon.toString(),
                    appid: OPEN_WEATHER_MAP_API_KEY,
                })
                    .then((data) => {
                        console.log("Forecast for " + city.name);
                        console.log(data);
                    })
                    .catch((err) => {
                        console.error(err);
                    });
            }
        });
    })
    .catch((error) => console.error("Cities initialization failed", error));
