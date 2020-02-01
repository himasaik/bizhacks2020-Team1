var http = require('http');
var fs = require('fs');
const url = require('url');
let fs1 = require('fs1'); // changed from fs to fs1 to prevent duplication at top


html = {
    render(path, response) {
    console.log(__dirname);
        fs.readFile(__dirname + '/' + path, null, function (error, data) {
            if (error) {
                response.writeHead(404);
                response.write('file not found');
            } else {
                response.write(data);
            }
            response.end();
        });
    }
}
module.exports = {
    handleRequest(request, response) {
        response.writeHead(200, {
            'Content-Type': 'text/html'
        });
        let path = url.parse(request.url).pathname;
        switch (path) {
            case '/':
                html.render('index.html', response);
                break;
            case '/reports':
                html.render('reports.html', response);
                break;
            default:
                response.writeHead(404);
                response.write('Route not found');
                response.end();
        }
    }
}


function onRequest(request, response){
    console.log(request.method);
    if (request.method == 'POST') {
        request.body
    }

    if (request.method == 'POST') {
        console.log('POST')
        var body = ''
        request.on('data', function(data) {
          body += data
          console.log('Partial body: ' + body)
        })
        request.on('end', function() {
          console.log('Body: ' + body)
          response.writeHead(200, {'Content-Type': 'text/html'})
          response.end('post received')
        })
      } else {
        console.log('GET')
        response.writeHead(200, {'Content-Type': 'text/html'})
        fs.readFile('/Users/himasaikattumuri/Desktop/test.html',null, function(error, data){
            if(error){
                response.writeHead(404);
                response.write('File not found');
            } else{
                response.write(data)
            }
            response.end();
        });
      }
   
}

http.createServer(onRequest).listen(3000);




