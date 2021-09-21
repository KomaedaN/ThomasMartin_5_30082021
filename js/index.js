;(async () => {
    getListOurs()
})()


//fonction pour afficher le produit
function afficherOurs(produit) {
    //template ID 
    const oursCard = document.getElementById("oursCard");
    //Copie Node
    const template = document.importNode(oursCard.content, true);
    //get all id api
    template.getElementById("imageProduitOurs").src = produit.imageUrl
    template.getElementById("nameProduitOurs").textContent = produit.name
    template.getElementById("descriptionProduitOurs").textContent = produit.description
    template.getElementById("priceProduitOurs").textContent = `${produit.price / 100}€`
    template.getElementById("produitPage").href = `./produit.html?id=${produit._id}`
    //crée un nouvel élément 
    document.getElementById("listProduit").appendChild(template)
}
//fonction pour récupérer les informations des produits
async function getListOurs () {
    return fetch("http://localhost:3000/api/teddies")
        .then((httpBodyResponse) => httpBodyResponse.json())
        .then((produits) => {
            produits.forEach((produit) => {
                afficherOurs(produit)
            })
        })
        .catch((error) => {
            alert("erreur")
        })
}

