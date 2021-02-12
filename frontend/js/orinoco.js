function montant(p) {
    var taille = p.toString().length - 2;
    var mt = p.toString().substr(0, taille) + "." + p.toString().substr(-2, 2);
    return mt
}

function nbPanier() {
    var data = localStorage.getItem("panier");
    data = JSON.parse(data);
    var nb = data.length;
    if (nb > 0) {
        document.getElementById('nbPanier').innerHTML = nb;
        document.getElementById('affPanier').style.display = "block";
    } else {
        document.getElementById('affPanier').style.display = "none";
    }
}

