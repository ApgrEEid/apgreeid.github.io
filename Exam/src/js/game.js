// Задаем переменную для canvas.
var canvas;

// Задаем переменную для типа canvas. В нашем случае будет использоваться двумерное представление.
var canvasContext;

// Задаем начальную позичию шара.
var ballX = 50;
var ballY = 50;

// Задаем скорость шара по горизонтали и вертикали.
var ballSpeedX = 10;
var ballSpeedY = 4;

// Задаем счет игроков
var player1Score = 0;
var player2Score = 0;

// Задаем переменную достижения победы.
const WINNING_SCORE = 3;

// Задаем переменную, отвечающую за показ победного экрана.
var showWinScreen = false;

// Задаем настройки ракеток.
var paddle1Y = 250;
var paddle2Y = 250;
const PADDLE_HEIGHT = 100;
const PADDLE_THICKNESS = 10;


// Функция, отвечающая за отслеживание позиции мыши для управления первым игроком.
function calculateMousePos(evt) {
	var rect = canvas.getBoundingClientRect();
	var root = document.documentElement;
	var mouseX = evt.clientX - rect.left - root.scrollLeft;
	var mouseY = evt.clientY - rect.top - root.scrollTop;
	return { x: mouseX, y: mouseY };
}

// Если победный экран был показан игроку - после клика обнуляется счет.
function handleMouseClick(evt) {
	if (showWinScreen) {
		player1Score = 0;
		player2Score = 0;
		showWinScreen = false;
	}
}

// Запускаем функцию во время загрузки страницы
window.onload = function() {
	// Получаем 'gamCanvas' id тег из HTML-файла и настраиваем логику игры.
	canvas = document.getElementById("gameCanvas");
	canvasContext = canvas.getContext("2d");

	// Задаем количество кадров в секунду, с которым двигается шар.
	var framesPerSecond = 60;
	setInterval(function() {
		/* Вызывает функции moveEverything и drawEverything в одно и тоже время. Это позволит нам не обращаться к одним и тем же функциям в других частях программы*/
		moveEverything();
		drawEverything();
	}, 1000 / framesPerSecond);
	
	// eventListener отвечает за управление движением первого игрока с помощью мыши.'
	canvas.addEventListener("mousedown", handleMouseClick);

	canvas.addEventListener("mousemove", function(evt) {
		var mousePos = calculateMousePos(evt);
		paddle1Y = mousePos.y - PADDLE_HEIGHT / 2;
	});
};

// Данная функция обнуляет счет, если кто-то из игроков попадает на победный экран.
function ballReset() {
	if (player1Score >= WINNING_SCORE || player2Score >= WINNING_SCORE) {
		showWinScreen = true;
	}

	ballSpeedX = -ballSpeedX;
	ballX = canvas.width / 2;
	ballY = canvas.height / 2;
}

// Данная функция определяет простейший интеллект компьютера, который в зависимости от положения шара перемещается вверх или вниз.
function computerMovement() {
	var paddle2YCenter = paddle2Y + PADDLE_HEIGHT / 2;
	if (paddle2YCenter < ballY - 35) {
		paddle2Y += 6;
	} else if (paddle2YCenter > ballY + 35) {
		paddle2Y -= 6;
	}
}

// Функция, определяющая границы для перемещения шара.
function moveEverything() {
	if (showWinScreen) {
		return;
	}
	computerMovement();

	ballX += ballSpeedX;
	ballY += ballSpeedY;

	if (ballX < 0) {
		if (ballY > paddle1Y && ballY < paddle1Y + PADDLE_HEIGHT) {
			ballSpeedX = -ballSpeedX;

			var deltaY = ballY - (paddle1Y + PADDLE_HEIGHT / 2);
			ballSpeedY = deltaY * 0.35;
		} else {
			player2Score++;
			ballReset();
		}
	}
	/* Если шар достигает края canvas и превышает его ширину, то он будет отскакивать назад с такой же скоростью */
	if (ballX > canvas.width) {
		if (ballY > paddle2Y && ballY < paddle2Y + PADDLE_HEIGHT) {
			ballSpeedX = -ballSpeedX;
			var deltaY = ballY - (paddle2Y + PADDLE_HEIGHT / 2);
			ballSpeedY = deltaY * 0.35;
		} else {
			player1Score++;
			ballReset();
		}
	}
	if (ballY < 0) {
		ballSpeedY = -ballSpeedY;
	}
	/* Если шар достигает края canvas и превышает его высоту, то он будет отскакивать назад с такой же скоростью */
	if (ballY > canvas.height) {
		ballSpeedY = -ballSpeedY;
	}
}

// Функция, отрисовывающая сетку в центре поля.
function drawNet() {
	for (var i = 0; i < canvas.height; i += 40) {
		colorRect(canvas.width / 2 - 1, i, 2, 20, "white");
	}
}

function drawEverything() {
	// Создание черного фона поля.
	colorRect(0, 0, canvas.width, canvas.height, "black");

	if (showWinScreen) {
		canvasContext.fillStyle = "white";
		// Если условия победы соблюдены для первого игрока - будет выведено сообщение из canvas.fillText.
		if (player1Score >= WINNING_SCORE) {
			canvasContext.fillText("Left Player Won!", 450, 125);
		// Если условия победы соблюдены для второго игрока - будет выведено сообщение из canvas.fillText.
		} else if (player2Score >= WINNING_SCORE) {
			canvasContext.fillText("Right Player Won!", 450, 125);
		}
		canvasContext.fillText("click to continue", 450, 500);
		return;
	}
	// Вызов функции для отрисовки игры в дальнейшем.
	drawNet();

	// Создание рокетки левого игрока.
	colorRect(0, paddle1Y, PADDLE_THICKNESS, PADDLE_HEIGHT, "white");
	// Создание правой рокетки компьютера.
	colorRect(
		canvas.width - PADDLE_THICKNESS,
		paddle2Y,
		PADDLE_THICKNESS,
		PADDLE_HEIGHT,
		"white"
	);
	// Создание шара.
	colorCircle(ballX, ballY, 10, "white");

	// Создание счета у каждого игрока
	canvasContext.fillText(player1Score, 100, 100);
	canvasContext.fillText(player2Score, canvas.width - 100, 100);
}
// Функция, отвечающая за параметры шара.
function colorCircle(centerX, centerY, radius, drawColor) {
	canvasContext.fillStyle = drawColor;
	canvasContext.beginPath();
	canvasContext.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
	canvasContext.fill();
}

function colorRect(leftX, topY, width, height, drawColor) {
	canvasContext.fillStyle = drawColor;
	canvasContext.fillRect(leftX, topY, width, height);
}