

var e = (data) => {
    t.innerHTML = data
    console.log(data)
}


//CPan = document.getElementById("cntrlP1")
//CPan.style = "display:none;"

dd = document.getElementById("nowdate")

d1n = document.getElementById("1-Name")
d2n = document.getElementById("2-Name")
d3n = document.getElementById("3-Name")

d1k = document.getElementById("1-kolder")
d2k = document.getElementById("2-kolder")
d3k = document.getElementById("3-kolder")

dgalka = document.getElementById("galka")

var Data = "";


var updateoch = () => {
    var xhttp = new XMLHttpRequest()
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            d = JSON.parse(this.responseText)

            Data = d

            dd.innerHTML = d.data

            d1n.innerHTML = d.yesterday.name
            d2n.innerHTML = d.today.name
            d3n.innerHTML = d.morn2.name

            d1k.innerHTML = d.yesterday.kolder
            d2k.innerHTML = d.today.kolder
            d3k.innerHTML = d.morn2.kolder

            if (d.today.priced) {
                dgalka.innerHTML = "&#10003;"
                CPan.style = "display:none;"
            }
        }
    }
    xhttp.open("POST", window.URL, true)
    //application/x-www-form-urlencoded


    xhttp.setRequestHeader("Content-Type", "application/json")

    var zapros = { "target": "getalloch"}

    xhttp.send(JSON.stringify(zapros))
}
updateoch()


