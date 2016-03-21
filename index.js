/**
 * Created by chaika on 20.03.16.
 */
var prepr = require("./src/prepr")
var through = require('through');

exports.browserify = function(defined) {
    return function(file) {
        var data = '';

        return through(function(buf) {
            data += buf;
        }, function() {
            var preprocessedFileContents = prepr.preprocess(data, defined);

            this.queue(preprocessedFileContents);
            this.queue(null);
        });
    }
};