"use strict";

var sys = require('sys'),
	http = require('http'),
	path = require('path'),
	url = require('url'),
	fs = require('fs');

var returnFile = function(fullPath, response) {

	fs.exists(fullPath, function(exists) {

		if(!exists) {

			response.writeHeader(404, {"Content-Type": "text/plain"});
			response.write("404 Not Found\n");
			response.end();

			sys.puts("Invalid Request for path '" + fullPath + "'.");
		} else {

			fs.readFile(fullPath, "binary", function(err, file) {

				if(err) {

					response.writeHeader(500, {"Content-Type": "text/plain"});
					response.write(err + '\n');
					response.end();

					sys.puts("Error while reading path '" + fullPath + "'.");
				} else {

					response.writeHeader(200, {"Content-Type": getContentType(fullPath)});
					response.write(file, "binary");
					response.end();

					sys.puts("Successful Request for '" + fullPath + "'.");
				}
			});
		}
	});
};

var getContentType = function(string) {

	var split = string.split('.'),
		ext = split.pop();

	switch(ext) {
		case 'html':
			return "text/html";
		case 'js':
			return "application/javascript";
		default:
			return "text/plain";
	}
};

http.createServer(function(request, response) {

	var reqPath = url.parse(request.url).pathname,
		fullPath = path.join(process.cwd(), reqPath);

	returnFile(fullPath, response);
}).listen(8080);

console.log('Server Running on 8080!');
