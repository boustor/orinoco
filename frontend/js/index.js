fetch("http://localhost:3000/api/teddies/")
    .then(response => response.json())
    .then(produit => {
        var listeProduit = '';
        produit.forEach(r => {

            var img = r.imageUrl;
            var imag = img.replace('.jpg', '_min.jpg');
            var prix = montant(r.price);

            listeProduit += `
                        <div class="boxArticle">
                            <div class="affImage"><a href="produit.html?_id=${r._id}"><img src="${imag}" alt="ours ${r.name}" title="ours ${r.name}"></a></div>
                            <div>${r.name}</div>
                            <div>${prix} €</div>
                            <div>${r.description}</div>
                        </div>
                        `
        })
        document.getElementById('ours').innerHTML = listeProduit;
    })
    .catch(error => alert("Erreur : " + error));

// on controle si quelque chose dans le panier
//localStorage.clear();
nbPanier();