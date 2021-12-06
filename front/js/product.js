class Product {
    constructor(jsonProduct) {
        jsonProduct && Object.assign(this, jsonProduct);
    }
}

var search_params = new URLSearchParams(window.location.search);
var id = search_params.get("id");
if (id) {
    console.log(id);
};

fetch("http://localhost:3000/api/products/" + id)
    .then(data => data.json())
    .then(productObject => {

        document.querySelector(".item__img")
            .innerHTML = `<img src="${productObject.imageUrl}" alt="${productObject.altTxt}"></img>`

        document.querySelector(".item__content__titlePrice")
            .innerHTML = `<h1 id="title">${productObject.name}</h1>
                    <p>Prix : <span id="price">${productObject.price}</span>€</p>`

        document.querySelector(".item__content__description")
            .innerHTML = `<p class="item__content__description__title">Description :</p>
        <p id="description">${productObject.description}</p>`

        let selectColor = document.getElementById("colors");

        for (let color of productObject.colors) {
            var option = document.createElement("option");
            option.text = color;
            option.value = color;
            selectColor.appendChild(option);
        }

        let selectQuantity = document.getElementById("quantity");


        document.getElementById("addToCart")
            .addEventListener("click", (event) => {
                event.preventDefault();
                if(selectColor.value =="" || selectQuantity.value =="0" || selectQuantity.value > 100){
                    alert("Veuillez sélectionner une couleur et indiquer une quantité (0 - 100)");
                }

            })
    });
