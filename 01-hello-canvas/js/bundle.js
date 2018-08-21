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
        canvas.setAttribute("scale", scale.toString());
    }
    /**
     * Scales the canvas to the largest whole number that fits the given dimensions.
     */
    function scaleFullscreen(canvas, width, height) {
        if (width === void 0) { width = window.innerWidth; }
        if (height === void 0) { height = window.innerHeight; }
        var scaleFactor = getBestFitScaleFor(canvas, width, height);
        scale(canvas, scaleFactor);
    }
    /**
     * Returns the largest whole number scale factor that won't result in the canvas being larger than the given dimensions.
     * Will always return a number n >= 1 so the canvas doesn't scale itself into zero size.
     */
    function getBestFitScaleFor(canvas, width, height) {
        return Math.max(1, Math.min(Math.floor(width / canvas.width - 1), Math.floor(height / canvas.height - 1)));
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
        scaleFullscreen: scaleFullscreen,
        loadImage: loadImage
    };
}());
/// <reference path="graphics.ts" />
(function () {
    "use strict";
    var lastTime; //timestamp of last game loop iteration
    var fps; //fps calculated in game loop (1 / time delta between frames)
    var canvas;
    var context;
    var spritesheet;
    var frames = [{ x: 0, y: 0 }, { x: 16, y: 0 }, { x: 32, y: 0 }, { x: 48, y: 0 }];
    var animation = [1, 2, 3, 2];
    var lastAnimation = 0; //timestamp of last animation update
    var animationInterval = 100; //time (in ms) to wait in between animation updates
    var currFrame = 0;
    var spriteSize = 16;
    document.addEventListener("DOMContentLoaded", init);
    window.addEventListener("resize", function () {
        graphics.scaleFullscreen(canvas);
    });
    function init() {
        canvas = graphics.createCanvas(160, 144);
        document.body.appendChild(canvas);
        graphics.scaleFullscreen(canvas);
        context = canvas.getContext("2d");
        graphics.loadImage("img/kirby.png").then(function (image) {
            spritesheet = image;
        });
        context.fillStyle = "black";
        context.font = "18px monospace";
        gameLoop();
        setInterval(function () {
            canvas.classList.toggle("flip-horiz");
        }, 2000);
    }
    function gameLoop() {
        var now = performance.now();
        var dt = now - lastTime;
        update(now, dt);
        render();
        lastTime = now;
        fps = Math.floor(1 / (dt / 1000));
        requestAnimationFrame(gameLoop);
    }
    function update(now, msSinceLastUpdate) {
        if (now - lastAnimation >= animationInterval) {
            currFrame++;
            if (currFrame >= animation.length)
                currFrame = 0;
            lastAnimation = now;
        }
    }
    function render() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        //context.fillText("fps: " + fps, 2, 14);
        var frame = getAnimationFrame(currFrame);
        if (spritesheet)
            context.drawImage(spritesheet, frame.x, frame.y, spriteSize, spriteSize, 72, 64, spriteSize, spriteSize);
    }
    function getAnimationFrame(number) {
        return frames[animation[number]];
    }
}());
//# sourceMappingURL=bundle.js.map