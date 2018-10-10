// Функция для отрисовки основных элементов игры

//
var drawModule = (function () { 

	var bodySnake = function(x, y) {
		ctx.fillStyle = 'green';
		ctx.fillRect(x*snakeSize, y*snakeSize, snakeSize, snakeSize); // создание прямоугольника (внутренней части змеи), имеющего начальную точку с координатами (x, y), а так же заданную ширину и высоту
		ctx.strokeStyle = 'darkgreen';
		ctx.strokeRect(x*snakeSize, y*snakeSize, snakeSize, snakeSize); // создание прямоугольника (обводки змеи), имеющего начальную точку с координатами (x, y), а так же заданную ширину и высоту
	}

	var apple = function(x, y) {
		ctx.fillStyle = 'yellow';
		ctx.fillRect(x*snakeSize, y*snakeSize, snakeSize, snakeSize); // создание прямоугольника (внутренней части яблока), имеющего начальную точку с координатами (x, y), а так же заданную ширину и высоту
		ctx.fillStyle = 'red';
		ctx.fillRect(x*snakeSize+1, y*snakeSize+1, snakeSize-2, snakeSize-2); // создание прямоугольника (обводки яблока), имеющего начальную точку с координатами (x, y), а так же заданную ширину и высоту
	}