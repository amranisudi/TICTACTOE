// let displayText = document.querySelectorAll("h2");
let displayText = document.getElementsByTagName("h2")[0]
let game_board = ['', '', '',
				  '', '', '',
				  '', '', '',]
let winningCases = [[0, 1, 2],
					[3, 4, 5],
					[6, 7, 8],
					[0, 3, 6],
					[1, 4, 7],
					[2, 5, 8],
					[0, 4, 8],
					[2, 4, 6]];

let running = true;
let currentPlayer = "X";

const callDraw = () =>  "it is a draw"
let playerwon = () => "the winner is:" + currentPlayer;
let Turntext = () => "it is " +currentPlayer + "turn";

displayText.innerText = Turntext();

function HandleChange(clickedIndex, clickedEvent){
	game_board[clickedIndex] = currentPlayer;
	update();
}

function HandleValidation(){
	for(let i = 0; i < winningCases.length; i++){
		let winCase = winningCases[i];
		let a = game_board[winCase[0]];
		let b = game_board[winCase[1]];
		let c = game_board[winCase[2]];
		if(a == b && b == c && a !=""){
			displayText.innerText = playerwon();
			running = false;
			return;
		}
	}
	let isDraw = !game_board.includes('')

	if(isDraw == true){
		displayText.innerText = callDraw();
		return;
	}
	currentPlayer = currentPlayer === "X"?"O":"X";
	displayText.innerText = Turntext();
}
function HandleClickEvent(clickedEvent){
	let clickedIndex = clickedEvent.target.getAttribute("data-cell-index");
	if(game_board[clickedIndex] !== '' || running === false){
		return;
	}
	HandleChange(clickedIndex, clickedEvent)
	HandleValidation()
}
function HandleRestartGame(){
	running = true;
	currentPlayer = "X";
	game_board = ['', '', '',
				  '', '', '',
				  '', '', '',]
	displayText.innerText = Turntext();
	update()
}
function update(){
	document.querySelectorAll(".cell").forEach((cell, index) => cell.innerText = game_board[index])
}

document.querySelectorAll(".cell").forEach(cell => cell.addEventListener("click", HandleClickEvent))
let button = document.querySelector(".restartButton");
button.addEventListener("click", HandleRestartGame);