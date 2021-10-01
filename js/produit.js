//afficher le produit sélectionné 
function afficherOurs(produit) {
  const oursCard = document.getElementById("oursCard");

  const template = document.importNode(oursCard.content, true);//créer une nouvelle copie

  //récupérer toutes les valeurs du produit
  template.getElementById("imageProduitOurs").src = produit.imageUrl
  template.getElementById("nameProduitOurs").textContent = produit.name
  template.getElementById("descriptionProduitOurs").textContent = produit.description
  template.getElementById("priceProduitOurs").textContent = produit.price / 100 + "€"
  template.getElementById("oursId").textContent = produit._id
  template.getElementById("colorsSelector").style = produit.colors
  //console.log(produit.colors);
  
  //créer un nouvel élément
  document.getElementById("listProduit").appendChild(template)
  
  const envoyerPanier = document.querySelector("#btn-envoyer");

//Ajouter au panier au clique de la souris 
  envoyerPanier.addEventListener("click", (event) => {
  //console.log(event);
  event.preventDefault();




  //Récuperation des valeurs
  let optionsProduit = {
  idProduit:  textContent = produit._id,
  imgProduit: src = produit.imageUrl,
  nameProduit: textContent = produit.name,
  priceProduit: textContent = produit.price / 100,
  };
  //console.log(optionsProduit);

  //Local Storage 
  ////assigner la key "produit" à "saveProduitLocal" avec JSON.parse
  let saveProduitLocal = JSON.parse(localStorage.getItem("produit"));


  //Fonction ajouter le produit dans le localStorage 
  const addProduitLocalStorage = () => {
    saveProduitLocal.push(optionsProduit);//push les valeurs 
    localStorage.setItem("produit", JSON.stringify(saveProduitLocal));//renvoie la valeur associée à la Key
  };

  //s'il y'a déja des produits save dans le local storage 
  if (saveProduitLocal) {
    addProduitLocalStorage();//on ajoute une valeur dans le tableau
  } 
  //s'il n'y a pas de produit save dans le local storage
  else{
    saveProduitLocal = [];//si il n'y a pas de produit dans le localStorage, on initialise le tableau
    addProduitLocalStorage();//on ajoute une valeur dans le tableau
  }
  });
  const colors = document.querySelector("#colorsSelector");
  produit.colors.forEach((color) => {
    //dupliquer "colorsSelector" pour chaque couleur 
    const templateColors = document.getElementById("colorsSelector")
    const duplicateColors = document.importNode(templateColors.content, true)//créer une nouvelle copie

    //ajouter la couleur au background 
    duplicateColors.querySelector("div").style.backgroundColor = color

    //dupliquer "colors" pour chaque couleur 
    colors.appendChild(duplicateColors)
    })
}
function getproduitId() {
  return new URL(window.location.href).searchParams.get("id")
}

function getproduitData(produitId) {
  return fetch(`http://localhost:3000/api/teddies/${produitId}`)//récupérer les informations du produit
    .then((httpBodyResponse) => httpBodyResponse.json())//récupérer en .json 
    .then((produitData) => produitData)
    .catch((error) => {//Renvoi une erreur si les promesses sont rejetées
      console.log(error)
    })
}
//on récupére d'abord la nouvelle URL avant de récupérer les données 
;(async () => {
const produitId = getproduitId()
const produitData = await getproduitData(produitId)
afficherOurs(produitData)
})()