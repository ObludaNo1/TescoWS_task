import { Forecast } from "./Forecast";
import { Metrics } from "./Metrics";

export class CanvasDrawer {
    private canvas: HTMLCanvasElement;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
    }

    resizeCanvas(width: number, height: number): void {
        this.canvas.width = width;
        this.canvas.height = height;
    }

    draw(forecast: Forecast): void {
        const ctx = this.canvas.getContext("2d")!;
        ctx.beginPath();

        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        const allValues = forecast.getAllValuesFor("temp");

        const widthPerFC = this.canvas.width / allValues.length;
        const height = this.canvas.height;

        const min = Math.min(...allValues);
        const max = Math.max(...allValues);
        const minY = height * 0.25;
        const maxY = height * 0.75;

        const getY = (y: number): number => {
            const t = (max - y) / (max - min);
            return (1 - t) * minY + t * maxY;
        };

        const points: [number, number][] = [];

        points.push([widthPerFC * 0.5, getY(allValues[0])]);
        for (let i = 1; i < allValues.length; i++) {
            const val = allValues[i];
            points.push([widthPerFC * (i + 0.5), getY(val)]);
        }

        ctx.moveTo(...points[0]);
        for (let i = 1; i < points.length; i++) {
            ctx.lineTo(...points[i]);
        }

        ctx.lineTo((allValues.length - 0.5) * widthPerFC, height);
        ctx.lineTo(widthPerFC * 0.5, height);

        ctx.closePath();
        ctx.fillStyle = "#eea";
        ctx.fill();

        ctx.moveTo(...points[0]);
        for (let i = 1; i < points.length; i++) {
            ctx.lineTo(...points[i]);
        }
        ctx.fillStyle = "#444";
        ctx.stroke();
    }
}
