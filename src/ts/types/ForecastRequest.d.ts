export interface WeatherData {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    sea_level: number;
    grnd_level: number;
    humidity: number;
    temp_kf: number;
}

export interface WeatherPhenomena {
    id: number;
    main: string;
    description: string;
    icon: string;
}

export interface ForecastRecord {
    dt: number; // unix time (in seconds)
    main: WeatherData;
    weather: WeatherPhenomena[];
}

export interface ForecastRequest {
    cod: string;
    message: number;
    cnt: number;
    list: ForecastRecord[];
}
