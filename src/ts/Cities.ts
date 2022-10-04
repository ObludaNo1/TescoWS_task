import { HTTP } from "./http/HTTP";
import { CityRecord } from "./types/Cities";

export class Cities {
    private static citiesArray: CityRecord[] = [];
    private static citiesMap: Record<string, number> = {};

    private constructor() {}

    static init(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            const http = new HTTP();
            http.get<string>("../data/city.list.json")
                .then((result) => {
                    // debugger;
                    Cities.citiesArray = JSON.parse(result);
                    Cities.citiesArray.forEach((val, i) => {
                        Cities.citiesMap[val.name] = i;
                    });
                    resolve();
                })
                .catch((err) => reject(err));
        });
    }
}
