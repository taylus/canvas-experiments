/// <reference path="graphics.ts" />
(function () {
    "use strict";
    var lastTime: number;  //timestamp of last game loop iteration
    var fps: number; //fps calculated in game loop (1 / time delta between frames)
    var canvas: HTMLCanvasElement;
    var context: CanvasRenderingContext2D;
    var spritesheet: HTMLImageElement;
    var frames = [{ x: 0, y: 0 }, { x: 16, y: 0 }, { x: 32, y: 0 }, { x: 48, y: 0 }]
    var animation = [1, 2, 3, 2]
    var lastAnimation = 0;  //timestamp of last animation update
    var animationInterval = 100; //time (in ms) to wait in between animation updates
    var currFrame = 0;
    const spriteSize = 16;

    document.addEventListener("DOMContentLoaded", init);

    function init() {
        canvas = graphics.createCanvas(160, 144);
        document.body.appendChild(canvas);
        graphics.scale(canvas, 4);

        context = canvas.getContext("2d");
        graphics.loadImage("img/kirby.png").then(function (image) {
            spritesheet = image;
        });
        context.fillStyle = "black";
        context.font = "18px monospace";

        gameLoop();

        setInterval(function() {
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

    function update(now: number, msSinceLastUpdate: number) {
        if (now - lastAnimation >= animationInterval) {
            currFrame++;
            if (currFrame >= animation.length) currFrame = 0;
            lastAnimation = now;
        }
    }

    function render() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        //context.fillText("fps: " + fps, 2, 14);
        var frame = getAnimationFrame(currFrame);
        if (spritesheet) context.drawImage(spritesheet, frame.x, frame.y, spriteSize, spriteSize, 72, 64, spriteSize, spriteSize);
    }

    function getAnimationFrame(number) {
        return frames[animation[number]];
    }
}());