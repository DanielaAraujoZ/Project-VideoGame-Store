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

//Función que muestra los datos enviados por parametro o los datos directos de la API.
async function showInfo(obj) {
  console.log(obj);
  let data = await getData();
  let info = data.results;

  if(obj !== undefined){
    info = obj
    divTarget.innerHTML = ""
  }
  info.map((item) => {
    const { name, image_background, games, id } = item;
    divTarget.innerHTML += `
             <div class="card" style="width: 18rem;">
                 <img src="${image_background}" class="card-img-top" alt="...">
                 <div class="card-body">
                   <h5 class="card-title">${name}</h5>
                   <p class="card-text">${games.map((item) =>  item.name)}</p>
                   <button id=${id} class="btn btn-primary" onclick="addFavorite(${id})">Add Favorites</button>
                 </div>
             </div>
               `;
  });
}
showInfo();

//Agrega los elementos seleccionados como favoritos al offcanvas.
async function addFavorite(id) {
  const divOffcanvas = document.getElementById("off-canvas");
  const buttonFav = document.getElementById(id);
  let data = await getData();
  let elementToSend = data.results.filter((item) => item.id === id);
  const { name, games_count, image_background } = elementToSend[0];

  divOffcanvas.innerHTML += `
  <div class="card-favorite d-flex flex-row align-items-center justify-content-start">
      <i class="fa-solid fa-star"></i>
      <img class="img-favorite" src="${image_background}" alt="${name}">
      <div class="d-flex flex-column ">
          <p class="m-1"> Name: ${name} </p>
          <p class="m-1"> Purchased games: ${games_count} </p>
      </div>
  </div>
  `;

  //Deshabilita el botón una vez sea enviado al offcanvas
  buttonFav.disabled = true;
}

//Agrega los items al dropdown
let plataform = ['Xbox','Switch', 'IOS', 'Nintendo', 'Atari', 'Linux']
const dropdown = document.getElementById('dropdown')
plataform.forEach((item) => {
  dropdown.innerHTML += `
  <li class="dropdown-item" onclick=filterInfo("${item}")> ${item}</li>
  `
})
//Filtra los elementos que son igual al item para enviarlos a la función que los mostrará en pantalla.
async function filterInfo(nameToFilter) {
  let data = await getData()
  let infoToFilter = data.results.filter((item) => item.name.toLowerCase().includes(nameToFilter.toLowerCase()))
   showInfo(infoToFilter)
}

//Evento de captura para la busqueda y envío de la información a la función que los mostrará en la pantalla.
const searchButton = document.getElementById("searchButton");
searchButton.addEventListener("click", async () => {
  const inputSearch = document.getElementById("inputSearch").value;
  let data = await getData();
  let results = data.results;
  let dataFilter = results.filter((item) =>
    item.name.toLowerCase().includes(inputSearch.toLowerCase())
  );
  showInfo(dataFilter)
});

//Se valida que haya el dato de email guardado en el localStorage para cambiar el icono que confirma el login con el usuario.
const buttonIcon = document.getElementById("notuser");
const outUser = document.getElementById("outUser");
let dataLocalS = JSON.parse(localStorage.getItem("AUTHDATA"));

//Condicional que valida contenido en el localStorage. Cambia el estado del boton y habilita el boton de LogOut.
 if (dataLocalS.email !== undefined) {
   buttonIcon.innerHTML = `
      <i class="fa-solid fa-user-check" style="color: black"></i>
      `;
   outUser.disabled = false;
   buttonIcon.disabled = true;
 }

//Se reinicia el localStorage y se recarga la página en caso que se le de click al boton LogOut.
outUser.addEventListener("click", () => {
  localStorage.clear();
  location.reload();
})