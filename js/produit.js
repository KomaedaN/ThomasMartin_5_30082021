function afficherOurs(produit) {
    const oursCard = document.getElementById("oursCard");

    const template = document.importNode(oursCard.content, true);

    template.getElementById("imageProduitOurs").src = produit.imageUrl
    template.getElementById("nameProduitOurs").textContent = produit.name
    template.getElementById("descriptionProduitOurs").textContent = produit.description
    template.getElementById("priceProduitOurs").textContent = `${produit.price / 100}€`
    template.getElementById("oursId").textContent = produit._id
    //template.getElementById("btnOurs").onclick = `window.location=./panier.html?id=${produit._id}`


    document.getElementById("listProduit").appendChild(template)
    
    const envoyerPanier = document.querySelector("#btn-envoyer");

//-------------------Ajouter au panier
    envoyerPanier.addEventListener("click", (event) => {
    console.log(event);
    event.preventDefault();

//------------------Récuperation des valeurs
    let optionsProduit = {
    idProduit:  document.querySelector("#oursId").textContent = produit._id,
    imgProduit: document.querySelector("#imageProduitOurs").src = produit.imageUrl,
    nameProduit: document.querySelector("#nameProduitOurs").textContent = produit.name,
    priceProduit: document.querySelector("#priceProduitOurs").textContent = `${produit.price / 100}€`,
    };
  
    console.log(optionsProduit);

    //--------------------Local Storage 
//Variable "saveProduitLocal" contenant les key et les valeurs qui sont dans le local storage
let saveProduitLocal = JSON.parse(localStorage.getItem("produit"));
console.log(saveProduitLocal);
//s'il y'a déja des produits save dans le local storage 
if (saveProduitLocal) {
  saveProduitLocal.push(optionsProduit);
  localStorage.setItem("produit", JSON.stringify(saveProduitLocal));
  console.log(saveProduitLocal);
} 
//s'il n'y a pas de produit save dans le local storage
else{
  saveProduitLocal = [];
  saveProduitLocal.push(optionsProduit);
  
  localStorage.setItem("produit", JSON.stringify(saveProduitLocal));
  console.log(saveProduitLocal);
}
  });
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









