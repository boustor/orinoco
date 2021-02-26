/* 
    On affiche le contenu du panier 
*/

function affichagePanier() {

    /* on recupere le tableau avec les articles */
    let panier = JSON.parse(localStorage.getItem("panier"));
    let article = '';
    let totQte = 0;
    let montant = 0;
    let ligne = -1;

    /* on lit le tableau pour afficher les articles */
    panier.forEach(function(produit, index) {
        const { id, nom, prix, qte } = produit;
        //let article = document.getElementById('ours').innerHTML;
        article += `
        <div class="articlePanier" id="article${index}">
            <span><input type="hidden" id="id${index}" value="${id}"></span>
            <span class="panierNom">${nom}</span>
            <span class="panierPrix">${prix} €</span>
            <span class="panierQte"><input type="number" id="qte${index}" value="${qte}" class="panierQteInput" min="1" max="10"></span>
        </div>
        `
            /*
            document.getElementById('ours').innerHTML = article;
            const selArticle = document.getElementById("article" + index);
            selArticle.addEventListener("click", function() {
                let qte = parseInt(document.getElementById('qte' + index).value);
                correctionPanier(id, qte);
            });
            */
        ligne++;
    });

    document.getElementById('ours').innerHTML = article;
    document.getElementById('ligne').value = ligne;
    montantQuantite();
}

affichagePanier();
nbPanier();

/* 
    on ecoute les champs quantites pour mise à jour 
*/

let nbLigne = document.getElementById('ligne').value;
for (let i = 0; i <= nbLigne; i++) {
    let article = "article" + i;
    const modifier = document.getElementById(article);
    modifier.addEventListener("click", function() {
        let qte = parseInt(document.getElementById('qte' + i).value);
        let id = document.getElementById('id' + i).value;
        correctionPanier(id, qte);
        montantQuantite();
    });

}

/* 
    test des champs et validation du formulaire 
*/

let butvalider = document.getElementById('validerCde');
butvalider.addEventListener("click", function() {

    let nom = document.getElementById('nom').value;
    let prenom = document.getElementById('prenom').value;
    let adresse = document.getElementById('adresse').value;
    let ville = document.getElementById('ville').value;
    let email = document.getElementById('email').value;


    //document.forms["commande"].submit();
    let panier = JSON.parse(localStorage.getItem("panier"));
    let tableId = [];
    panier.forEach(contenue => {
        tableId.push(contenue.id);
    });
    let commande = {
        "contact": {
            "firstName": nom,
            "lastName": prenom,
            "address": adresse,
            "city": ville,
            "email": email
        },
        "products": tableId
    };
    /* on poste le document pour récupérer le numéro de commande */
    fetch("http://localhost:3000/api/teddies/order", {
            method: "post",
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(commande)
        })
        .then(response => response.json())
        .then(noCde => {
            localStorage.setItem("commande", JSON.stringify(noCde));
        })
        .catch(err => console.log(err));
    window.location.href = "confirmation.html";
});