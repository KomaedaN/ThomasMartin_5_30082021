(async () => {//éxecute la fonction "getListOurs" de façon asynchrone
    getListOurs()
})()

//fonction pour afficher les produits
function afficherOurs(produit) {
    //template ID 
    const oursCard = document.getElementById("oursCard");
    //Copie Node
    const template = document.importNode(oursCard.content, true);
    //récupérer toutes les id de l'API
    template.getElementById("imageProduitOurs").src = produit.imageUrl
    template.getElementById("nameProduitOurs").textContent = produit.name
    template.getElementById("descriptionProduitOurs").textContent = produit.description
    template.getElementById("priceProduitOurs").textContent = `${produit.price / 100}€`
    template.getElementById("produitPage").href = `./produit.html?id=${produit._id}`
    //créer un nouvel élément 
    document.getElementById("listProduit").appendChild(template)
}
//fonction pour récupérer les informations des produits
function getListOurs () {
    return fetch("http://localhost:3000/api/teddies") //chercher les informations sur l'API
        .then((httpBodyResponse) => httpBodyResponse.json())//récupérer en .json 
        .then((produits) => {//data
            produits.forEach((produit) => {//Pour chaque élément 
                afficherOurs(produit)//on utilise la fonction "afficherOurs" pour afficher chaques éléments
            })
        })
        .catch((error) => {//Renvoi une erreur si les promesses sont rejetées
            alert("erreur")//affiche le message "erreur" 
        })
}

