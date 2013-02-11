#!/usr/bin/env node

var http = require('http');
var argv = require('optimist')
	.usage('Usage: $0 [method] [url]')
	.argv
;

var options = {};

if (argv._.length > 0) {
	if (argv._.length > 1)
		options.method = argv._[0].toUpperCase();

	var match = argv._[argv._.length == 2 ? 1 : 0].match(/^(((.*?):(.*?))@)?([^:\/\s]+)?(:(\d+))?(\/(.*))?/);

	if (!match) {
		console.log('Invalid URL!');
		process.exit(1);
	}

	options.hostname = match[5] ? match[5] : 'localhost';
	if (match[2])
		options.auth = match[2];
	if (match[8])
		options.path = match[8];
	if (match[7])
		options.port = match[7];
}
else {
	options.hostname = 'localhost';
}

var data = '';

var req = http.request(options, function(res) {
	res.setEncoding('utf8');
	res.on('data', function(chunk) {
		data += chunk;
	});
	res.on('end', function() {
		console.log(JSON.stringify({'options': options, 'response': {'statusCode': res.statusCode, 'headers': res.headers, 'data': JSON.parse(data)}}, null, 3));
	});
});

req.on('error', function(e) {
	console.log('Error: ' + e.message);
});

if (options.method == 'POST')
	process.stdin.pipe(req);
else
	req.end();
