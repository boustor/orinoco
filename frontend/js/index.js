fetch("http://localhost:3000/api/teddies/")
    .then(response => response.json())
    .then(json => {
        var listeProduit = '';
        json.forEach(r => {

            var img = r.imageUrl;
            var imag = img.replace('.jpg', '_min.jpg');
            var prix = montant(r.price);

            listeProduit += `
                        <div>
                            <div class="pw-20"><a href="produit.html?_id=${r._id}"><img src="${imag}" alt="ours ${r.name}" title="ours ${r.name}"></a></div>
                            <div class="pw-20 nomPrix">
                                <div>${r.name}</div>
                                <div>${prix} €</div>
                            </div>
                            <div class="pw-75">${r.description}</div>
                        </div>
                        `
        })
        document.getElementById('ours').innerHTML = listeProduit;
    })
    .catch(error => alert("Erreur : " + error));