//Captura de elementos necesarios de HTML y evento de envio del form.
const urlData = "http://localhost:4002/infoUsers";
const formS = document.getElementById("formSignUp");
const buttonS = document.getElementById("signUpButton");

formS.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const lastName = document.getElementById("lastName").value;
  const email = document.getElementById("emailS").value;
  const password = document.getElementById("passwordS").value;

  //Se envían datos al json-server. Pendiente pasar a Heroku.
  fetch(urlData, {
    method: "POST",
    body: JSON.stringify({
      name,
      lastName,
      email,
      password,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  }).then((respond) => respond);
});

//Cuando se cargue la página se enviará alerta notificando al usuario que ventana usar.
window.addEventListener("DOMContentLoaded", () => {
  Swal.fire({
    title:
      "Por favor, primero registrate en la ventana de SIGNUP. Si ya lo hiciste, pasa a la ventana de LOGIN.",
    width: 600,
    padding: "3em",
    color: "#FFF",
    background: "#000000",
  });
});

//Obtiene los datos del json-server.
async function getData() {
  try {
    const respond = await fetch(urlData);
    const data = await respond.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

//Evento que captura la info de la sección de LOGIN.
const buttonL = document.getElementById("logInButton");
buttonL.addEventListener("click", async () => {
  const emailL = document.getElementById("emailL").value;
  const passwordL = document.getElementById("passwordL").value;

  //Filtra aquellos datos ingresados que son iguales en el json-server en la ventana LOGIN.
  let arraData = await getData();
  const dataA = arraData.filter(
    (item) => item.email === emailL && item.password == passwordL
  );

  //Con el condicional se notifica al usuario si los datos coinciden con los guardados en el json-server.
  if (dataA.length > 0) {
    Swal.fire({
      title:
        "Validación correcta. Serás redireccionado a la página principal en unos segundos...",
      width: 600,
      padding: "3em",
      color: "#FFF",
      background: "#000000",
    });

    //Redirecciona a la ventana principal.
    setTimeout(() => {
      window.location.href = "/index.html";
    }, 4000);

    //Se guarda el dato email en el localStorage para que pueda usarlos index.js para cambiar el icono.
    let objectToSend = {
      email: emailL,
    };
    localStorage.setItem("AUTHDATA", JSON.stringify(objectToSend));
  } else {
    Swal.fire({
      title:
      "Validación incorrecta. Verifica tus datos o registrate en la ventana de SIGNUP",
      width: 600,
      padding: "3em",
      color: "#FFF",
      background: "#000000",
    });
  }
});
