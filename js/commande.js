let priceSaveProduitLocal = JSON.parse(localStorage.getItem("prixTotal"));
document.querySelector('#prixTotalAchat').textContent = priceSaveProduitLocal;

let idSaveProduitLocal = localStorage.getItem("orderID");
document.querySelector('#identifiantAchat').textContent = idSaveProduitLocal;
