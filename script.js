const updateCycles = 100; // specifies how many times update runs before checking theme

const canvasID = "time-canvas";
let canvas;
let context;

const canvasTextSizePx = 20;

async function main() { // run start once, and execute continuously
	start();

	while (true) {
		await execute();
	}
}

function start() { // This function runs once when the page refreshes
	// Initialize the canvas
	canvas = document.getElementById(canvasID);
	context = canvas.getContext("2d");

	context.font = `${canvasTextSizePx}px 'Courier New', Courier, monospace`;

	setFillStyleFromTheme();
}

async function execute() {
	// Run a set amount of cycles before updating theme
	for (let i = 0; i < updateCycles; i++) {
		drawTimeToCanvas();
		await sleep(1);
	} 
	setFillStyleFromTheme();
}

function sleep(ms) {
	return new Promise(function(resolve) { setTimeout(resolve, ms); });
}

function setFillStyleFromTheme() {
	const colorScheme = window.getComputedStyle(document.documentElement).getPropertyValue('content').replace(/"/g, '');
	context.fillStyle = (colorScheme == "light") ? "black" : "white";
}

function drawTimeToCanvas() {
	context.clearRect(0, 0, canvas.width, canvas.height);
	context.fillText(deMilitarizeDate(new Date()), 0, 15);
}

function deMilitarizeNumber(number, max) {
	if ( (number % max) == 0 ) { return ( max + ((number % (2 * max))? "pm" : "am") )}

	if ( (number <= max) ) { return (number + "am") }

	return ( (number % max) + "pm" )
}

function deMilitarizeDate(date) {
	// let month = de_mil(date.getMonth(), 6);
	// let day = de_mil(date.getDate(), 16); // 16 because I'd rather not loop inside months, and decimals aren't an option

	let hour = makeLength(deMilitarizeNumber(date.getHours(), 12), 4);
	let minute = makeLength(deMilitarizeNumber(date.getMinutes(), 30), 4);
	let second = makeLength(deMilitarizeNumber(date.getSeconds(), 30), 4);
	let millisecond = makeLength(deMilitarizeNumber(date.getMilliseconds(), 500), 5);

	return ( /*`${date.getDate()} ${month}/${day}/${date.getFullYear()} `*/ `${hour}:${minute}:${second}:${millisecond}` )
}

function makeLength(string, minLength) {
	if ( string.length > minLength ) { return ( string ); } // This should be impossible with the current usecase
	
	return ( "0".repeat(minLength - string.length) + string )
}
