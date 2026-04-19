const input = document.getElementById("userName");
const button = document.getElementById("greetBtn");
const resultDiv = document.getElementById("result");


button.addEventListener("click", function() {
    const name = input.value;
    
    if (name) {
    
        resultDiv.innerHTML = `<h3>Привіт, <span style="color: blue;">${name}</span>!</h3>`;
    } else {
       
        resultDiv.textContent = "Будь ласка, введіть ім'я.";
    }
});
