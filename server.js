const http = require('http')
const fs = require('fs')
const path = require('path')
const url = require('url')


function onRequest(request, response) {
	
	let filePath = url.parse(request.url).pathname
	filePath = '.' + filePath
	let extname = path.extname(filePath)
	let contentType = 'text/html'
	switch(extname) {
		case '.css':
			contentType = 'text/css'
			break
		case '.js':
			contentType = 'text/javascript'
			break
	}	

	
	response.writeHead(200, {'Content-Type': contentType})
	fs.readFile(filePath, null, (error,data)=> {
		if(error){
			response.writeHead(404)
			response.write('File not found')
		} else {
			response.write(data)
		}
		response.end()
	
	})
}

http.createServer(onRequest).listen(8000)
console.log('Listening for connections on localhost:8000\n')

