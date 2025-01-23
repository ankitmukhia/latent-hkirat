export function randomNumGenerator(digit: number) {
	let result = '';
	if(digit < 0) {
		result += "Digit should not be less then 0"
		return	result 
	}
	// Math.pow(x, y) = x^y
	const min = Math.pow(10, digit - 1);
	const max = Math.pow(10, digit) - 1;
	
	result += Math.floor(min + Math.random() * (max - min + 1))
	return	result 
}
