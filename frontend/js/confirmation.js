/*
    On récupère le contenu de commande 
*/
function affichageConfirmation() {
    let panier = JSON.parse(localStorage.getItem("commande"));
    document.getElementById('noCde').innerHTML = panier["orderId"];
    const contact = panier['contact'];
    const produit = panier['products'];

    affichageContact(contact);
    affichageProduit(produit);
}
/* 
    Affichage du contact 
*/
function affichageContact(contact) {
    const adresse = `${contact.firstName} ${contact.lastName}
                      <br>
                     ${contact.address}
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
    let id = '';
    let qte = 0;
    let prix = '';
    let leProduit = '';
    let mtLigne = '';
    let totalCde = 0;
    produit.forEach(ligne => {
         if (id != ligne._id && id != '') {
            ligneProduit += leProduit;
            qte = 0;
        }
        qte++;
        prix = montant(ligne.price);
        mtLigne = qte * prix;
        totalCde += mtLigne
        
        leProduit = `
        <tr>
            <td class="libelleProduit">${ligne.name}</td>
            <td>${qte}</td>
            <td>${new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(mtLigne)}</td>
        </tr>
        `
        // -------------------------------
        id = ligne._id;
    });
    ligneProduit += leProduit;
    totalCde = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(totalCde)
    document.getElementById('ligneProduit').innerHTML = ligneProduit;
    document.getElementById('totalCde').innerHTML = totalCde;
    
}
/* 
    ***************************************************** 
*/
affichageConfirmation();
localStorage.clear("panier");
localStorage.clear("commande");