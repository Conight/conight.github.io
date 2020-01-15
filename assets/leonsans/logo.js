const speed = 1;
const fps = 1000 / 60;
const PI2 = 2 * Math.PI;
let cValue = 0;
let leon, controll, time;

function init() {
    generateCanvas();
    controll = {
        size: 100,
        pathGap: 0,
        patternWidth: 20,
        visual: {},
    };

    var logoText = document.getElementById("logo-text");
    leon = new LeonSans({
        text: logoText.innerHTML.replace(/^\s+|\s+$/g, ''),
        size: getSize(65),
        weight: 100,
        pathGap: -1,
        isPath: true
    });
    requestAnimationFrame(animate);
}

function update() {
    ctx.clearRect(0, 0, sw, sh);
    ctx.lineWidth = 0.2;
    const w = controll.patternWidth * leon.scale;
    const total = leon.data.length;
    let i, pos, no = 0;
    let d, j, j_total;

    for (i = 0; i < total; i++) {
        d = leon.data[i].paths;
        j_total = Math.round(d.length * leon.drawing[i].value);
        for (j = 0; j < j_total; j++) {
            pos = d[j];
            ctx.fillStyle = randomColor(no);
            ctx.strokeStyle = randomColor(no);
            ctx.beginPath();
            ctx.arc(pos.x, pos.y, w, 0, PI2);
            ctx.stroke();
            no += 1;
        }
    }

    cValue -= speed;
}

function randomColor(no) {
    return "hsl(" + (no + cValue) + ',' + '70%,' + '50%)';
}

function animate(t) {
    requestAnimationFrame(animate);

    const x = (sw - leon.rect.w) / 2;
    const y = (sh - leon.rect.h) / 2;
    leon.position(x + moveX, y + moveY);

    if (t) {
        if (!time) time = t;
        if (t - time > fps) {
            time = t;
            update();
        }
    }
}

window.onload = () => {
    init();
};
