const addressBarParameters = new URLSearchParams(location.search);
const artistiID = addressBarParameters.get("artistiId");

const getRandomSong = function (a_b, list) {
  const id = randomInt(0, 999999);
  fetch(`https://striveschool-api.herokuapp.com/api/deezer/${a_b}/${id}`)
    .then((resp) => {
      if (resp.ok) return resp.json();
      else {
        getRand(list); // se la risposta non è ok allora richiama la funzione
        throw new Error("errore nella chiamata della api");
      }
    })
    .then((data) => {
      if (data.error)
        getRand(list); // se l'id cercato non esiste richiama la funzione
      else {
        if (data.title)
          writeAlbum(
            data,
            list
          ); // gli do dati di api e la lista per poi scriverci il list-item
        else writeArtist(data, list);
      }
    })
    .catch((err) => {
      alert(err);
    });
};

const writeAlbum = function (album, list) {
  const gennarolist_item = `
  <li class="my-2 fs-6 d-flex align-content-center">
      <img src="${album.cover_small}" class="mx-2 rounded-1" alt="" />
      <a href='album.html?albumId=${album.id}' class='text-decoration-none'>
      <p class='text-white'>${album.title} <br/> <small class='text-muted'>Album</small></p>
      </a>
  </li>`;
  list.innerHTML = list.innerHTML + gennarolist_item;
};

const writeArtist = function (artist, list) {
  const name = artist.name.substring(0, artist.name.indexOf(" ") + 1); // questa è una cagata provvisoria per evitare various artist con nomi troppo lunghi e BRUTTI
  const gennarolist_item = `
    <li class="my-2 fs-6 d-flex align-content-center">
    <img src="${artist.picture}" class="mx-2 rounded-circle" alt="" /> 
    <a href='artisti.html?artistiId=${artist.id}' class='text-decoration-none'>
      <p class='text-white'>${name} <br/> <small class='text-muted'>Artist</small></p>
      </a>
    </li>`;
  list.innerHTML = list.innerHTML + gennarolist_item;
};

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
const getRand = function (list) {
  let A_B = "";
  if (randomInt(0, 1) === 0) A_B = "album";
  else A_B = "artist";
  getRandomSong(A_B, list);
};

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

const addtracks = function (id) {
  fetch(
    `https://striveschool-api.herokuapp.com/api/deezer/artist/${id}/top?limit=50`
  )
    .then((resp) => {
      if (resp.ok) return resp.json();
      else throw new Error("errore API");
    })
    .then((top) => {
      console.log(top);
      writetop(top.data);
    })
    .catch((err) => {
      console.log("Error", err);
    });
};

const writetop = function (songs) {
  const topList = document.getElementById("top-list");
  topList.innerHTML = "";

  for (let j = 0; j < 5; j++) {
    const li = `
        <li class="d-flex align-items-center mb-3 list-group-item border-0">
          <div>
          <img src="${songs[j].album.cover}" alt="cane" class="dog top-img object-fit-cover ms-3">
           </div>
        <div>
         <p class="ms-3 font-weight-bold mb-1">${songs[j].title}</p>
         <p class="ms-3 mb-0">${songs[j].rank}</p>
        </div>
        </li>`;

    topList.innerHTML = topList.innerHTML + li;
  }
};

const getartistinfo = function (artist) {
  const artistname = document.getElementById("artistName");
  const artistimg = document.getElementById("albumImg");
  const likedimg = document.getElementById("liked");
  artistimg.style.backgroundImage = `url("${artist.picture_xl}")`;
  likedimg.setAttribute("src", `${artist.picture_xl}`);
  artistname.innerText = artist.name;
  addtracks(artist.id);
};

const init = function () {
  const gennarolist = document.querySelector("ul.list-unstyled");
  gennarolist.innerHTML = "";
  for (let loop = 0; loop < 10; loop++) {
    getRand(gennarolist); // mi serve da mandare nelle funzioni che scrivono le singole list-item
  }
  getAlbum();
};

window.addEventListener("load", function () {
  init();
});
