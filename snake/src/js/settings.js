// Задаем настройки переменных в игре
var mycanvas = document.getElementById('mycanvas'); 
var ctx = mycanvas.getContext('2d'); // Определяем, что будет использован двумерный контекст
var snakeSize = 10; // Размер змеи
var w = 350; // Ширина игрового поля
var h = 350; // Высота игрового поля
var score = 0; // Счет
var snake; // Змея
var food; // Еда