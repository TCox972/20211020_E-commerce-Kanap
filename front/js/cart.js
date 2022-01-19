
let panier = JSON.parse(localStorage.getItem("panier"));

// ---------------- Récupération des éléments du localstorage et attribution à la page panier

for (let productId in panier) {
  for (let color in panier[productId].quantity) {
    const idProduct = panier[productId]

    document.querySelector("#cart__items").innerHTML += `<article class="cart__item" data-color="${color}" data-id="${productId}">
        <div class="cart__item__img">
          <img src="${idProduct.image}" alt="Photographie d'un canapé">
        </div>
        <div class="cart__item__content">
          <div class="cart__item__content__titlePrice">
            <h2>${idProduct.name}</h2>
            <h2>${color}</h2>
            <p>${idProduct.price} €</p>
          </div>
          <div class="cart__item__content__settings">
            <div class="cart__item__content__settings__quantity">
              <p>Qté : </p>
              <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${idProduct.quantity[color]}">
            </div>
            <div class="cart__item__content__settings__delete">
              <p class="deleteItem">Supprimer</p>
            </div>
          </div>
        </div>
      </article>`
  }
}

// ---------------- Total panier

function displayTotal() {
  let panier = JSON.parse(localStorage.panier);

  let amountTotal = 0;
  let nbArticles = 0;

  for (let productId in panier) {
    for (let color in panier[productId].quantity) {
      const idProduct = panier[productId]
      nbArticles += idProduct.quantity[color];
      amountTotal += idProduct.quantity[color] * idProduct.price;
    }
  }
  document.querySelector("#totalPrice")
    .innerHTML = amountTotal;
  document.querySelector("#totalQuantity")
    .innerHTML = nbArticles;
}
displayTotal();

// ----------------- Modification de la quantité dans le panier

var changeQuantity = document.querySelectorAll("input");

for (let i = 0; i < changeQuantity.length; i++) {

  changeQuantity[i]
    .addEventListener("change", (event) => {
      event.preventDefault();
      event.stopPropagation();

      var idSelect = changeQuantity[i].closest("article").dataset.id
      var colorSelect = changeQuantity[i].closest("article").dataset.color
      var newQuantity = changeQuantity[i].value

      let panier = JSON.parse(localStorage.getItem("panier"))

      panier[idSelect].quantity[colorSelect] = newQuantity

      localStorage.setItem("panier", JSON.stringify(panier));
      displayTotal()
    })
}

// ---------------- Suppression d'un élément du panier

var supprBtn = document.querySelectorAll(".deleteItem");

for (let i = 0; i < supprBtn.length; i++) {

  supprBtn[i]
    .addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();

      var idDelete = supprBtn[i].closest("article").dataset.id
      var colorDelete = supprBtn[i].closest("article").dataset.color

      let panier = JSON.parse(localStorage.getItem("panier"))
      delete panier[idDelete].quantity[colorDelete]

      if (Object.values(panier[idDelete].quantity) < 1) delete panier[idDelete]

      localStorage.setItem("panier", JSON.stringify(panier));
      supprBtn[i].closest("article").remove()
      displayTotal()
    })
}

//----------------- Analyse des inputs du formulaire de contact

// ****** Récupération des éléments du formulaire

var firstName = document.getElementById("firstName");
var lastName = document.getElementById("lastName");
var cityName = document.getElementById("city");
var address = document.getElementById("address");
var email = document.getElementById("email");
var submitForm = document.getElementById("order");

// ****** Définition des RegEx

var nameValidation = /^[a-zA-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ-]+( [a-zA-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ]+)*$/;
var addressValidation = /^[a-zA-Z0-9áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ,-]+( [a-zA-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ,-]+)*$/;
var emailValidation = /^[\w\-\.]+@[\w-]+\.+[\w-]{2,4}$/;

//****** Controle du prénom

firstName.addEventListener("change", (event) => {
  event.preventDefault();
  event.stopPropagation();
  let contactFirstName = firstName.value;
  if (nameValidation.test(contactFirstName)) {
    document.getElementById("firstNameErrorMsg").textContent = "";
    firstName.style.boxShadow = "0px 0px 10px green";
  } else {
    document.getElementById("firstNameErrorMsg").textContent = "Veuillez entrer un prénom valide."
    firstName.style.boxShadow = "0px 0px 10px red";
  }
})

//****** Controle du nom

lastName.addEventListener("change", (event) => {
  event.preventDefault();
  let contactLastName = lastName.value;
  if (nameValidation.test(contactLastName)) {
    lastName.style.boxShadow = "0px 0px 10px green";
    document.getElementById("lastNameErrorMsg").textContent = ""
  } else {
    lastName.style.boxShadow = "0px 0px 10px red";
    document.getElementById("lastNameErrorMsg").textContent = "Veuillez entrer un nom valide."
  }
})

//****** Controle de l'adresse

address.addEventListener("change", (event) => {
  event.preventDefault();
  let contactAddress = address.value;
  if (addressValidation.test(contactAddress)) {
    address.style.boxShadow = "0px 0px 10px green";
    document.getElementById("addressErrorMsg").textContent = ""
  } else {
    address.style.boxShadow = "0px 0px 10px red";
    document.getElementById("addressErrorMsg").textContent = "Veuillez saisir une adresse correcte (N°, voie, complt)."
  }
})

//****** Controle de la ville

cityName.addEventListener("change", (event) => {
  event.preventDefault();
  let contactCityName = cityName.value;
  if (nameValidation.test(contactCityName)) {
    cityName.style.boxShadow = "0px 0px 10px green";
    document.getElementById("cityErrorMsg").textContent = ""
  } else {
    cityName.style.boxShadow = "0px 0px 10px red";
    document.getElementById("cityErrorMsg").textContent = "Veuillez entrer un nom de ville valide."
  }
})

//****** Email control

email.addEventListener("change", (event) => {
  event.preventDefault();
  let contactEmail = email.value;
  if (emailValidation.test(contactEmail)) {
    email.style.boxShadow = "0px 0px 10px green";
    document.getElementById("emailErrorMsg").textContent = ""
  } else {
    email.style.boxShadow = "0px 0px 10px red";
    document.getElementById("emailErrorMsg").textContent = "Veuillez entrer un email valide."
  }
})

//******** Form control

submitForm.addEventListener("click", event => {
  event.preventDefault();
  if (nameValidation.test(firstName.value) == false ||
    nameValidation.test(lastName.value) == false ||
    addressValidation.test(address.value) == false ||
    nameValidation.test(cityName.value) == false ||
    emailValidation.test(email.value) == false) {
    alert("Certains champs ne sont pas correctement remplis")
  } else {

    const contact = {
      firstName: `${firstName.value}`,
      lastName: `${lastName.value}`,
      address: `${address.value}`,
      city: `${cityName.value}`,
      email: `${email.value}`
    }
    localStorage.setItem("contact", JSON.stringify(contact));

    let products = [];

    var productPanier = document.querySelectorAll("article")
    for (i=0; i < productPanier.length; i++) {
      var idProductPanier = productPanier[i].dataset.id
      products.push(idProductPanier)
    }

    const aEnvoyer = {
      contact,
      products
    };
    console.log("aEnvoyer")
    console.log(aEnvoyer)

    fetch("http://localhost:3000/api/products/order", {
      method: "POST",
      body: JSON.stringify(aEnvoyer),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

})