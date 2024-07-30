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
    })
    .catch((err) => {
        console.log("Error", err);
    });
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