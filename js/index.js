const shooter = document.getElementById("shooter");
const mmorpg = document.getElementById("mmorpg");
const sailing = document.getElementById("sailing");
const permadeath = document.getElementById("permadeath");
const superhero = document.getElementById("superhero");
const pixel = document.getElementById("pixel");
const loading = document.getElementById("loading");
const details = document.getElementById('details');
const games = document.getElementById('games');
const btnClose = document.getElementById('btnClose');


mmorpg.addEventListener("click", function(){
    getGames("mmorpg");
    shooter.classList.remove("active");
    mmorpg.classList.add("active");
    sailing.classList.remove("active");
    permadeath.classList.remove("active");
    superhero.classList.remove("active");
    pixel.classList.remove("active");
});

shooter.addEventListener("click", function(){
    getGames("shooter");
    shooter.classList.add("active");
    mmorpg.classList.remove("active");
    sailing.classList.remove("active");
    permadeath.classList.remove("active");
    superhero.classList.remove("active");
    pixel.classList.remove("active");
});

sailing.addEventListener("click", function(){
    getGames("sailing");
    sailing.classList.add("active");
    shooter.classList.remove("active");
    mmorpg.classList.remove("active");
    permadeath.classList.remove("active");
    superhero.classList.remove("active");
    pixel.classList.remove("active");
});

permadeath.addEventListener("click", function(){
    getGames("permadeath");
    permadeath.classList.add("active");
    shooter.classList.remove("active");
    mmorpg.classList.remove("active");
    sailing.classList.remove("active");
    superhero.classList.remove("active");
    pixel.classList.remove("active");
});

superhero.addEventListener("click", function(){
    getGames("superhero");
    superhero.classList.add("active");
    shooter.classList.remove("active");
    mmorpg.classList.remove("active");
    sailing.classList.remove("active");
    permadeath.classList.remove("active");
    pixel.classList.remove("active");
});

pixel.addEventListener("click", function(){
    getGames("pixel");
    pixel.classList.add("active");
    shooter.classList.remove("active");
    mmorpg.classList.remove("active");
    sailing.classList.remove("active");
    permadeath.classList.remove("active");
    superhero.classList.remove("active");
});


let data = [];


async function getGames(category = "mmorpg") {
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': 'b42533250fmsh19183a319d2f943p19cb93jsn2a67664b2da7',
            'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
        }
    };

    try {
        loading.classList.remove("d-none");
        const response = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/games?category=${category}`, options);
        if (response.ok){
            const result = await response.json();
            data = result;
            displayData();
            loading.classList.add("d-none");
        }
        
    } catch (error) {
        console.log(error);
        
    }
}
getGames("mmorpg");

function displayData (){
  let cartona ="";

  for(let i=0; i<data.length; i++) {
      cartona +=`
      <div class="col" onclick="getId(${data[i].id})">
            <div
              class="card h-100 bg-transparent"
              data-id="582"
              role="button"
            >
              <div class="card-body p-0">
                <figure class="position-relative px-3 pt-3">
                  <img
                    src="${data[i].thumbnail}"
                    alt=""
                    class="card-img-top object-fit-cover h-100"
                  />
                </figure>
                <figcaption class="px-3">
                  <div class="hstack justify-content-between">
                    <h3 class="h6 small text-white">${data[i].title}</h3>
                    <span class="badge text-bg-primary p-2">Free</span>
                  </div>
                  <p
                    class="card-text small text-center opacity-50 text-white pb-3"
                  >
                    ${data[i].short_description.split(" ",8).join(" ")}
                  </p>
                </figcaption>
                <footer
                  class="card-footer small hstack justify-content-between"
                >
                  <span class="badge badge-color">${data[i].genre}</span>
                  <span class="badge badge-color">${data[i].platform}</span>
                </footer>
              </div>
            </div>
          </div>

      `
  }
  document.getElementById("gameData").innerHTML = cartona;
}

// ====================================== show details ===========================================================

async function getId(id){

  // alert(id);
  
  const options = {
      method: 'GET',
      headers: {
          'x-rapidapi-key': 'b42533250fmsh19183a319d2f943p19cb93jsn2a67664b2da7',
          'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
      }
  };
  
      try {
          loading.classList.remove("d-none");
          const response = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`, options);
          if (response.ok) {
          const result = await response.json();
          games.classList.add("d-none");
          details.classList.remove("d-none");
          document.getElementById("cover").src = `${result.thumbnail}`;
          document.getElementById("title").textContent = `Title: ${result.title}`;
          document.getElementById("MMORPG").textContent = `${result.genre}`;
          document.getElementById("platform").textContent = `${result.platform}`;
          document.getElementById("Status").textContent = `${result.status}`;
          document.getElementById("description").textContent = `${result.description}`;
          document.getElementById("link").innerHTML = ` <a
            href="${result.game_url}"
            class="btn btn-outline-warning text-white"
            target="_blank"
            >Show Game</a`
          loading.classList.add("d-none");
      }
      } catch (error) {
          console.log(error);
          
      }

}


// closeBtn

btnClose.addEventListener("click", function(){
    games.classList.remove("d-none");
    details.classList.add("d-none");
});

document.addEventListener("keydown", function (e) {
    if (e.key == "Escape") {
        games.classList.remove("d-none");
        details.classList.add("d-none");
    }
});
