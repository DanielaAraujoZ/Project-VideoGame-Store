const urlAPI =
  "https://api.rawg.io/api/platforms?key=364e9ff77e354af38f029eac24949a2b";
const divTarget = document.getElementById("MainContent");

//Función que obtiene los datos del API externa.
async function getData() {
  try {
    const respond = await fetch(urlAPI);
    const data = respond.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

//Función que muestra los datos del API externa en el DOM.
async function showInfo(data) {
  data = await getData();
  let info = data.results;
  info.map((item) => {
    const { name, image_background, games_count, games, id } = item;

    divTarget.innerHTML += `
             <div class="card" style="width: 18rem;">
                 <img src="${image_background}" class="card-img-top" alt="...">
                 <div class="card-body">
                   <h5 class="card-title">${name}</h5>
                   <p class="card-text">${games.map((item) => item.name)}</p>
                   <button class="btn btn-primary" onclick="addFavorite(${id})">Add Car</button>
                 </div>
             </div>
               `;
  });
}
showInfo();

//Se valida que haya el dato de email guardado en el localStorage para cambiar el icono que confirma el login con el usuario.
const buttonIcon = document.getElementById("notuser");
const outUser = document.getElementById("outUser");
let dataLocalS = JSON.parse(localStorage.getItem("AUTHDATA"));

//Condicional que valida contenido en el localStorage. Cambia el estado del boton y habilita el boton de LogOut.
if (dataLocalS.email !== undefined) {
  buttonIcon.innerHTML = `
    <a href="./auth.html">
    <i class="fa-solid fa-user-check" style="color: black"></i>
    </a>`;
  outUser.disabled = false;
  buttonIcon.disabled = true;
}

//Se reinicia el localStorage y se recarga la página en caso que se le de click al boton LogOut.
outUser.addEventListener("click", () => {
  localStorage.clear();
  location.reload();
});

//Agrega los elementos seleccionados como favoritos al offcanvas.
async function addFavorite(id) {
  let data = await getData();
  let elementToSend = data.results.filter((item) => item.id === id)
  const { name, games_count, image_background } = elementToSend
  
  console.log(elementToSend);
}