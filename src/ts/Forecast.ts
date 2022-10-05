import { FORECAST_URL, OPEN_WEATHER_MAP_API_KEY } from "./constants";
import { HTTP } from "./http/HTTP";
import { ForecastRecord, ForecastRequest } from "./types/ForecastRequest";

export class Forecast {
    private data: ForecastRequest;

    private constructor(data: ForecastRequest) {
        this.data = data;
    }

    getDataPerDay(): ForecastRecord[][] {
        const msInDay = 1000 * 3600 * 24;

        const result: ForecastRecord[][] = [];

        let currentDay = this.timeToDaysSinceStart(this.data.list[0].dt);
        let currentArray: ForecastRecord[] = [];
        this.data.list.forEach((val) => {
            const day = this.timeToDaysSinceStart(val.dt);
            if (day === currentDay) {
                currentArray.push(val);
            } else {
                currentDay = day;
                result.push(currentArray);
                currentArray = [];
            }
        });

        return result;
    }

    private timeToDaysSinceStart(dt: number): number {
        return new Date(dt * 1000).setHours(0, 0, 0, 0) / 86400000;
    }

    static loadFrom(
        lat: number | string,
        lon: number | string
    ): Promise<Forecast> {
        if (typeof lat === "number") {
            lat = lat.toString();
        }
        if (typeof lon === "number") {
            lon = lon.toString();
        }

        const http = new HTTP();
        return http
            .get<string>(FORECAST_URL, {
                appid: OPEN_WEATHER_MAP_API_KEY,
                lat,
                lon,
            })
            .then((res) => {
                return new Forecast(JSON.parse(res));
            })
            .catch((err) => {
                throw err;
            });
    }
}
