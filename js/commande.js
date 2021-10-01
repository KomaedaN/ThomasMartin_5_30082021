let priceSaveProduitLocal = JSON.parse(localStorage.getItem("prixTotal"));//assigner la key "prixTotal" à "priceSaveProduitLocal" avec JSON.parse
document.querySelector('#prixTotalAchat').textContent = priceSaveProduitLocal;//afficher le prix dans l'id "prixTotalAchat"

let idSaveProduitLocal = localStorage.getItem("orderID");//assigner la key "orderID" à "idSaveProduitLocal" avec JSON.parse
document.querySelector('#identifiantAchat').textContent = idSaveProduitLocal;//afficher le prix dans l'id "identifiantAchat"
