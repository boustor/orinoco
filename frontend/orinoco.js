function affichageListe(chemin, dest) {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        var x, txt = "";
        if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
            var response = JSON.parse(this.responseText);
            for (x in response) {
                var img = response[x].imageUrl;
                txt += "<tr  onclick=\"(alert('coucou'))\">"
                txt += "<td class=\"pw-30\"><img src=\"" + img.replace('.jpg', '_min.jpg') + "\"/></td>";
                txt += "<td class=\"pw-15\">" + response[x].name + "</td>";
                txt += "<td class=\"pw-55\">" + response[x].description + "</td>";
                txt += "</tr>";
            }
            document.getElementById(dest).innerHTML = txt;
            console.log(response);
            console.log(txt);
        }
    };
    request.open("GET", chemin);
    request.send();
}


affichageListe('http://localhost:3000/api/teddies/', 'ours');
affichageListe('http://localhost:3000/api/cameras/', 'camera');
affichageListe('http://localhost:3000/api/furniture/', 'meuble');