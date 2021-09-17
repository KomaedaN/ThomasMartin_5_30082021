document
    .getElementById("code-Validation")
    .addEventListener("input", function(e) {
        if (/^[A-Za-z]+$/.test(e.target.value)) {
            document.getElementById(isValid).innerText = "Code Valide";
            }
        else{
            document.getElementById(isValid).innerText = "Code invalide";
        }
});
