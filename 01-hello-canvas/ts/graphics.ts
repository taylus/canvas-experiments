var graphics = (function () {
    "use strict";
    
    function createCanvas(width: number, height: number, id?: string): HTMLCanvasElement {
        var canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        if (id) canvas.id = id;
        return canvas;
    }

    function scale(canvas: HTMLCanvasElement, scale: number) {
        canvas.style.width = canvas.width * scale + "px";
        canvas.style.height = canvas.height * scale + "px";
        canvas.setAttribute("scale", scale.toString());
    }

    /**
     * Scales the canvas to the largest whole number that fits the given dimensions.
     */
    function scaleFullscreen(canvas: HTMLCanvasElement, width: number = window.innerWidth, height: number = window.innerHeight) {
        var scaleFactor = getBestFitScaleFor(canvas, width, height);
        scale(canvas, scaleFactor);
    }

    /**
     * Returns the largest whole number scale factor that won't result in the canvas being larger than the given dimensions.
     * Will always return a number n >= 1 so the canvas doesn't scale itself into zero size.
     */
    function getBestFitScaleFor(canvas: HTMLCanvasElement, width: number, height: number) {
        return Math.max(1, Math.min(Math.floor(width / canvas.width - 1), Math.floor(height / canvas.height - 1)));
    }

    function loadImage(src: string): Promise<HTMLImageElement> {
        let img = new Image();
        var p = new Promise<HTMLImageElement>(function (resolve) {
            img.onload = function () {
                resolve(img);
            }
        });
        img.src = src;
        return p;
    }

    return {
        createCanvas: createCanvas,
        scale: scale,
        scaleFullscreen: scaleFullscreen,
        loadImage: loadImage
    };
}());