
CPan = document.getElementById("cntrlP1")


debuginfo = document.getElementById("debuginfo")
var setdebuginfo = (s) => {
    debuginfo.innerHTML = s
    setTimeout(() => { debuginfo.innerHTML = ""},3000)
}



var sendzapros = (zap,fun) => {
    var xhttp = new XMLHttpRequest()
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            fun(this.responseText)
        }
    }
    xhttp.open("POST", window.URL, true)

    xhttp.setRequestHeader("Content-Type", "application/json")

    xhttp.send(JSON.stringify(zap))
}

Bkill = document.getElementById("Bkill")
Bkill.onclick = () => {
    var z = { "target": "Classder", "id": Data.today.id, "what": "kill" }
    sendzapros(z, (r) => {
        console.log(r)
        setdebuginfo(r)
    })
    updateoch()
}

Bbeaway = document.getElementById("Bbeaway")
Bbeaway.onclick = () => {
    var z = { "target": "Classder", "id": Data.today.id, "what": "beaway" }
    sendzapros(z, (r) => {
        console.log(r)
        setdebuginfo(r)
    })
    updateoch()
}

Bclass = document.getElementById("Bclass")
dialogWin = document.getElementById("dialogWin")
Bclass.onclick = () => {
    dialogWin.style = "display:flex;"
}

sendBut = document.getElementById("sendBut")
sendBut.onclick = () => {

    var valueinp = document.getElementById("valueinp")
    
    if (isNaN(Number(valueinp.value)) || valueinp.value === "") {
        sendBut.innerHTML = "неверное значение"
        valueinp.value = ""
        setTimeout(() => {
            sendBut.innerHTML = "ок"
        }, 1000)
        return
    }

    var z = { "target": "Classder", "id": Data.today.id, "what": "class", "value": valueinp.value }
    sendzapros(z, (r) => {
        console.log(r)
        setdebuginfo(r)
    })
    updateoch()
    dialogWin.style = "display:none;"
}

setTimeout(() => {if (Data.today.priced) {
    CPan.style = "display:none;"
} },200)
