const urlAPI =
  "https://api.rawg.io/api/platforms?key=364e9ff77e354af38f029eac24949a2b";
const divTarget = document.getElementById("MainContent");

async function getData() {
  try {
    const respond = await fetch(urlAPI);
    const data = respond.json();
    return data
  } catch (error) {
    console.log(error);
  }
}

async function showInfo(data) {
  data = await getData();
  let info = data.results;
  console.log(info);
  info.map((item) => {
     const { name, image_background, games_count, games } = item;

     divTarget.innerHTML += `
             <div class="card mt-5" style="width: 18rem;">
                 <img src="${image_background}" class="card-img-top" alt="...">
                 <div class="card-body">
                   <h5 class="card-title">${name}</h5>
                   <p class="card-text">${games.map((item) => item.name)}</p>
                   <button class="btn btn-primary">Add Car</button>
                 </div>
             </div>
               `;
  });
}
showInfo()