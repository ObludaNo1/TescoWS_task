import { Cities } from "./Cities";
import { OPEN_WEATHER_MAP_API_KEY } from "./globals";
import { HTTP } from "./http/HTTP";

const http = new HTTP();

Cities.init()
    .then(() => {
        console.log("Cities successfuly initialized");
    })
    .catch((error) => console.error("Cities initialization failed", error));
