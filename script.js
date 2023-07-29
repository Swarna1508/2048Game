// Initialize the game board
let score = 0;
let board;
let rows=4;
let columns=4;

// Start a new game when the page loads
window.onload = function() {
  newGame();
  if(localStorage.getItem('G-best')==null){
    localStorage.setItem('G-best',0);
  }
}

// Function to start a new game
function newGame() {
  // Reset the board and score
  board= Array(rows).fill(null).map(() => Array(columns).fill(0));
  score = 0;
  document.getElementById('msg').style.display='none';
  document.getElementById('score-value').innerText = score;
  document.getElementById('best-score').innerText = localStorage.getItem('G-best');
  updateBoard();
}

// Function to update the game board
function updateBoard() {
  let boardElement = document.getElementById('board');
  boardElement.innerHTML = '';

  for (let r= 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      const tile = document.createElement('div');
      tile.id = r.toString() + "-" + c.toString();
      updateTile(tile,board[r][c]);
      boardElement.append(tile);
    }
  }
  //create 2 to begin the game
  setTwo();
  setTwo();
}


// Function to get the background color for a tile based on its value
function updateTile(tile, num) {
  tile.innerText = "";
  tile.classList.value = ""; //clear the classList
  tile.classList.add("tile");
  if (num > 0) {
      tile.innerText = num.toString();
      if (num <= 4096) {
          tile.classList.add("x"+num.toString());
      } else {
          tile.classList.add("x8192");
      }
  }
}

window.addEventListener('keyup', (e) => {
  if (e.code == "ArrowLeft") {
      slideLeft();
      setTwo();
  }
  else if (e.code == "ArrowRight") {
      slideRight();
      setTwo();
  }
  else if (e.code == "ArrowUp") {
      slideUp();
      setTwo();
  }
  else if (e.code == "ArrowDown") {
      slideDown();
      setTwo();
  }
  // Update the score
  document.getElementById('score-value').innerText = score;
  if(score>localStorage.getItem('G-best')){
    localStorage.setItem('G-best',score);
    document.getElementById('best-score').innerText = localStorage.getItem('G-best');
  }

})

function filterZero(row){
  return row.filter(num => num != 0);
}

function slide(row) {
  row = filterZero(row);
  for (let i = 0; i < row.length-1; i++){
      if (row[i] == row[i+1]) {
          row[i] *= 2;
          row[i+1] = 0;
          score += row[i];
      }
  }
  row = filterZero(row);
  while (row.length < columns) {
      row.push(0);
  }
  return row;
}

function slideLeft() {
  for (let r = 0; r < rows; r++) {
      let row = board[r];
      row = slide(row);
      board[r] = row;
      for (let c = 0; c < columns; c++){
          let tile = document.getElementById(r.toString() + "-" + c.toString());
          let num = board[r][c];
          updateTile(tile, num);
      }
  }
}

function slideRight() {
  for (let r = 0; r < rows; r++) {
      let row = board[r];
      row.reverse();
      row = slide(row)
      board[r] = row.reverse();
      for (let c = 0; c < columns; c++){
          let tile = document.getElementById(r.toString() + "-" + c.toString());
          let num = board[r][c];
          updateTile(tile, num);
      }
  }
}

function slideUp() {
  for (let c = 0; c < columns; c++) {
      let col = [];
      for(let r = 0; r < rows; r++){
        col.push(board[r][c]);
      }
      col = slide(col);
      for (let r = 0; r < rows; r++){
          board[r][c] = col[r];
          let tile = document.getElementById(r.toString() + "-" + c.toString());
          let num = board[r][c];
          updateTile(tile, num);
      }
  }
}

function slideDown() {
  for (let c = 0; c < columns; c++) {
      let col = [];
      for(let r = 0; r < rows; r++){
        col.push(board[r][c]);
      }
      col.reverse();
      col = slide(col);
      col.reverse();
      for (let r = 0; r < rows; r++){
          board[r][c] = col[r];
          let tile = document.getElementById(r.toString() + "-" + c.toString());
          let num = board[r][c];
          updateTile(tile, num);
      }
  }
}

function setTwo() {
  if (!hasEmptyTile()) {
    document.getElementById('msg').style.display='flex';
    document.getElementById('try-btn').addEventListener('click', newGame);
      return;
  }
  let found = false;
  while (!found) {
      //find random row and column to place a 2 in
      let r = Math.floor(Math.random() * rows);
      let c = Math.floor(Math.random() * columns);
      if (board[r][c] == 0) {
          board[r][c] = 2;
          let tile = document.getElementById(r.toString() + "-" + c.toString());
          tile.innerText = "2";
          tile.classList.add("x2");
          found = true;
      }
  }
}

function hasEmptyTile() {
  for (let r = 0; r < rows; r++) {
      for (let c = 0; c < columns; c++) {
          if (board[r][c] == 0) { //at least one zero in the board
              return true;
          }
      }
  }
  return false;
}
// Add event listener for new game button
document.getElementById('new-game-btn').addEventListener('click', newGame);


