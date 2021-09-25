let saveProduitLocal = JSON.parse(localStorage.getItem("produit"));
    //console.log(saveProduitLocal);

const article = document.querySelector("#aucunArticle");

// afficher "panier vide" si il est vide
if (saveProduitLocal === null){
    const panierVide =`
    <div>
        <div>
        <h3>le panier est vide</h3>
        <a href="index.html" class="h3 text-decoration-none text-warning">revenir au menu principal</a>
        </div>
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
        template.getElementById("priceProduit").textContent = saveProduitLocal[produit].priceProduit + "€"
        template.getElementById("imageProduit").src = saveProduitLocal[produit].imgProduit
        //créer autant de template que nécessaire (en fonction de nombre d'articles)
        document.getElementById("listProduit").appendChild(template)
    }  
};


//Variable des prix du panier
let totalPriceCalcul = [];
//récuperer les prix du panier
for (let m = 0; m < saveProduitLocal.length; m++){
    let priceArticlesDuPanier = saveProduitLocal[m].priceProduit;
    
//stocker les prix dans la variable "totalPriceCalcul"
    totalPriceCalcul.push(priceArticlesDuPanier);
    //console.log(totalPriceCalcul);
    
}
let prixTotal = document.querySelector("#prixTotal");
//Additionner les prix du tableau "totalPriceCalcul"
const reducer = (accumulator, currentValue) => accumulator + currentValue;
console.log(reducer);
const totalPrice = totalPriceCalcul.reduce(reducer,0);
console.log(totalPrice);
prixTotal.innerText = `${totalPrice} €`



const btnReset = document.querySelector("#supprimerArticle");
btnReset.addEventListener("click", () => {
    localStorage.clear();
    location.reload();
});
