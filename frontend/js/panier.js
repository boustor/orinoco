/* On affiche le contenu du panier */
function affichagePanier() {

    /* on recupere le tableau avec les articles */
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

    /* on affiche le cumul quantité et montant */
    article += `
    <br>
    <div class="articlePanier">
        <span class="panierNom">Total</span>
        <span class="panierPrix">${montant} €</span>
        <span class="panierQte">${totQte}</span>
    </div>`;
    document.getElementById('ours').innerHTML = article;
    document.getElementById('ligne').value = ligne;
}

affichagePanier();
nbPanier();

/* on ecoute les champs quantites pour mise à jour */
let nbLigne = document.getElementById('ligne').value;
for (let i = 1; i <= nbLigne; i++) {
    let article = "article" + i;
    const elt = document.getElementById(article);
    elt.addEventListener("click", function() {
        let qte = document.getElementById('qte' + i).value;
        let id = document.getElementById('id' + i).value;
        correctionPanier(id, qte);
    });
}