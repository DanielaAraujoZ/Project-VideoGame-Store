//Captura de elementos necesarios de HTML y evento de envio del form
const urlData = "http://localhost:5000/infoUsers";
const formS = document.getElementById("formSignUp");
const buttonS = document.getElementById("signUpButton");

formS.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const lastName = document.getElementById("lastName").value;
  const email = document.getElementById("emailS").value;
  const password = document.getElementById("passwordS").value;

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

  let arraData = await getData();
  const dataA = arraData.filter(
    (item) => item.email === emailL && item.password == passwordL
  );
  if (dataA.length > 0) {
    Swal.fire({
      title:
        "Validación correcta. Serás redireccionado a la página principal en unos segundos...",
      width: 600,
      padding: "3em",
      color: "#FFF",
      background: "#000000",
    });

    setTimeout(() => {
      window.location.href = "/index.html";
    }, 4000);
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
