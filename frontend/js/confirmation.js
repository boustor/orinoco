function affichageConfirmation() {
    let panier = JSON.parse(localStorage.getItem("commande"));
    console.log(panier);
    document.getElementById('noCde').innerHTML = panier["orderId"];
    const contact = panier['contact'];
    const produit = panier['products'];

    console.log(produit);
    affichageContact(contact);
    affichageProduit(produit);
}
/* 
    Affichage du contact 
*/
function affichageContact(contact) {
    const adresse = `${contact.firstName} ${contact.lastName}
                      <br>
                     ${contact.adresse}
                     <br>
                     ${contact.city}
                     <br>
                     ${contact.email}
                    `;
    document.getElementById('adresse').innerHTML = adresse;
}
/*
    Affichage des produits
*/
function affichageProduit(produit) {
    let ligneProduit = '';
    produit.array.forEach(ligne => {
        ligneProduit += `
        <tr>
            <td>${ligne.name}</td>
            <td>1<td>
            <td>${ligne.price}</td>
            <td>2</td>
        </tr>
        `
    });
    document.getElementById('ligneProduit').innerHTML = ligneProduit;
}
/* ***************************************************** */
affichageConfirmation();