function afficherOurs(produit) {
    const oursCard = document.getElementById("oursCard");

    const template = document.importNode(oursCard.content, true);

    template.getElementById("imageProduitOurs").src = produit.imageUrl
    template.getElementById("nameProduitOurs").textContent = produit.name
    template.getElementById("descriptionProduitOurs").textContent = produit.description
    template.getElementById("priceProduitOurs").textContent = `${produit.price / 100}€`

    document.getElementById("listProduit").appendChild(template)
}

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

;(async () => {
    getListOurs()
})()