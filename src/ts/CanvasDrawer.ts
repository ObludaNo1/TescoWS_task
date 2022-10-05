import { Forecast } from "./Forecast";

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

        ctx.moveTo(widthPerFC * 0.5, getY(allValues[0]));
        for (let i = 1; i < allValues.length; i++) {
            const val = allValues[i];
            ctx.lineTo(widthPerFC * (i + 0.5), getY(val));
        }

        ctx.lineTo((allValues.length - 1) * widthPerFC, 0);
        ctx.lineTo(widthPerFC * 0.5, 0);
        ctx.lineTo(widthPerFC * 0.5, 0);

        ctx.closePath();
        ctx.fillStyle = "#f00";
        ctx.fill();
    }
}
