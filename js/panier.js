let saveProduitLocal = JSON.parse(localStorage.getItem("produit"));//assigner la key "produit" à "saveProduitLocal" avec JSON.parse
    //console.log(saveProduitLocal);

const article = document.querySelector("#aucunArticle");

if (saveProduitLocal === null){//si il n'y a aucun article dans la key "produit"
    const panierVide =`
    <div>
        <div>
        <h3>le panier est vide</h3>
        <a href="index.html" class="h3  text-warning">revenir au menu principal</a>
        </div>
    </div>
    `; 
    article.innerHTML = panierVide;//afficher "le panier est vide"

//afficher les produits dans le localStorage si le panier contient des articles
}else{
    //récuperer les valeurs des articles
    for (let produit in saveProduitLocal) {
        const oursCard = document.getElementById("oursCard");
        const template = document.importNode(oursCard.content, true);//créer une nouvelle copie
       
        
        //attriber une ID à mes valeurs dans la key "produit"
        template.getElementById("nameProduit").textContent = saveProduitLocal[produit].nameProduit 
        template.getElementById("priceProduit").textContent = saveProduitLocal[produit].priceProduit + "€"
        template.getElementById("imageProduit").src = saveProduitLocal[produit].imgProduit
        //créer autant de template que nécessaire (en fonction du nombre d'articles)
        document.getElementById("listProduit").appendChild(template)
    }  
};


//Créer un tableau "totalPriceCalcul"
let totalPriceCalcul = [];
//récuperer les prix du panier
for (let m = 0; m < saveProduitLocal.length; m++){
    let priceArticlesDuPanier = saveProduitLocal[m].priceProduit;
    
//stocker les prix dans la variable "totalPriceCalcul"
    totalPriceCalcul.push(priceArticlesDuPanier);
    //console.log(totalPriceCalcul);
    
}

let prixTotal = document.querySelector("#prixTotal");
//Additionner les prix du tableau "totalPriceCalcul" avec la méthode reduce
const reducer = (accumulator, currentValue) => accumulator + currentValue;
//console.log(reducer);
const totalPrice = totalPriceCalcul.reduce(reducer,0);
//console.log(totalPrice);
prixTotal.innerText = `${totalPrice} €` //afficher le prix total en euro


//Supprimer le panier , supprimer le localStorage
const btnReset = document.querySelector("#supprimerArticle");
//lorsque l'on clique sur le bouton "supprimer", le localStorage est reset puis la page est rafraichi 
btnReset.addEventListener("click", () => {
    localStorage.clear();
    location.reload();
});

//envoyer les informations de l'utilisateur 
async function CheckFormThenSend(){
    let idProd = saveProduitLocal.map(x => x.idProduit);
    let inputName = document.querySelector("#firstName");
    let inputLastName = document.querySelector("#Name");
    let inputCity = document.querySelector("#ville");
    let inputMail = document.querySelector("#mail");
    let inputAddress = document.querySelector("#address");
    
    if (//si tout le formulaire n'est pas correctement rempli
        !inputName.value ||
        !inputLastName.value ||
        !inputCity.value ||
        !inputMail.value ||
        !inputAddress.value
    ){
        document.querySelector("#erreur").innerText = "Veuillez remplir les champs" //message d'erreur
    } else {//si le formulaire est bien rempli 
        const order = {//on récupére les données saisies
            contact: {
                firstName: inputName.value,
                lastName: inputLastName.value,
                city: inputCity.value,
                email: inputMail.value,
                address: inputAddress.value
            },
            products: (idProd),//et l'id des articles
        };
    //send Json method ...
        const sendJson = {
            method: "POST",
            headers: {'Content-Type': 'application/json; charset=utf-8'},
            body: JSON.stringify(order),
        }
        
    
        
            fetch("http://localhost:3000/api/teddies/order", sendJson)//envoyer les données pour la page "commande" 
                .then((reponse) =>  reponse.json())//envoyer en .json
                .then((data) => {
                    localStorage.clear();//On reset le local storage avant de créer nos nouvelles "key"
                    const total = document.querySelector("#prixTotal");
                        //création des key "orderID" et "prixTotal"
                    localStorage.setItem("orderID", data.orderId);
                    localStorage.setItem("prixTotal", totalPrice);
                })
                .catch((err) =>//Renvoi une erreur si les promesses sont rejetées
                {
                    alert(err);
                })
            }        
    }
