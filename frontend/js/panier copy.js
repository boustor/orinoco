async function affichagePanier() {

    var data = localStorage.getItem("panier");
    data = JSON.parse(data);
    let listeProduit = '';
    //data.forEach(async id => {
    for (const id of data) {
        listeProduit = await detailProduit(id, listeProduit);
        console.log(listeProduit);
    };
    document.getElementById('ours').innerHTML = listeProduit;
}

function detailProduit(id, listeProduit) {
    return fetch("http://localhost:3000/api/teddies/" + id)
        .then(response => response.json())
        .then(r => {
            var prix = montant(r.price);
            let listeProduit = `
                        <div class="boxArticle">
                            <div>${r.name}</div>
                            <div>${prix} €</div>
                        </div>
                        `
            return listeProduit;
        })
        .catch(error => alert("Erreur : " + error));
}


affichagePanier();
nbPanier();