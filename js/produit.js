function afficherOurs(produit) {
    const oursCard = document.getElementById("oursCard");

    const template = document.importNode(oursCard.content, true);

    template.getElementById("imageProduitOurs").src = produit.imageUrl
    template.getElementById("nameProduitOurs").textContent = produit.name
    template.getElementById("descriptionProduitOurs").textContent = produit.description
    template.getElementById("priceProduitOurs").textContent = `${produit.price / 100}€`
    template.getElementById("oursId").textContent = produit._id
    template.getElementById("btnOurs").onclick = `window.location=./panier.html?id=${produit._id}`


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


// function addCart() {
//   const id = getproduitId();
//   const data = getproduitData(id);
//   localStorage.setItem(id, JSON.stringify(data))
//   console.log(localStorage)
// }






;(async () => {
    const produitId = getproduitId()
    const produitData = await getproduitData(produitId)
  afficherOurs(produitData)
})()


