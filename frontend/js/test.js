// initialisation tableau
/*
var tab=new Array();
tab["id"]="123";
tab["coul"]="bleu";
tab["qte"]="25";
console.log(tab);
*/
var obj = [{nom: "Yohan", age: 30, pays: "France"}];

//console.log(obj)
//

tr = JSON.stringify(obj);
console.log(tr);

obj.forEach(function(item) {
    console.log(item);
    console.log(item.age);
});

/*
var results = [ {"id":"10", "class": "child-of-9"}, {"id":"11", "classd": "child-of-10"} ];

results.forEach(function(item) {
    console.log(item);
});
*/