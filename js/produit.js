function afficherOurs(produit) {
    const oursCard = document.getElementById("oursCard");

    const template = document.importNode(oursCard.content, true);

    template.getElementById("imageProduitOurs").src = produit.imageUrl
    template.getElementById("nameProduitOurs").textContent = produit.name
    template.getElementById("descriptionProduitOurs").textContent = produit.description
    template.getElementById("priceProduitOurs").textContent = `${produit.price / 100}€`

    document.getElementById("listProduit").appendChild(template)
}

function getproduitId() {
    return new URL(window.location.href).searchParams.get('id')
  }


  
function getproduitData(produitId) {
    return fetch(`http://localhost:3000/api/teddies/${produitId}`)
      .catch((error) => {
        console.log(error)
      })
      .then((httpBodyResponse) => httpBodyResponse.json())
      .then((produitData) => produitData)
  }


;(async () => {
    const produitId = getproduitId()
    const produitData = await getproduitData(produitId)
  afficherOurs(produitData)
})()

