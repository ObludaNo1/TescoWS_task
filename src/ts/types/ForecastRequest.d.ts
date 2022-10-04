export interface CurrentWeather {
    temp?: number;
}

export interface HourlyForecast {
    temp?: number;
}

export interface DailyForecast {
    temp?: number;
}

export interface ForecastRequest {
    lat: number;
    lon: number;
    timezone: string;
    timezone_offset: number;
    current?: CurrentWeather;
}
