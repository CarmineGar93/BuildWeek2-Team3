const addressBarParameters = new URLSearchParams(location.search);
const albumID = addressBarParameters.get("albumId");

const getRandomSong = function (a_b, list) {
  const id = randomInt(0, 999999);
  fetch(`https://striveschool-api.herokuapp.com/api/deezer/${a_b}/${id}`)
      .then((resp) => {
          if (resp.ok) return resp.json();
          else {
              getRand(list);// se la risposta non è ok allora richiama la funzione
              throw new Error("errore nella chiamata della api");
          }
      })
      .then((data) => {
        if (data.error) getRand(list);
        if (data.name && data.nb_album < 3) getRand(list, 'artist');
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
const getRand = function (list, string) {
  let A_B = "";
  if (randomInt(0, 1) === 0) A_B = "album";
  else A_B = "artist";

  if (string) getRandomSong(string, list);
  else getRandomSong(A_B, list);
};


const playsong = function (mp3){
  console.log(mp3)
  const song = new Audio (`${mp3}`)
  song.play()
}

const getAlbum = function () {
  fetch(`https://striveschool-api.herokuapp.com/api/deezer/album/${albumID}`)
    .then((resp) => {
      console.log(resp);
      if (resp.ok) return resp.json();
      else throw new Error("errore nella chiamata della api");
    })
    .then((data) => {
      console.log(data);
      getartistinfo(data);
      getalbuminfo(data);
      getsong(data);
    })
    .catch((err) => {
    });
};

const getartistinfo = function (album) {
  const artistImg = document.getElementById("artist-photo");
  const artistname = document.getElementById("artist-name");
  artistImg.setAttribute("src", `${album.contributors[0].picture}`);
  artistname.innerText = album.contributors[0].name;
};

const getalbuminfo = function (album) {
  const albumimg = document.getElementById("album-cover");
  const albumtitle = document.getElementById("album-title");
  const albumyear = document.getElementById("album-year");
  const albumtracks = document.getElementById("n-of-songs");
  const albumduration = document.getElementById("album-duration");
  albumimg.setAttribute("src", `${album.cover_medium}`);
  albumtitle.innerText = album.title;
  albumyear.innerText = album.release_date.slice(0, 4);
  albumtracks.innerText = album.nb_tracks
  const hourdur = Math.floor(album.duration / 60)
  const mindur = album.duration - (hourdur * 60)
  albumduration.innerText = `${hourdur} ore e ${mindur} minutes`

};


const getsong = function (album) {
  const artist = album.contributors[0].name;
  album.tracks.data.forEach((track) => {
    console.log(track)
    const createdli = `        
        <li class="list-group-item d-flex justify-content-between align-items-start bg-black border-0">
          <div class="ms-2 me-auto" onclick="playsong('${track.preview}')">
            <div class="fw-bold">${track.title}</div>
            <small class="text-muted">${artist}</small>
          </div> 
        </li>`

    const songlist = document.getElementById("song-list");
    songlist.innerHTML = songlist.innerHTML + createdli
  });
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
