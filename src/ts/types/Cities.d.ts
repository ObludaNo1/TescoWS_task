export interface CityRecord {
    id: number;
    name: string;
    state: string;
    country: string;
    coord: {
        lat: number;
        lon: number;
    };
}
