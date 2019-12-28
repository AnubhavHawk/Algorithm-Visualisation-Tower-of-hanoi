var canvas = document.querySelector('canvas');
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
c = canvas.getContext('2d');

function Pole(center, name)
{
    this.center = center;
    this.length = 100;
    this.name = name;
    this.diskCount = 0;
    this.draw = function(){
        c.beginPath();
        c.fillText(this.name, center - 10, 430);
        c.moveTo(center, 400)
        c.lineTo(center, this.length);
        c.stroke();
    }
    this.increaseCount = function(){
        this.diskCount++;
    }
    this.decreaseCount = function(){
        this.diskCount--;
    }
}

function drawTowers(ctx)
{
    //Base of the towers 
    ctx.font = '30px helvetica';
    ctx.beginPath();
    ctx.moveTo(200, 400)
    ctx.lineTo(1000, 400);
    ctx.stroke()

    //peg A
    pole1 = new Pole(400, 'A')
    pole1.draw();

    //peg B
    pole2 = new Pole(600, 'B')
    pole2.draw();

    //peg C
    pole3 = new Pole(800, 'C')
    pole3.draw();
}
drawTowers(c);
x = 10;
y = 10;
dx = 2;
dy = 1;

function Disk(pole, weight)
{
    this.length = 100
    var base = 400
    this.height = 20
    this.weight = weight
    this.x = pole.center - (this.length / this.weight)
    this.width = 2 *(this.length / this.weight)
    this.y = base - pole.diskCount *(this.height + 2);

    this.removeDisk = function(){
        pole.decreaseCount(); // decrease the count of the disk in that pole
        c.clearRect(this.x +1 , this.y, this.width - 1, -this.height )
        drawTowers(c); // to draw the poles again after erasing the disk
    }
    this.drawDisk = function(){
        pole.increaseCount() //increase the count of the disk in that pole
        c.beginPath();
        c.moveTo(this.x, this.y)
        c.fillStyle = 'rgba(0,0,255, 0.5)';
        c.fillRect(this.x + 1, this.y, this.width - 1, -this.height); // adding and subtracting 1 so the disks on the same level don't look overlapping
    }
}
// rectLen = 100;
// rectHeight = 20;
// c.fillStyle = 'rgba(0,0,255, 0.5)'
// c.fillRect(400 - rectLen, 400, 2 * rectLen, -rectHeight )
// rectLen /= 1.2
// c.fillRect(400 - rectLen, 400 - rectHeight-2, 2 * rectLen, -rectHeight )
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
// animate()

// -------------tower of hanoi algorithm starts----------------
var source = pole1;
var aux = pole2;
var destination = pole3;
// var noOfDisk = 3;
var n = prompt('ENter the number of disks');
weight = n - 1;
var disks = []
for(var i = 0; i < n; i++)
{
    disks.push(new Disk(source, weight ))
    disks[i].drawDisk();
    weight++;
}
function towerOfHanoi(n, source, destination, aux)
{
    // requestAnimationFrame(towerOfHanoi)
    if(n == 1)
    {
        console.log('move disk 1 from peg '+source.name+' to peg '+destination.name+'\n')
        disks[disks.length - 1].removeDisk()
        disks[disks.length - 1].drawDisk(destination, disks[disks.length - 1].weight )
        return;
    }
    towerOfHanoi(n-1, source, aux, destination)
    disks[disks.length - n].removeDisk()
    console.log('move disk '+n+' from peg '+source.name+' to peg '+destination.name+'\n')
    towerOfHanoi(n-1, aux, destination, source)
    disks[disks.length - n].drawDisk(aux, disks[disks.length - n].weight)
}
// towerOfHanoi(n, pole1, pole3, pole2);
