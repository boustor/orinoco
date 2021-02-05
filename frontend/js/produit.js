/* ----- Affichage du produit ----- */

function detail(id) {
    fetch("http://localhost:3000/api/teddies/" + id)
        .then(response => response.json())
        .then(json => {
            var listeCouleur = '';
            var img = json.imageUrl;
            var prix = montant(json.price);
            img = img.replace('.jpg', '_min.jpg');
            document.getElementById('image').innerHTML = `<img src="${img}" alt="Ours ${json.name}"/>`;
            document.getElementById('nom').innerHTML = `${json.name}`;
            json.colors.forEach(c => {
                listeCouleur += `<option value="${c}">${c}</option>`;
            })
            document.getElementById('couleur').innerHTML = listeCouleur;
            document.getElementById('description').innerHTML = `${json.description}`;
            document.getElementById('prix').innerHTML = `${prix} €`;
            document.getElementById('idp').value=json._id;
        })
        .catch(error => alert("Erreur : " + error));
}

/* ----- récupération de l'id ----- */

var url = document.location.href;
var x = url.indexOf("_id=", 0);
var id = url.substr(x + 4);
detail(id);

/* ----- on ecoute le bouton panier ----- */

const elt = document.getElementById('butPanier'); 
elt.addEventListener('click', function() {  
    var id = document.getElementById('idp').value;      
    alert("Id : "+id);             
});


/*
let tab = {
    firstName: "name",
    lastName: "last",
    address: "adresse",
    city: "ville",
    email: "courriel"
}
let test = JSON.stringify(tab);
localStorage.setItem("order", test);
*/