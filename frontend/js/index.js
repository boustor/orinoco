fetch("http://localhost:3000/api/teddies/")
    .then(response => response.json())
    .then(produit => {
        let listeProduit = '';
        produit.forEach(produit => {

            const { _id, imageUrl, name, price, description } = produit;

            let prix = montant(price);

            listeProduit += `
                        <div class="boxArticle">
                            <div class="affImage"><a href="produit.html?_id=${_id}"><img src="${imageUrl}" alt="ours ${name}" title="ours ${name}"></a></div>
                            <div>${name}</div>
                            <div>${prix} €</div>
                            <div>${description}</div>
                        </div>
                        `
        })
        document.getElementById('ours').innerHTML = listeProduit;
    })
    .catch(error => alert("Erreur : " + error));

// on controle si quelque chose dans le panier
//localStorage.clear();
nbPanier();