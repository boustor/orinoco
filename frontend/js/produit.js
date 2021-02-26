/* ----- Affichage du produit ----- */

function detail(id) {
    fetch("http://localhost:3000/api/teddies/" + id)
        .then(response => response.json())
        .then(produit => {
            const { _id, imageUrl, name, price, description } = produit;
            affichageProduit(produit);

            const selProduit = document.getElementById('butPanier');
            selProduit.addEventListener('click', function() {
                let qte = 1;
                //let prix = price.replace("€", "");
                let couleur = document.getElementById("couleur").value;
                let ajoutPanier = { "id": _id, "nom": name, "couleur": couleur, "prix": montant(price), "qte": qte };

                // lecture storage pour recupérer deja saisi
                let panier = JSON.parse(localStorage.getItem("panier")) || [];
                // on va incrémenter la quantité si la ligne est déjà présente
                let maj = majQuantite(panier, id)
                    // on rajoute la ligne uniquement si elle existe pas
                if (maj == 0) panier.push(ajoutPanier);

                // on stock les informations 
                localStorage.setItem("panier", JSON.stringify(panier));
                nbPanier();
            });

        })
        .catch(error => alert("Erreur : " + error));
}
/* ----- affichage des éléments ----- */
function affichageProduit(produit) {
    const { _id, imageUrl, name, price, description } = produit;
    let listeCouleur = '';
    let prix = montant(price);
    document.getElementById('image').innerHTML = `<img src="${imageUrl}" alt="Ours ${name}"/>`;
    document.getElementById('nom').innerHTML = `${name}`;
    produit.colors.forEach(couleur => {
        listeCouleur += `<option value="${couleur}">${couleur}</option>`;
    })
    document.getElementById('couleur').innerHTML = listeCouleur;
    document.getElementById('description').innerHTML = `${description}`;
    document.getElementById('prix').innerHTML = `${prix} €`;
    document.getElementById('idp').value = _id;
}
/* ----- récupération de l'id ----- */

let url = document.location.href;
let x = url.indexOf("_id=", 0);
let id = url.substr(x + 4);
detail(id);

nbPanier();