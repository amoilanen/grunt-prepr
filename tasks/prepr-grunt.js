var prepr = require("../src/prepr"),
    fs = require("fs"),
    path = require("path");

module.exports = function(grunt) {

    grunt.registerMultiTask('prepr', 'Preprocess source file', function() {
        var defined = this.data.defined || [],
            files = grunt.file.expand(this.data.src),
            destFolder = this.data.dest,
            logging = this.data.logging || false;
        var options = {
          keepLineBreaks: this.data.keepLineBreaks || false
        };

        files.forEach(function(file) {
            if (fs.lstatSync(file).isFile()) {
                if (logging) {
                    console.log("Preprocessing " + file);
                }
                var fileContents = fs.readFileSync(file).toString(),
                    preprocessedFileContents = prepr.preprocess(fileContents, defined, options),
                    destFile = destFolder ? destFolder + path.sep + path.basename(file) : file;
                if (logging) {
                    console.log("Writing to " + destFile);
                }
                fs.writeFileSync(destFile, preprocessedFileContents);
            }
        });
    });
};