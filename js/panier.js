document
  .getElementById("code") 
  addEventListener("input", function(nameF) {
  if (/^[A-Za-z]+$/.test(nameF.target.value)) {
    document.getElementById("code-validation").innerText = "Prénom valide";
    document.getElementById("code-validation").style.color = 'green'
  } else {
    document.getElementById("code-validation").innerText = "Prénom invalide";
    document.getElementById("code-validation").style.color = '#e23427';
  }
});