/* 
    On affiche le contenu du panier 
*/

function affichagePanier() {

    /* on recupere le tableau avec les articles */
    let panier = JSON.parse(localStorage.getItem("panier")) || [];
    let article = '';
    let ligne = -1;

    /* on lit le tableau pour afficher les articles */
    panier.forEach(function(produit, index) {
        const { id, nom, prix, qte } = produit;
        article += `
        <div class="articlePanier" id="article${index}">
            <span><input type="hidden" id="id${index}" value="${id}"></span>
            <span class="panierNom">${nom}</span>
            <span class="panierPrix">${prix} €</span>
            <span class="panierQte"><input type="number" id="qte${index}" value="${qte}" class="panierQteInput" min="1" max="10"></span>
            <span id="sup${index}" class="far fa-trash-alt"></span>
        </div>
        `
        ligne++;
    });

    document.getElementById('ours').innerHTML = article;
    document.getElementById('ligne').value = ligne;
    montantQuantite();
    modifierPanier();
    nbPanier();
}

function validationCommande() {
    /* 
        test des champs et validation du formulaire 
    */

    let butvalider = document.getElementById('validerCde');
    butvalider.addEventListener("click", function() {
        let panier = JSON.parse(localStorage.getItem("panier")) || [];
        nbProduit = panier.length;
        let messageErreur = '';

        let nom = document.getElementById('nom').value;
        let prenom = document.getElementById('prenom').value;
        let adresse = document.getElementById('adresse').value;
        let ville = document.getElementById('ville').value;
        let email = document.getElementById('email').value;

        if (nbProduit == 0) messageErreur += 'Le panier est vide \n';
        if (nom == '') messageErreur += 'Il manque le nom \n';
        if (prenom == '') messageErreur += 'Il manque le prenom \n';
        if (adresse == '') messageErreur += 'Il manque l\'adresse \n';
        if (ville == '') messageErreur += 'Il manque la ville \n';
        if (email == '') messageErreur += 'Il manque l\'adresse courriel';

        if (messageErreur != '') {
            alert(messageErreur);
            return;
        }

        let tableId = [];
        panier.forEach(contenue => {
            for (let i = 1; i <= contenue['qte']; i++) {
                tableId.push(contenue['id']);
            }
        });
        let commande = {
            "contact": {
                "firstName": prenom,
                "lastName": nom,
                "address": adresse,
                "city": ville,
                "email": email
            },
            "products": tableId
        };
        console.log(commande);

        /* on poste le document pour récupérer le numéro de commande */
        /*
                (async() => {
                    const res = await fetch(`https://api.github.com/users/jameshibbard`);
                    const json = await res.json();
                    console.log(json.public_repos);
                    console.log("Hello!");
                })();
        */
        (async() => {
            await fetch("http://localhost:3000/api/teddies/order", {
                    method: "post",
                    headers: {
                        'Accept': 'application/json, text/plain, */*',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(commande),
                }, 5000)
                .then(response => response.json())
                .then(envoiCommande => {
                    localStorage.setItem("commande", JSON.stringify(envoiCommande));
                })
                .catch(err => console.log(err));
            window.location.href = "confirmation.html";
        })();

    })

}
/* 
    on ecoute les champs quantites pour mise à jour 
*/

function modifierPanier() {
    let nbLigne = document.getElementById('ligne').value;
    for (let i = 0; i <= nbLigne; i++) {
        let article = "article" + i;
        let supprimer = "sup" + i;
        // ----- on modifie la quantite
        const modifier = document.getElementById(article);
        modifier.addEventListener("click", function() {
            let qte = parseInt(document.getElementById('qte' + i).value);
            let id = document.getElementById('id' + i).value;
            correctionPanier(id, qte);
            montantQuantite();
        });
        // ----- on supprime la ligne
        const boutonSup = document.getElementById(supprimer);
        boutonSup.addEventListener("click", function() {
            let id = document.getElementById('id' + i).value;
            supprimerProduit(id);
            affichagePanier();
        });
        nbPanier();
    }
}
// appel des fonctions
affichagePanier();
validationCommande();