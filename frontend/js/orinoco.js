/* on format le prix */
function montant(p) {
    let taille = p.toString().length - 2;
    let mt = p.toString().substr(0, taille) + "." + p.toString().substr(-2, 2);
    return mt
}

/* On affiche la quantité du panier */
function nbPanier() {
    let data = JSON.parse(localStorage.getItem("panier")) || [];
    let nb = data.length;
    let qte = 0;
    // on cumul les quantités en parcourant le tableau
    for (let i = 0; i < nb; i++) {
        let tabLigne = data[i];
        qte += tabLigne["qte"];
    }
    // si une quantité on affiche la quantité sur le caddie
    if (qte > 0) {
        document.getElementById('nbPanier').innerHTML = qte;
        document.getElementById('affPanier').style.display = "block";
    } else {
        document.getElementById('affPanier').style.display = "none";
    }
}

/* Lecture du panier pour cumuler la quantité si le produit existe deja */
function majQuantite(panier, id) {
    let nb = panier.length;
    let maj = 0;

    for (let i = 0; i < nb; i++) {
        let tabLigne = panier[i];
        if (tabLigne["id"] == id) {
            tabLigne["qte"] += 1;
            maj = 1;
        }
    }

    return maj;
}

/* Correction du panier et mise à jour du montant total et quantite */
function correctionPanier(id, qte) {

    var panier = JSON.parse(localStorage.getItem("panier"));
    let article = '';
    let totQte = 0;
    let montant = 0;
    let ligne = 0;

    /* on lit le tableau pour afficher les articles */
    panier.forEach(function(r) {
        ligne++;
        article += `
        <div class="articlePanier" id="article${ligne}">
            <span><input type="hidden" id="id${ligne}" value="${r.id}"></span>
            <span class="panierNom">${r.nom}</span>
            <span class="panierPrix">${r.prix} €</span>
            <span class="panierQte"><input type="number" id="qte${ligne}" value="${r.qte}" class="panierQteInput" min="1" max="10"></span>
        </div>
        `

        totQte += r["qte"];
        montant += r["qte"] * r["prix"];
    });

}