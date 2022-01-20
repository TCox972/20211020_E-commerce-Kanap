// RECUPERATION DE L'ORDER ID

let params = new URL(document.location).searchParams;
let id = params.get("id");

const nbOrder = document.getElementById("orderId")
nbOrder.innerHTML = id
localStorage.clear()