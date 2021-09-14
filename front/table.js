
var onTable = document.getElementsByClassName("tsort")[0]
var ui = onTable.getElementsByTagName("tbody")[0]

var updatedata = () => {
    var xhttp = new XMLHttpRequest()
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            d = JSON.parse(this.responseText)
            for (var i in d) {
                ui.innerHTML += `<tr>
                    <td>${d[i][0]}</td>
                    <td>${d[i][1]}</td>
                    <td>${d[i][2]}</td>
                    <td>${d[i][3]}</td>
                </tr >`
            }
        }
    }
    xhttp.open("POST", window.URL, true)
    xhttp.setRequestHeader("Content-Type", "application/json")

    var zapros = { "target": "getallData" }

    xhttp.send(JSON.stringify(zapros))
}
updatedata()



document.addEventListener('DOMContentLoaded', () => {

    const getSort = ({ target }) => {
        const order = (target.dataset.order = -(target.dataset.order || -1));
        const index = [...target.parentNode.cells].indexOf(target);
        const collator = new Intl.Collator(['en', 'ru'], { numeric: true });
        const comparator = (index, order) => (a, b) => order * collator.compare(
            a.children[index].innerHTML,
            b.children[index].innerHTML
        );

        for (const tBody of target.closest('table').tBodies)
            tBody.append(...[...tBody.rows].sort(comparator(index, order)));

        for (const cell of target.parentNode.cells)
            cell.classList.toggle('sorted', cell === target);
    };

    document.querySelectorAll('.tsort thead').forEach(tableTH => tableTH.addEventListener('click', () => getSort(event)));

});