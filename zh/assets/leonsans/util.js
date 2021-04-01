const pixelRatio = 2;
let moveX = 0, moveY = 0, offsetX = 0, offsetY = 0;
let canvas, ctx;
let sw = 150;
let sh = 35;

function generateCanvas() {
    canvas = document.getElementById("logo-canvas");
    ctx = canvas.getContext("2d");

    window.addEventListener('resize', canvasResize, false);
    canvasResize();

    moveEvent(canvas);
}

function canvasResize() {
    sw = 150;
    sh = 35;

    canvas.width = sw * pixelRatio;
    canvas.height = sh * pixelRatio;
    canvas.style.width = sw + 'px';
    canvas.style.height = sh + 'px';
    ctx.scale(pixelRatio, pixelRatio);
}

function moveEvent(canvas) {
    const hammer = new Hammer(canvas);
    hammer.add(new Hammer.Pan({direction: Hammer.DIRECTION_ALL, threshold: 0}));
    hammer.on("pan", (e) => {
        moveX = e.deltaX + offsetX;
        moveY = e.deltaY + offsetY;
        if (e.isFinal) {
            offsetX = moveX;
            offsetY = moveY;
        }
    });
}

function getSize(size) {
    let ratio = Math.sqrt(sw * sw + sh * sh) / 1800;
    if (ratio > 1) ratio = 1;
    else if (ratio < 0.5) ratio = 0.5;
    return size * ratio;
}