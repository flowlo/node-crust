#!/usr/bin/env node

var http = require('http');
var argv = require('optimist').usage('Usage: $0 [method] [url]').argv;
var match = argv._.length > 0 ? (argv._[1] || argv._[0]).match(/(((.*?):(.*?))@)?([^:\/\s]+)?(:(\d+))?(\/(.*))?/) : [];

var options = {
	hostname: match[5] || 'localhost',
	path: match[8] || '/',
	port: match[7] || 80,
	auth: match[2],
	method: argv._.length > 1 ? argv._[0].toUpperCase() : 'GET'
};

console.log(options);

var data = '', req = http.request(options, function(res) {
	res.setEncoding('utf8');
	res.on('data', function(chunk) {
		data += chunk;
	});
	res.on('end', function() {
		console.log(JSON.stringify({'options': options, 'response': {'statusCode': res.statusCode, 'headers': res.headers, 'data': JSON.parse(data)}}, null, 3));
	});
});

req.on('error', console.error);

options.method == 'POST' ? process.stdin.pipe(req) : req.end();
