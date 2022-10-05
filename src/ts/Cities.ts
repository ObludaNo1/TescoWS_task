import { MAX_AUTOCOMPLETE_SUGGESTIONS } from "./constants";
import { PartialMap } from "./dataStructures/PartialMap";
import { HTTP } from "./http/HTTP";
import { CityRecord } from "./types/Cities";

export class Cities {
    private static citiesMap: PartialMap<CityRecord> =
        new PartialMap<CityRecord>();

    private static initialized: boolean = false;

    private constructor() {}

    static init(): Promise<void> {
        if (this.initialized) {
            return new Promise((resolve, reject) => {
                reject("already initialized");
            });
        }
        return new Promise<void>((resolve, reject) => {
            const http = new HTTP();
            http.get<string>("../data/city.list.json")
                .then((result) => {
                    // debugger;
                    let parsedCityData: CityRecord[] = JSON.parse(result);
                    // there are some invalid names
                    parsedCityData = parsedCityData.filter(
                        (rec) => rec.name !== "-"
                    );
                    // sort them
                    parsedCityData.sort((a, b) => a.name.localeCompare(b.name));
                    parsedCityData.forEach((val) => {
                        Cities.citiesMap.add(val.name, val);
                    });
                    Cities.initialized = true;
                    console.log(Cities.citiesMap);
                    resolve();
                })
                .catch((err) => reject(err));
        });
    }

    static isInitialized(): boolean {
        return this.initialized;
    }

    static find(key: string): CityRecord | undefined {
        if (Cities.initialized) {
            return Cities.citiesMap.get(key);
        } else {
            return undefined;
        }
    }

    static findFollowing(key: string): CityRecord[] {
        if (Cities.initialized) {
            const result: CityRecord[] = [];
            const firstCityIndex = Cities.citiesMap.getFollowingValues(
                key,
                MAX_AUTOCOMPLETE_SUGGESTIONS,
                result
            );
            return result;
        } else {
            return [];
        }
    }
}
