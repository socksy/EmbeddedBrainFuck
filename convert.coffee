StringScanner = require("strscan").StringScanner
fs = require('fs')
bf_int = require("./brainfuck.js")

class Convert
	constructor: ()  ->

	convert: (filepath="index.ebs") ->
		file = fs.readFile(filepath, "utf8") 
		s = new StringScanner file
		s.scan (".*(<%bf\s)")
		
		# No brainfuck? Write back file.
		return file if not s.getMatch()?
		
		s.scan("(?:file=\"()\"?)\s(.*)\s%>")
		s.getMatch
		if s.getCapture(0)? 
			inputpath = s.getCapture(0)
			input = fs.readFile(inputpath, "utf8")
		if s.getCapture(1)
			bfprogram = s.getCapture(1)
		else
			console.log "No program!"
		
		if input?
			bf_int.bfRun(bfprogram, input,)
