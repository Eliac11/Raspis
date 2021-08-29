var t = document.getElementById("t")
var b = document.getElementById("button-1")

var uid = document.getElementById("userid")

var e = (data) => {
    t.innerHTML = data
    console.log(data)
}

b.onclick = () => {
    var xhttp = new XMLHttpRequest()
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            e(this.responseText)
        }
    }
    //"http://localhost:1337"
    xhttp.open("POST", window.URL, true)
    //application/x-www-form-urlencoded
    xhttp.setRequestHeader("Content-Type", "application/json")
    xhttp.send(uid.value)
}