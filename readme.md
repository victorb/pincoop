## OpenIPFS

### Introduction

OpenIPFS is a set of API endpoints for adding public daemons, retrieve a list
of all of them and to add hashes to be pinned on those public daemons

### Goal

The goal is to provide a starting point for openly share objects of interest,
on a large set of open daemons contributed by the community.

IPFS works the way that the more hosts pin a object, the more resilient that
object becomes. By providing a starting point for open hosting of this object,
I hope that we can share more resources with each others.

All in a very open and introspectively way.

### Endpoints

`GET /daemons`

Returns a list of currently added daemons with `alive` status, list of hashes
that will be pinned and hashes that been pinned before

`POST /daemons`

Adds a new daemon to the list of daemons. The endpoint accepts JSON only, be sure
to include the `multiaddr` attribute on the root object. Returned is the created
daemon in the API.

`POST /pin/:hash`

Pins a new hash. This is an asynchronous operation, it always return true. Use
`GET /daemons` or `GET /pin/:hash` to see the status of that pinning operation

`GET /pin/:hash`

See the status of a current pinning, made from `POST /pin/:hash`

### Installation

* Clone the repository into your local/remote machine
* Run `npm install`
* Run `npm start`
* Done! Now the API+Frontend is running on `PORT` from environment variables or if
that is not set, port 3000

### Development

The stack is as follows:
* Express + middlewares for handling API requests
* node-ipfs-api for handling requests to the daemons added to the service
* Redux+React+Webpack for the frontend

A local daemon is always added on startup! Don't worry if you're not running
a daemon where the API is deployed, it'll soon be removed if it's not up.

You want to contribute to the API/Server/Daemon logic? Take a look in the `/api`
directory

You want to make the frontend a bit nicer and more sense-looking? Take a look in
the `/frontend` directory.

Makes sense? No? Change it and send a PR :)

### Contributing

You can contribute in a number of ways. Either, add your own public daemon to
the service, so other people can pin content on your daemon, or, take a look
at the issues in this repository and see if it's something you can fix. If
you already looked at the code or used the service, open a new issue for everything
that looks weird (I bet some parts are filled with weird stuff!). If someone
is asking something you know, please answer them! This is a project we do together,
so feel free to basically do whatever you want.


### License

The MIT License (MIT)

Copyright (c) 2015 Victor Bjelkholm

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.