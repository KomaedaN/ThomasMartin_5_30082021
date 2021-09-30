
let saveProduitLocal = JSON.parse(localStorage.getItem("produit"));
    //console.log(saveProduitLocal);



const article = document.querySelector("#aucunArticle");

// afficher "panier vide" si il est vide
if (saveProduitLocal === null){
    const panierVide =`
    <div>
        <div>
        <h3>le panier est vide</h3>
        <a href="index.html" class="h3  text-warning">revenir au menu principal</a>
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


//Supprimer le panier , supprimer le localStorage
const btnReset = document.querySelector("#supprimerArticle");
btnReset.addEventListener("click", () => {
    localStorage.clear();
    location.reload();
});

//envoyer les informations de l'utilisateur 
function CheckFormThenSend(){
    let idProd = saveProduitLocal.map(x => x.idProduit);
    const form = document.querySelector("#form-to-check");
    const submit = document.querySelector("#submit-btn");
    let inputName = document.querySelector("#firstName");
    let inputLastName = document.querySelector("#Name");
    let inputCity = document.querySelector("#ville");
    let inputMail = document.querySelector("#mail");
    let inputAddress = document.querySelector("#address");
    
//console.log("e");
    if (
        !inputName.value ||
        !inputLastName.value ||
        !inputCity.value ||
        !inputMail.value ||
        !inputAddress.value
    ){
        document.querySelector("#erreur").innerText = "Veuillez remplir les champs"
    } else {
        const order = {
            contact: {
                firstName: inputName.value,
                lastName: inputLastName.value,
                city: inputCity.value,
                email: inputMail.value,
                address: inputAddress.value
            },
            products: (idProd),
        };
    //send Json method ...
        const sendJson = {
            method: "POST",
            headers: {'Content-Type': 'application/json; charset=utf-8'},
            body: JSON.stringify(order),
        };


        fetch("http://localhost:3000/api/teddies/order", sendJson) 
            .then((reponse) =>  reponse.json())
            .then((data) => {
                localStorage.clear();
                const total = document.querySelector("#prixTotal");
                
                localStorage.setItem("orderID", data.orderId);
                localStorage.setItem("prixTotal", totalPrice);
            })
            .catch((err) =>
            {
                alert(err);
            })
        }
    }

