/* ----- Affichage du produit ----- */

function detail(id) {
    fetch("http://localhost:3000/api/teddies/" + id)
        .then(response => response.json())
        .then(produit => {
            var listeCouleur = '';
            var img = produit.imageUrl;
            var prix = montant(produit.price);
            img = img.replace('.jpg', '_min.jpg');
            document.getElementById('image').innerHTML = `<img src="${img}" alt="Ours ${produit.name}"/>`;
            document.getElementById('nom').innerHTML = `${produit.name}`;
            produit.colors.forEach(c => {
                listeCouleur += `<option value="${c}">${c}</option>`;
            })
            document.getElementById('couleur').innerHTML = listeCouleur;
            document.getElementById('description').innerHTML = `${produit.description}`;
            document.getElementById('prix').innerHTML = `${prix} €`;
            document.getElementById('idp').value = produit._id;
        })
        .catch(error => alert("Erreur : " + error));
}

/* ----- récupération de l'id ----- */

let url = document.location.href;
let x = url.indexOf("_id=", 0);
let id = url.substr(x + 4);
detail(id);

/* ----- on ecoute le bouton panier ----- */

const elt = document.getElementById('butPanier');
elt.addEventListener('click', function() {
    let id = document.getElementById('idp').value;
    let nom = document.getElementById('nom').innerHTML;
    let couleur = document.getElementById('couleur').value;
    let prix = document.getElementById('prix').innerHTML;
    let qte = 1;
    prix = prix.replace("€", "");
    let ajoutPanier = { "id": id, "nom": nom, "couleur": couleur, "prix": prix, "qte": qte };

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

nbPanier();