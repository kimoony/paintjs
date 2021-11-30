const canvas = document.getElementById('jsCanvas');
const ctx = canvas.getContext('2d');
const colors = document.getElementsByClassName('jsColor');
const range = document.getElementById('jsRange');
const mode = document.getElementById('jsMode');
const save = document.getElementById('jsSave');

const INITIAL_COLOR = "#2c2c2c";

// canvas에게 width와 height를 알려준다.
canvas.width = 500;
canvas.height = 400;

// default 값들.
// canvas는 처음에 배경색이 투명으로 되어 있어서 배경색을 지정하지 않고 저장하면
// 뒤가 투명한 색으로 나오게 된다.
// 이것을 방지하기 위해 아래 코드 두 줄을 추가한다.
ctx.fillStyle = "#fff";
ctx.fillRect(0, 0, canvas.width, canvas.height);
// 선의 색
ctx.strokeStyle = INITIAL_COLOR;
// 배경 색
ctx.fillStyle = INITIAL_COLOR;
// 선의 너비
ctx.lineWidth = 2.5;


// 기본적으로 painting은 false 이다.
let painting = false;
let filling = false;

const stopPainting = () => {
  painting = false;
}

const startPainting = () => {
  painting = true;
}

const onMouseMove = (e) => {
  const x = e.offsetX;
  const y = e.offsetY;
  if (!painting) {
    ctx.beginPath();
    // 움직는 동안 path가 만들어진다.
    ctx.moveTo(x, y);
  } else {
    // path의 이전 위치에서 지금 현재 위치까지 선을 이어준다.
    ctx.lineTo(x, y);
    // 현재의 sub-path를 현재의 stroke style로 획을 그음
    ctx.stroke();
  }
}

const handleColorClick = (e) => {
  const color = e.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}

const handleRangeChange = (e) => {
  console.log(e)
  const size = e.target.value;
  ctx.lineWidth = size;
}

const handleModeClick = () => {
  if (filling === true) {
    filling = false;
    mode.innerText = "Fill"
  } else {
    filling = true;
    mode.innerText = "Paint"
  }
}

const handleCanvasClick = () => {
  if (filling) {
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
}

const handleCM = (e) => {
  e.preventDefault();
}

const handleSaveClick = () => {
  const image = canvas.toDataURL('image/png');
  const link = document.createElement('a');
  link.href = image;
  link.download = 'PaintJS';
  link.click();
}


if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", handleCanvasClick);
  canvas.addEventListener("contextmenu", handleCM);  // 우클릭 방지
}

// Array로 만들고 forEach로 color를 돌려서 addEventListener("click", handleColorClick)를 호출
Array.from(colors).forEach(color =>
  color.addEventListener("click", handleColorClick));

if (range) {
  range.addEventListener("input", handleRangeChange);
}

if (mode) {
  mode.addEventListener('click', handleModeClick);
}

if (save) {
  save.addEventListener('click', handleSaveClick);
}