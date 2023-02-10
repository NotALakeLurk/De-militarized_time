// function replace_date(id) {
// 	let now = new Date();

// 	date = de_mil_date(now);

// 	document.getElementById(id).innerText = date;

// 	console.log("date replaced");
// }

async function draw_date_to_canvas(id) {
	const canvas = document.getElementById(id);
	const context = canvas.getContext("2d"); // Note `id` needs to point to a canvas
	
	function updateTheme() {
			
		const color_scheme = window.getComputedStyle(document.documentElement).getPropertyValue('content').replace(/"/g, '');
		context.fillStyle = (color_scheme == "light") ? "black" : "white";
	}
	const text_size_px = 20;
	context.font = `${text_size_px}px 'Courier New', Courier, monospace`; // Not super sure about this line 
	updateTheme();
	let i = 0;
	let checkThemeTimeoutMs = 20; //Specifies how often the script will check for a theme update in miliseconds.
	while (true) {
		if (i >= checkThemeTimeoutMs) {
			updateTheme(); //Checks for theme update
			i = 0; //resets counter
		}
		context.clearRect(0, 0, canvas.width, canvas.height);
		context.fillText(de_mil_date(new Date()), 0, 15);
		await new Promise(
			function(resolve, reject) {
				// $output.append("start");

				setTimeout(
					function() {
						resolve()
					}, 1 // ms I presume
				); 
			i++;
			}
		) // .then(function(){$("#output")})
		// break;
	}
}

function de_mil(number, max) {
	if ( (number % max) == 0 ) { return ( max + ((number % (2 * max))? "pm" : "am") )}

	if ( (number <= max) ) { return (number + "am") }

	return ( (number % max) + "pm" )
}

function de_mil_date(date) {
	// let month = de_mil(date.getMonth(), 6);
	// let day = de_mil(date.getDate(), 16); // 16 because I'd rather not loop inside months, and decimals aren't an option

	let hour = make_length(4, de_mil(date.getHours(), 12));
	let minute = make_length(4, de_mil(date.getMinutes(), 30));
	let second = make_length(4, de_mil(date.getSeconds(), 30));
	let millisecond = make_length(5, de_mil(date.getMilliseconds(), 500));

	return ( /*`${date.getDate()} ${month}/${day}/${date.getFullYear()} `*/ `${hour}:${minute}:${second}:${millisecond}` )
}

function make_length(length, string) {
	if ( string.length > length ) { return ( string ); }
	return ( "0".repeat(length - string.length) + string )
}
