


module.exports.APIanswer = function (res, req) {
    var data = ''
    req.on('data', chunk => {
        data += chunk.toString()
    })
    req.on('end', () => {


        //'Set-Cookie': 'token=5b49adaaf7687fa'
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end("10");
        console.log(data)
    })
}