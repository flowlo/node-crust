#!/usr/bin/env node

var http = require('http');
var argv = require('optimist')
	.usage('Usage: $0 [method] [url]')
	.argv
;

var options = {}, match = [], data = '', filter = /^(((.*?):(.*?))@)?([^:\/\s]+)?(:(\d+))?(\/(.*))?/;

if (argv._.length > 0)
	match = (argv._[1] || argv._[0]).match(filter);
if (argv._.length > 1)
	options.method = argv._[0].toUpperCase();

options.hostname = match[5] || 'localhost';
options.path = match[8] || '/';
options.port = match[7] || 80;

if (match[2])
	options.auth = match[2];

console.log(options);

var req = http.request(options, function(res) {
	res.setEncoding('utf8');
	res.on('data', function(chunk) {
		data += chunk;
	});
	res.on('end', function() {
		console.log(JSON.stringify({'options': options, 'response': {'statusCode': res.statusCode, 'headers': res.headers, 'data': JSON.parse(data)}}, null, 3));
	});
});

req.on('error', console.error);

if (options.method == 'POST')
	process.stdin.pipe(req);
else
	req.end();
