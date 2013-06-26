function brainfuckValidate (code, max) {
	var loops = 0;
	var others=0; //obv, not really needed.
	var codeLength = code.length;
	var	maximumArraySize = max || 50000;
	
	
	//The meat.
	for (var i=0; i<codeLength && i<maximumArraySize; i++) {
		switch (code.charAt(i)) {
			case "[": loops++; break;
			case "]": loops--; break;
			default : others++; break;
		}
		if (loops<0) {console.log("You closed loops that don't exist!");return false;}
	}

	//Fun
	if (others < 10) {console.log(others + "? corr\', that\'s small!");
	} else if (others < 100) {console.log(others + "? Impressive.");
	} else {console.log(others + "? Huge");}
	//She said it all, on the same night.
	
	if (loops > 0) {console.log("Close your loops!");return false;
	} else {console.log("Validated."); return true;}
	
	
}

var mem = {};
var ptr=0;
function brainfuckInterpret (code, input, max) {
	var codeLength = code.length;	//if I have my vars like this
	var output='';					//they're more readable!
	var input = input || ''; //default vars
	var max = max || 50000;
	
	//Creates two objects loopIn where the key to each [ index is the ] index and vice versa w/ loopOut
	var tmp = []; loopIn = {}, loopOut = {};
	for (var tmpPtr=0; tmpPtr<codeLength; tmpPtr++)
		if (code[tmpPtr]== '[')
			tmp.push(tmpPtr);
		else
			if (code[tmpPtr]==']')
				loopOut[loopIn[tmpPtr]=tmp.pop()]=tmpPtr;
	
	for (var i=0; i<codeLength && i<max; i++) {
	//console.log("loop " + i);
		switch (code[i]) {
			case ">": ptr++; ptr %= max;  break; //Loop around to the other
			case "<": ptr--; ptr %= max; break; //end of the tape.
			case '+': mem[ptr] = ((mem[ptr]||0)+1); break;
			case "-": mem[ptr] = ((mem[ptr]||0)-1); break;
			case ".": output += String.fromCharCode(mem[ptr]); break;
			case ",": mem[ptr] = input.charCodeAt(j++)||0; break;
			case "[": mem[ptr]||(i = loopOut[i]); break;
			case "]": i = loopIn[i]-1; break;
			default: console.log("bollocks!");
		}
	}
	
	return output;
}

//encapsulate both functjions
function brainfuckRun (code, input, max) {
	if (brainfuckValidate(code, max)) { return (brainfuckInterpret(code, input, max));}
	else {return ("Failed to execute.");}
}
console.log("Output: " + brainfuckRun("++++++++++[>+++++++>++++++++++>+++>+<<<<-]>++.>+.+++++++..+++.>++.<<+++++++++++++++.>.+++.------.--------.>+.>."));

