let saveProduitLocal = JSON.parse(localStorage.getItem("produit"));
    //console.log(saveProduitLocal);

const article = document.querySelector("#aucunArticle");

// afficher "panier vide" si il est vide
if (saveProduitLocal === null){
    const panierVide =`
    <div>
        <div>le panier est vide</div>
    </div>
    `; 
    article.innerHTML = panierVide;
//afficher les produits dans le localStorage si le panier contient des articles
}else{
    //récuperer la valeurs des articles
    for (let produit in saveProduitLocal) {
        const oursCard = document.getElementById("oursCard");
        const template = document.importNode(oursCard.content, true);
        
        //attriber une ID à mes valeurs dans la key "produit"
        template.getElementById("nameProduit").textContent = saveProduitLocal[produit].nameProduit
        template.getElementById("priceProduit").textContent = saveProduitLocal[produit].priceProduit
        template.getElementById("imageProduit").src = saveProduitLocal[produit].imgProduit
        //créer autant de template que nécessaire (en fonction de nombre d'articles)
        document.getElementById("listProduit").appendChild(template)
    }  
};




    // function afficherOurs(produit) {
    
//     //template ID 
//     const oursCard = document.getElementById("oursCard");
//     //Copie Node
//     const template = document.importNode(oursCard.content, true);
//     //get all id api
//     template.getElementById("imageProduitOurs").src = produit.imageUrl
//     template.getElementById("nameProduit").textContent = produit.name
//     template.getElementById("descriptionProduitOurs").textContent = produit.description
//     template.getElementById("priceProduitOurs").textContent = `${produit.price / 100}€`
//     template.getElementById("produitPage").href = `./produit.html?id=${produit._id}`

//     document.getElementById("listProduit").appendChild(template)
// }

