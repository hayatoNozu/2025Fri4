const canvas = document.getElementById("ticTacToe");
const ctx = canvas.getContext("2d");
const size = 300;
const cellSize = size / 3;

let board = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""]
];

let currentPlayer = "O";
let gameFin = false;

// グリッドとマークの描画
function drawGrid() {
  ctx.clearRect(0, 0, size, size);
  ctx.lineWidth = 2;
  ctx.strokeStyle = "#000";

  for (let i = 1; i < 3; i++) {
    // 縦線
    ctx.beginPath();
    ctx.moveTo(i * cellSize, 0);
    ctx.lineTo(i * cellSize, size);
    ctx.stroke();

    // 横線
    ctx.beginPath();
    ctx.moveTo(0, i * cellSize);
    ctx.lineTo(size, i * cellSize);
    ctx.stroke();
  }

  // マークを描く
  for (let y = 0; y < 3; y++) {
    for (let x = 0; x < 3; x++) {
      const mark = board[y][x];
      if (mark === "O") {
        drawO(x, y);
      } else if (mark === "X") {
        drawX(x, y);
      }
    }
  }
}

// ○を描画
function drawO(x, y) {
  const centerX = x * cellSize + cellSize / 2;
  const centerY = y * cellSize + cellSize / 2;
  const radius = cellSize / 3;
  ctx.strokeStyle = "blue";
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
  ctx.stroke();
}

// ×を描画
function drawX(x, y) {
  const offset = cellSize / 4;
  const startX = x * cellSize + offset;
  const startY = y * cellSize + offset;
  const endX = (x + 1) * cellSize - offset;
  const endY = (y + 1) * cellSize - offset;
  ctx.strokeStyle = "red";
  ctx.lineWidth = 4;

  ctx.beginPath();
  ctx.moveTo(startX, startY);
  ctx.lineTo(endX, endY);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(endX, startY);
  ctx.lineTo(startX, endY);
  ctx.stroke();
}

function checkWin(player){
 for(let i = 0; i<3; i++){
   if(board[i][0] === player && board[i][1] == player && board[i][2] ==player) return true;
    if(board[0][i] === player && board[1][i] == player && board[2][i] ==player) return true;
 }
　if (board[0][0] === player && board[1][1] === player && board[2][2] === player) return true;
  if (board[0][2] === player && board[1][1] === player && board[2][0] === player) return true;
  return false;
}

// クリック時の処理（勝敗判定なし）
canvas.addEventListener("click", (e) => {
  if(gameFin)return;
  const rect = canvas.getBoundingClientRect();
  const x = Math.floor((e.clientX - rect.left) / cellSize);
  const y = Math.floor((e.clientY - rect.top) / cellSize);

  if (board[y][x] === "") {
    board[y][x] = currentPlayer;
    
    drawGrid();
    if(checkWin(currentPlayer)){
      alert(`${currentPlayer} の勝ち！`);
      gameFin = true;
      return;
    }
    
    currentPlayer = currentPlayer === "O" ? "X" : "O";
  }
});

document.getElementById("resetButton").addEventListener("click", () => {
  board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
  ];
  currentPlayer = "O";
  gameFin = false;
  drawGrid();
});
// 初期描画
drawGrid();