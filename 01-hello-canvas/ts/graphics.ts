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
        loadImage: loadImage
    };
}());