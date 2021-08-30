var fs = require('fs')

var users = require("./data/usersID.json")
var ocher = require("./data/och.json")





console.log(users)

var SetUsers = (fun) => {
    fun(users)

    fs.writeFileSync("./data/usersID.json", JSON.stringify(users, null, 2))
}
module.exports.SetUsers = SetUsers


var SetOch = (fun) => {
    fun(ocher)

    fs.writeFileSync("./data/och.json", JSON.stringify(ocher, null, 2))
}

var Getrandomder = () => {
    

    var vibor = []
    var minznach = 1000
    

    for (var i in users) {
        if (!(i in ocher.morn)) {
            console.log(i)
            var balu = users[i].kolder - users[i].penaltyday

            if (balu < minznach) {
                minznach = balu
                vibor = [i]
            }
            else if (balu == minznach) {
                vibor.push(i)
            }
        }
    }

    return vibor[Math.floor(Math.random()*vibor.length)]
}

var fillOch = () => {
    var now = new Date()
    SetOch(() => {

        while (ocher.morn.length < 6) {
                ocher.morn.push(Getrandomder())
        }

        if (ocher.data == now.toLocaleDateString()) {
            if (ocher.today.id == "") {
                var zav = ocher.morn.shift()
                ocher.today = {
                    "id": zav,
                    "priced": false,
                    "value": 0
                }
            }
        }
        else {
            var zav = ocher.morn.shift()
            ocher.today = {
                "id": zav,
                "priced": false,
                "value": 0
            }
            ocher.data = now.toLocaleDateString()
        }
    })
}
fillOch()
console.log(ocher)

var getCookie = (req,name) => {
    let matches = req.headers.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}
var chekAdmin = (req) => {
    var tok = getCookie(req,"token")
    if (tok in users && users[tok].role == "Admin") {
        return true
    }
    return false
}


var UserAuth = (res,req,zap) => {
    if (zap.myid in users && users[zap.myid].role == "admin") {
        
        res.writeHead(200, { 'Content-Type': 'text/plain', 'Set-Cookie': "token=" + zap.myid })
        res.end("ok")

    }
    else {
        res.writeHead(200, { 'Content-Type': 'text/plain'});
        res.end("teba net");
        console.log("ego net", zap.myid)
    }


}

var GetAllData = (res, req) => {
    var inf = {}
    inf = Object.assign(inf,ocher)
    inf.morn2 = {}
    inf.yesterday.name = users[inf.yesterday.id].name
    inf.today.name = users[inf.today.id].name
    inf.morn2.name = users[inf.morn[0]].name

    inf.yesterday.kolder = users[inf.yesterday.id].kolder
    inf.today.kolder = users[inf.today.id].kolder
    inf.morn2.kolder = users[inf.morn[0]].kolder

    res.writeHead(200, { 'Content-Type': 'text/plain' })
    res.end(JSON.stringify(inf))
}



module.exports.APIanswer = function (res, req) {
    var data = ''
    req.on('data', chunk => {
        data += chunk.toString()
    })
    req.on('end', () => {
        data = JSON.parse(data)

        if (data.target == "enter") {
            UserAuth(res, req, data)
        }
        else if (data.target == "getalldata") {
            GetAllData(res,req)
        }
        
        //'Set-Cookie': 'token=5b49adaaf7687fa'
        //res.writeHead(200, { 'Content-Type': 'text/plain' });
        //res.end("10");
    })
}