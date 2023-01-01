function replace_date(id) {
	let now = new Date();

	date = de_mil_date(now);

	document.getElementById(id).innerText = date;

	console.log("date replaced");
}

function de_mil(number, max) {
	if ( (number % max) == 0 ) { return ( max + ((number % (2 * max))? " pm" : " am") )}

	if ( (number <= max) ) { return (number + " am") }

	return ( (number % max) + " pm" )
}

function de_mil_date(date) {
	// let month = de_mil(date.getMonth(), 6);
	// let day = de_mil(date.getDate(), 16); // 16 because I'd rather not loop inside months, and decimals aren't an option

	let hour = make_length(5, de_mil(date.getHours(), 12));
	let minute = make_length(5, de_mil(date.getMinutes(), 30));
	let second = make_length(5, de_mil(date.getSeconds(), 30));
	let millisecond = make_length(6, de_mil(date.getMilliseconds(), 500));

	return ( /*`${date.getDate()} ${month}/${day}/${date.getFullYear()} `*/ `${hour}:${minute}:${second}:${millisecond}` )
}

function make_length(length, string) {
	if ( string.length > length ) { return ( string ); }
	return ( "0".repeat(length - string.length) + string )
}