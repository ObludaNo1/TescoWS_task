export class Metrics {
    private constructor() {}

    static tempTo(temp: number, unit: "K" | "C" | "F"): string {
        if (unit === "K") {
            return `${Metrics.toMaxDecimals(temp)}K`;
        } else if (unit === "C") {
            return `${Metrics.toMaxDecimals(temp - 273.15)}°C`;
        } else {
            return `${Metrics.toMaxDecimals(1.8 * (temp - 273.15) + 32)}°F`;
        }
    }

    static toMaxDecimals(value: number, decimals: number = 2): string {
        const str = value.toString();
        const dotIndex = str.indexOf(".");
        if (dotIndex > 0) {
            return str.substring(0, dotIndex + decimals);
        } else {
            return str;
        }
    }
}
