(function() {
  var Convert, StringScanner, bf_int, fs;
  StringScanner = require("strscan").StringScanner;
  fs = require('fs');
  bf_int = require("./brainfuck.js");
  Convert = (function() {
    function Convert() {}
    Convert.prototype.convert = function(filepath) {
      var bfprogram, file, input, inputpath, s;
      if (filepath == null) {
        filepath = "index.ebs";
      }
      file = fs.readFile(filepath, "utf8");
      s = new StringScanner(file);
      s.scan(".*(<%bf\s)");
      if (!(s.getMatch() != null)) {
        return file;
      }
      s.scan("(?:file=\"()\"?)\s(.*)\s%>");
      s.getMatch;
      if (s.getCapture(0) != null) {
        inputpath = s.getCapture(0);
        input = fs.readFile(inputpath, "utf8");
      }
      if (s.getCapture(1)) {
        bfprogram = s.getCapture(1);
      } else {
        console.log("No program!");
      }
      if (input != null) {
        return bf_int.bfRun(bfprogram, input);
      }
    };
    return Convert;
  })();
}).call(this);
