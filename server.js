

var http = require('http');
var port = process.env.PORT || 1337;
var fs = require('fs')
var myapi = require('./api.js')

console.log( new Date().toLocaleDateString())


var FileMeneger = function (filePath) {

    return fs.readFileSync(filePath, 'utf8')
}


var server = http.createServer(function (req, res) {
    console.log(req.method, req.url, "----", req.headers.cookie)
    if (req.method == "GET") {

        
        switch (req.url) {
            
            case "/":
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(FileMeneger("front/index.html"));
                break
            case "/auth":
                res.writeHead(200, { 'Content-Type': 'text/html'});
                res.end(FileMeneger("front/auth.html"));
                break

            case "/main.css":
                res.writeHead(200, { 'Content-Type': 'text/css' });
                res.end(FileMeneger("front/main.css"));
                break
                
            case "/client.js":
                res.writeHead(200, { 'Content-Type': 'text/js' });
                res.end(FileMeneger("front/client.js"));
                break
            case "/auth-client.js":
                res.writeHead(200, { 'Content-Type': 'text/js' });
                res.end(FileMeneger("front/auth-client.js"));
                break

            default:
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end("ne nashel");
                break
        }
    }
    else if (req.method == "POST") {

        myapi.APIanswer(res,req)
    }
    
})

server.listen(port,"localhost")
    



