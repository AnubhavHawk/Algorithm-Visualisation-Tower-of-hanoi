var canvas = document.querySelector('canvas');
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
c = canvas.getContext('2d');

function drawTowers(ctx)
{
    //Base of the towers 
    ctx.font = '30px helvetica';
    ctx.beginPath();
    ctx.moveTo(200, 400)
    ctx.lineTo(1000, 400);
    ctx.stroke()

    //peg A
    ctx.beginPath();
    ctx.moveTo(400, 400)
    ctx.fillText('A', 390, 430);
    ctx.lineTo(400, 100)
    ctx.stroke()

    //peg B
    ctx.beginPath();
    ctx.moveTo(600, 400)
    ctx.fillText('B', 590, 430);
    ctx.lineTo(600, 100)
    ctx.stroke()

    //peg C
    ctx.beginPath();
    ctx.moveTo(800, 400)
    ctx.fillText('C', 790, 430)
    ctx.lineTo(800, 100)
    ctx.stroke()
}
var source = 'A';
var aux = 'B';
var destination = 'C';
var disk = 3;
drawTowers(c);
x = 10;
y = 10;
dx = 2;
dy = 1;

function animate()
{
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);    
    
    c.fillRect(x, y, 10, 10);
    if(x > innerWidth || x < 0)
        dx = -dx;
    x += dx;
    drawTowers(c)
}
function Disk()
{
    
}
rectLen = 100;
rectHeight = 20;
c.fillStyle = 'rgba(0,0,255, 0.5)'
c.fillRect(400 - rectLen, 400, 2 * rectLen, -rectHeight )
rectLen /= 1.2
c.fillRect(400 - rectLen, 400 - rectHeight-2, 2 * rectLen, -rectHeight )
// animate()