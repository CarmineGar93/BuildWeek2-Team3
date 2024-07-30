const addressBarParameters = new URLSearchParams(location.search);
const artistiID = addressBarParameters.get("artistiId");

const getAlbum = function () {
  fetch(`https://striveschool-api.herokuapp.com/api/deezer/artist/${artistiID}`)
    .then((resp) => {
      console.log(resp);
      if (resp.ok) return resp.json();
      else throw new Error("errore nella chiamata della api");
    })
    .then((data) => {
      console.log(data);
      getartistinfo(data);
    })
    .catch((err) => {
      console.log("Error", err);
    });
};

const addtrack = function(id){
    fetch(`https://striveschool-api.herokuapp.com/api/deezer/artist/${id}/top?limit=50`)
    .then((resp) => {
        if(resp.ok)return resp.json()
            else throw new Error("errore API")
    })
    .then((top) => {
        console.log(top)
        writetop(top.data)
    })
    .catch((err) => {
        console.log("Error", err);
    });
}

const writetop = function(songs){
    const topolist = document.getElementById("top-list")
    topolist.innerHTML = ''

    for(let i = 0; i < 5; i++){
        const li =`
        <li class="d-flex align-items-center mb-3 list-group-item border-0">
          <div>
          <img src="${songs[i].album.cover}" alt="cane" class="dog top-img object-fit-cover ms-3">
           </div>
        <div>
         <p class="ms-3 font-weight-bold mb-1">${songs[i].title}</p>
         <p class="ms-3 mb-0">${songs[i].rank}</p>
        </div>
        </li>`

        topolist.innerHTML = topolist.innerHTML + li
    
    }

}

const getartistinfo = function(artist){
    const artistname = document.getElementById("artistName")
    const artistimg = document.getElementById("albumImg")
    artistimg.style.backgroundImage = `url("${artist.picture_xl}")`
    artistname.innerText = artist.name
    addtrack(artist.id)
}

const init = function () {
    getAlbum();
  };
  
  window.addEventListener("load", function () {
    init();
  });