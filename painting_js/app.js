const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");
const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 500;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;
// Context default style
ctx.fillStyle = "white";
ctx.fillRect(0,0,CANVAS_SIZE,CANVAS_SIZE);
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function onMouseMove(event){
    const x = event.offsetX;
    const y = event.offsetY;
    // console.log(x,y);
    if (!painting){
        // console.log("creating path in ", x, y);
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else{
        // console.log("creating line in ", x, y);
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

function handleColorClick(event){
    // console.log(event.target.style);
    const color = event.target.style.backgroundColor;
    // console.log(color);
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function handleRangeChange(event){
    // console.log(event.target.value);
    const size = event.target.value;
    ctx.lineWidth = size;
}

function handleModeClick(){
    if (filling === true){
        // default 값은 paint
        filling = false;
        mode.innerText = "Fill";
    } else {
        filling = true;
        mode.innerText = "paint";
    }
}

function handleCanvasClick(){
    // filling 값이 true일 경우에만 filling을 실행해준다.
    if (filling){
        ctx.fillRect(0,0,CANVAS_SIZE,CANVAS_SIZE);
    }
}

// 마우스 우클릭 막기!
function handleCM(event){
    // console.log(event);
    event.preventDefault();
}

function handleSaveClick(){
    // toDataURL()  -->> default값은 png
    // 다른 확장자를 갖고 싶으면 ("image/jpeg") 라고 명시해줘야한다.
    const image = canvas.toDataURL();
    // console.log(image);
    const link = document.createElement("a");
    link.href = image;
    link.download = "PaintJS[화이팅]";
    // console.log(link);
    // 클릭했을때 download가 되게 끔 만들어주기.
    link.click();
}

if (canvas){
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleCM);
}

// Array.from() object를 array로 만들어준다.
// console.log(Array.from(colors));

// color => color.addEventListener()  -->> 여기에서 color는 다른 변수 명으로 바뀌어도 상관없다.
// 각각의 div태그를 가르키는 별칭일 뿐. potato로 해도 잘 동작 합니다.
Array.from(colors).forEach(fd => fd.addEventListener("click", handleColorClick));

// 객체가 생성되지 않았을 수도 있어서 if 로 감싸준다.
if (range){
    // input type이 range인 경우에는 "input"에 반응한다.
    range.addEventListener("input", handleRangeChange);
}

if (mode){
    mode.addEventListener("click", handleModeClick);
}

if (saveBtn){
    saveBtn.addEventListener("click", handleSaveClick);
}