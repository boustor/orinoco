/* 
    on format le prix 
*/
function montant(p) {
    let taille = p.toString().length - 2;
    let mt = p.toString().substr(0, taille) + "." + p.toString().substr(-2, 2);
    return mt
}

/* 
    On affiche la quantité du panier 
*/
function nbPanier() {
    let panier = JSON.parse(localStorage.getItem("panier")) || [];
    let nbProduit = panier.length;
    let qte = 0;
    // on cumul les quantités en parcourant le tableau
    for (let i = 0; i < nbProduit; i++) {
        let produit = panier[i];
        qte += produit['qte'];
    }
    // si une quantité on affiche la quantité sur le caddie
    if (qte > 0) {
        document.getElementById('nbPanier').innerHTML = qte;
        document.getElementById('affPanier').style.display = "block";
    } else {
        document.getElementById('affPanier').style.display = "none";
    }
}

/* 
    Lecture du panier pour cumuler la quantité si le produit existe deja 
*/
function majQuantite(panier, id) {
    let nb = panier.length;
    let maj = 0;

    for (let i = 0; i < nb; i++) {
        let produit = panier[i];
        if (produit["id"] == id) {
            produit["qte"] += 1;
            maj = 1;
            break;
        }
    }
    return maj;
}

/* 
    Correction du panier et mise à jour du montant total et quantite 
*/
function correctionPanier(id, qte) {

    let panier = JSON.parse(localStorage.getItem("panier"));
    /* on recherche la ligne à modifier */
    panier.forEach(function(produit) {
        if (produit["id"] == id) {
            produit["qte"] = qte;
        }
        localStorage.setItem("panier", JSON.stringify(panier));
        nbPanier();
    });

}
/* 
    Calcul montant et quantité 
*/
function montantQuantite() {
    let panier = JSON.parse(localStorage.getItem("panier")) || [];
    let qte = 0;
    let prix = 0;
    panier.forEach(function(produit) {
        qte += produit["qte"];
        prix += parseFloat(produit["prix"]) * produit["qte"];
    });

    document.getElementById("montant").innerHTML = prix + " €";
    document.getElementById("quantite").innerHTML = qte;
}

/*
    Suppression d'une ligne dans le panier
*/
function supprimerProduit(id) {
    let panier = JSON.parse(localStorage.getItem("panier"));
    panier.forEach(function(produit, index) {
        if (produit.id == id) {
            panier.splice(index, 1);
        }
    });
    localStorage.setItem("panier", JSON.stringify(panier));
}