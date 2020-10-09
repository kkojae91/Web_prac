const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
// Context default style
ctx.strokeStyle = "#2c2c2c";
ctx.lineWidth = 2.5;

let painting = false;

function onMouseMove(event){
    const x = event.offsetX;
    const y = event.offsetY;
    // console.log(x,y);
    if (!painting){
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else{
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}
function stopPainting(){
    painting = false;
}

function startPainting(){
    painting = true;
}

function onMouseDown(event){
    // console.log(event);
    painting = true;
}

if (canvas){
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
}