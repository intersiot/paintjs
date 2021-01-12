// 캔버스 위에 마우스를 두면 감지할 수 있도록 하고 싶음.
// 그러기 위해서 캔버스를 가져와야 함.
// canvas를 좀 더 이해하고 싶으면: GO TO canvasAPI
const canvas = document.getElementById("jsCanvas");
// line을 그리기 위해서 필요함.
const ctx = canvas.getContext("2d");
// 색상 변화를 위해서 가져옴
const colors = document.getElementsByClassName("jsColors");
// 선의 사이즈 조절
const range = document.getElementById("jsRange");
// 채우기 버튼
const mode = document.getElementById("jsMode");
// save button
const saveBtn = document.getElementById("jsSave");

const INITIAL_COLOR = "2c2c2c";
const CANVAS_SIZE = 700;

// 캔버스는 2개의 사이즈를 가져야 함. 
// 1. css에서 정의한 캔버스 사이즈
// 2. 픽셀을 다룰 수 있는 엘리먼트의 사이즈(픽셀 사이즈: pixel modifier)
canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
// 우리가 그릴 선에 이 색깔을 주겠다.
ctx.strokeStyle = INITIAL_COLOR;
// 캔버스를 가득 채우는 색깔 초기화
ctx.fillStyle = INITIAL_COLOR;
// 선의 두께를 주겠다.
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function stopPainting() {
  painting = false;
}

function startPainting() {
  painting = true;
}

// 마우스의 움직임을 감지
// 마우스가 움직이는 내내 작동한다!
function onMouseMove(event) {
  // console.log(event);
  // offset: canvas 부분과 관련 있는 값.
  // clientX,Y: 윈도우 전체의 범위 내에서 마우스 위치값
  const x = event.offsetX;
  const y = event.offsetY;
  // console.log(x, y);
  // 마우스를 클릭하지 않고 움직일 때 path를 시작함. *path = line
  // 스크린에서 보이지 않는 path를 만들어서 클릭했을 때 path가 끝나는데
  if (!painting) {
    console.log("creating path in ", x, y);
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    console.log("creating line in ", x, y);
    // path가 끝나는 부분이 페인팅의 시작부분으로 함.
    ctx.lineTo(x, y);
    // path를 스크린에서 보이도록 함.
    // 선이 안보이는 경우 캔버스에 사이즈를 주지 않아서 일 가능성이 있다.
    ctx.stroke();
  }
}

function onMouseDown(event) {
  painting = true;
  // console.log(event);
}

function handleColorClick(event) {
  // console.log(event.target.style);
  const color = event.target.style.backgroundColor;
  // console.log(color);
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}

function handleRangeChange(event) {
  // console.log(event.target.value);
  const size = event.target.value;
  ctx.lineWidth = size;
}

function handleModeClick(event) {
  if (filling === true) {
    filling = false;
    mode.innerText = "Fill"
  } else {
    filling = true;
    mode.innerText = "Paint"
    // ctx.fillStyle = ctx.strokeStyle;
  }
}

function handleCanvasClick() {
  if (filling) {
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  }
}

// 오른쪽 클릭 방지
function handleCM(event) {
  // console.log(event);
  event.preventDefault();
}

// save 버튼 눌렀을 때 이미지 저장되도록
function handleSaveClick() {
  const image = canvas.toDataURL();
  // console.log(image);
  const link = document.createElement("a");
  link.href = image;
  link.download = "paingJS";
  // console.log(link);
  link.click();
}

// 캔버스에 사용될 이벤트들을 정의 및 체크
if (canvas) {
  // 캔버스가 존재하는지 알아봐야 함.
  canvas.addEventListener("mousemove", onMouseMove);
  // 마우스를 클릭했을 때 이벤트: mousedown
  canvas.addEventListener("mousedown", startPainting);
  // 마우스 클릭 후 페인팅은 false로 다시 설정되야 함.
  canvas.addEventListener("mouseup", stopPainting);
  // 마우스가 컨버스를 벗어났을 때 페인팅은 false로 설정되야 함.
  canvas.addEventListener("mouseleave", stopPainting);
  // 마우스 클릭했을 때 색 가득 채우기
  canvas.addEventListener("click", handleCanvasClick);
  // 마우스 오른쪽 클릭 방지
  canvas.addEventListener("contextmenu", handleCM);
}

// console.log(Array.from(colors));
Array.from(colors).forEach(color => 
  color.addEventListener("click", handleColorClick)
);


if (range) {
  range.addEventListener("input", handleRangeChange);
}

if (mode) {
  mode.addEventListener("click", handleModeClick);
}

if (saveBtn) {
  saveBtn.addEventListener("click", handleSaveClick);
}