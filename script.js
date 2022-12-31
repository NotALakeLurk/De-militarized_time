function replace_date(id) {
	let now = new Date();

	date = de_mil_date(now);

	document.getElementById(id).innerText = `The current time is: ${date}`;
}

function de_mil(number, max) {
	if ( (number % max) == 0 ) { return ( max + ((number % (2 * max))? " pm" : " am") )}

	if ( (number <= max) ) { return (number + " am") }

	return ( (number % max) + " pm" )
}

function de_mil_date(date) {
	// let month = de_mil(date.getMonth(), 6);
	// let day = de_mil(date.getDate(), 16); // 16 because I'd rather not loop inside months, and decimals aren't an option
	let hour = de_mil(date.getHours(), 12);
	let minute = de_mil(date.getMinutes(), 30);
	let second = de_mil(date.getSeconds(), 30);
	let millisecond = de_mil(date.getMilliseconds(), 500);

	return ( /*`${date.getDate()} ${month}/${day}/${date.getFullYear()} `*/ `${hour}:${minute}:${second}:${millisecond}` )
}

async function run(id) {
	replace_date(id);

	await sleep(1)
}

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}