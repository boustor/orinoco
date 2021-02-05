function montant(p) {
    var taille = p.toString().length-2;
    var mt = p.toString().substr(0, taille)+"."+p.toString().substr(-2,2);
    return mt
}