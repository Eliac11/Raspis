var fs = require('fs')

var users = require("./data/usersID.json")
var ocher = require("./data/och.json")





//console.log(users)

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
        if (ocher.morn.indexOf(i) === -1 && i.id != ocher.today.id) {
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

var todate = (s) => {
    var l = s.split(".")
    l = l.map(function (x) {return parseInt(x, 10)});
    console.log(l)
    return new Date(l[2],l[1]-1,l[0])
}

var fillOch = () => {

    console.log('проверка даты')

    var now = new Date()

    SetOch(() => {

        while (ocher.morn.length < 6) {
                ocher.morn.push(Getrandomder())
        }
        console.log(todate(now.toLocaleDateString()) - todate(ocher.data))
        if (todate(now.toLocaleDateString()) - todate(ocher.data) > 0) {
            console.log('да, день сменился')
            if (ocher.today.priced) {
                console.log('да, оценен передвиг')
                ocher.yesterday = ocher.today

                var zav = ocher.morn.shift()
                ocher.today = {
                    "id": zav,
                    "priced": false,
                    "value": 0
                }
                var sled = todate(ocher.data)
                sled.setDate(sled.getDate() + 1)
                if (sled.getDay() == 0) {
                    sled.setDate(sled.getDate() + 1)
                }
                ocher.data = sled.toLocaleDateString()
            }
            
        }
    })
}
fillOch()
console.log(ocher)

setInterval(fillOch,8000)

var getCookie = (req, name) => {
    if (req.headers.cookie != undefined) {
        let matches = req.headers.cookie.match(new RegExp(
            "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    }
    return undefined
}
var chekAdmin = (req) => {
    var tok = getCookie(req, "token")
    if (users[tok] != undefined) {
        if (users[tok].role == "Admin") {
            return true
        }
        return false
    }
    return false

    

}
module.exports.chekAdmin = chekAdmin

var UserAuth = (res,req,zap) => {
    if (zap.myid in users && users[zap.myid].role == "Admin") {
        
        res.writeHead(200, { 'Content-Type': 'text/plain', 'Set-Cookie': "token=" + zap.myid })
        res.end("ok")

    }
    else {
        res.writeHead(200, { 'Content-Type': 'text/plain'});
        res.end("teba net");
        console.log("ego net", zap.myid)
    }


}

var GetAllOch = (res, req) => {
    var inf = {}
    Object.assign(inf,ocher)
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
var GetAllData = (res, req) => {
    var l = []
    for (var i in users) {
        var u = []

        u.push(users[i].name)
        u.push(users[i].kolder)
        u.push(users[i].penaltyday)
        u.push(users[i].Ascores)

        l.push(u)
    }
    res.writeHead(200, { 'Content-Type': 'text/plain' })
    res.end(JSON.stringify(l))
}

var classUser = (res, reg, data) => {
    if (data.id != ocher.today.id) {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end("today ne tot");
        return
    }
    if (ocher.today.priced) {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end("today priced");
        return
    }
    if (todate(new Date().toLocaleDateString()) - todate(ocher.data) < 0) {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end("on tolko zavtra");
        return
    }


    //не выполнял об
    if (data.what == "kill") {
        SetUsers(() => {
            users[data.id].Ascores -= 5
            users[data.id].penaltyday += 1
        })
        SetOch(() => {
            ocher.today.priced = true;
            ocher.today.value = -5
        })
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end("ok");
        console.log(data.id, "kk")
    }
    //отсутствует
    else if (data.what == "beaway") {
        var zav = ocher.morn.shift()
        ocher.today = {
            "id": zav,
            "priced": false,
            "value": 0
        }
        while (ocher.morn.length < 6) {
            ocher.morn.push(Getrandomder())
        }
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end("ok");
    }
    //оценка
    else if (data.what == "class") {
        SetUsers(() => {
            users[data.id].Ascores += Number(data.value)
            users[data.id].kolder += 1
        })
        SetOch(() => {
            ocher.today.priced = true;
            ocher.today.value = Number(data.value)
        })
    }
    //мда
    else {
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        res.end("hmmm");
    }
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
        else if (data.target == "getalloch") {
            GetAllOch(res, req)
        }
        else if (data.target == "getallData") {
            GetAllData(res, req)
        }
        else if (data.target == "Classder") {
            if (chekAdmin(req)) {
                classUser(res, req, data)
            }
            else {
                res.writeHead(403, { 'Content-Type': 'text/plain' });
                res.end("ты не админ ты как это отправил");
            }
        }
        else {
            res.writeHead(400, { 'Content-Type': 'text/plain' });
            res.end("и что ты это мне кинул");
        }
        
        //'Set-Cookie': 'token=5b49adaaf7687fa'
        //res.writeHead(200, { 'Content-Type': 'text/plain' });
        //res.end("10");
    })
}