function affichageConfirmation() {
    let panier = JSON.parse(localStorage.getItem("commande"));
    console.log(panier);
    document.getElementById('noCde').innerHTML = panier["orderId"];
    const produit = panier['products']
    console.log(produit);
}

/* ***************************************************** */
affichageConfirmation();