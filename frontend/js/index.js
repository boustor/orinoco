fetch("http://localhost:3000/api/teddies/")
    .then(response => response.json())
    .then(produits => {
        let listeProduit = '';
        produits.forEach(produit => {

            const { _id, imageUrl, name, price, description } = produit;

            let prix = montant(price);

            listeProduit += `
                        <a href="produit.html?_id=${_id}">
                            <div class="boxArticle">
                                <div class="affImage"><img src="${imageUrl}" alt="ours ${name}" title="ours ${name}"></div>
                                <div>${name}</div>
                                <div>${prix} €</div>
                                <div>${description}</div>
                            </div>
                        </a>
                        `
        })
        document.getElementById('ours').innerHTML = listeProduit;
    })
    .catch(error => alert("Erreur : " + error));

// on controle si quelque chose dans le panier
//localStorage.clear();
nbPanier();