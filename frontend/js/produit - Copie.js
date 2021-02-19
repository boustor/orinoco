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
    var id = document.getElementById('idp').value;
    // lecture storage pour recupérer deja saisi
    contPanier = [];
    var data = localStorage.getItem("panier");
    if (data != null) {
        data = JSON.parse(data);
        data.forEach(el => {
            contPanier.push(el);
        });
    }
    // on rajoute l'ourson choisi
    contPanier.push(id);
    // on stock les informations 
    var panier = JSON.stringify(contPanier);
    localStorage.setItem("panier", panier);
    nbPanier();

});


// on controle si quelque chose dans le panier
nbPanier();