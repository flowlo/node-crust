# crust

A command line REST client written in node.js

`crust` is not a library for node to query REST services like [restler](https://github.com/danwrong/restler) or a REST framework to provide such a service, like [restify](https://github.com/mcavage/node-restify).

## Installation

With [npm](https://github.com/isaacs/npm), just do:

    npm install -g crust

or clone this project:

    git clone https://github.com/flowlo/node-crust.git

## Usage

The simplest invocation is just:

    crust

which is equivalent to:

    crust GET localhost:80/

To send a HTTP GET request:

    crust localhost/foo

You can also specify a HTTP method:

    crust PUT localhost/foo/42

When sending a POST request, `crust` reads the body from `process.stdin`, so you might want to do:

    crust POST localhost/foo < bar.in

Basic HTTP authorization and custom TCP ports are also supported:

    crust username:password@hostname:port/path/to?foo=bar
