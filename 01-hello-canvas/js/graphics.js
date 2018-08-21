var graphics = (function () {
    "use strict";
    function createCanvas(width, height, id) {
        var canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        if (id)
            canvas.id = id;
        return canvas;
    }
    function scale(canvas, scale) {
        canvas.style.width = canvas.width * scale + "px";
        canvas.style.height = canvas.height * scale + "px";
    }
    function loadImage(src) {
        var img = new Image();
        var p = new Promise(function (resolve) {
            img.onload = function () {
                resolve(img);
            };
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
//# sourceMappingURL=graphics.js.map