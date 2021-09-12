
var b = document.getElementById("Bauth")
var uid = document.getElementById("userid")
var t = document.getElementById("result")

var e = (data) => {
    console.log(data)
    if (data == "teba net") {
        t.innerHTML = "такого нет"
        t.style = "color:crimson"
    }
    else {
        t.style = "color:aquamarine"
        t.innerHTML = "успешно"
    }
    
}

b.onclick = () => {
    var xhttp = new XMLHttpRequest()
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            e(this.responseText)
        }
    }
   
    xhttp.open("POST", window.URL, true)
    //application/x-www-form-urlencoded
    xhttp.setRequestHeader("Content-Type", 'application/json')

    var zapros = {"target":"enter","myid":uid.value}

    xhttp.send(JSON.stringify(zapros))
}