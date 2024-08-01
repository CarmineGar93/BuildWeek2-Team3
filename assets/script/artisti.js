const addressBarParameters = new URLSearchParams(location.search);
const artistiID = addressBarParameters.get("artistiId");
const audio = document.getElementById('audio');
const btnPlay = document.getElementById('playIcon');
const artistPlayed = document.getElementById('artistPlayed')
const songPlayed = document.getElementById('songPlayed')
let currentTimeElement = document.getElementById("current-time"); // Elemento per il tempo corrente
let playerBarFill = document.querySelector(".player-bar-fill")
const imgCurrentAlbum = document.getElementById('imgCurrentAlbum')
let srcCurrentAlbum = ''
const listened = JSON.parse(localStorage.getItem('listened'))
const populatesong = function() {
  imgCurrentAlbum.src = listened.cover
  songPlayed.innerText = listened.title
  artistPlayed.innerText = listened.artist
  audio.src = listened.src
}
if (listened) {
  populatesong()
}
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}
class mySong {
  constructor(_src, _title, _artist, _cover, _artist_cover, _album_title) {
    this.src = _src,
    this.title = _title
    this.artist = _artist
    this.cover = _cover
    this.artist_cover = _artist_cover
    this.album_title = _album_title
  }
}

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
      writetop(top);
    })
    .catch((err) => {
    });
};

audio.addEventListener('timeupdate', () => {
  const progress = (audio.currentTime / audio.duration) * 100;
  playerBarFill.style.width = `${progress}%`
  currentTimeElement.textContent = formatTime(audio.currentTime)
  if (audio.currentTime === audio.duration) {
    btnPlay.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor"
                  class="bi bi-play-circle-fill mx-2" id="play-icon" viewBox="0 0 16 16">
                  <path
                      d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814z" />
              </svg>`
             
  }
});

btnPlay.addEventListener('click', () => {
  if (audio.paused) {
      audio.play();
      btnPlay.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" class="bi bi-pause-circle-fill" viewBox="0 0 16 16">
                  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M6.25 5C5.56 5 5 5.56 5 6.25v3.5a1.25 1.25 0 1 0 2.5 0v-3.5C7.5 5.56 6.94 5 6.25 5m3.5 0c-.69 0-1.25.56-1.25 1.25v3.5a1.25 1.25 0 1 0 2.5 0v-3.5C11 5.56 10.44 5 9.75 5"/>
                </svg>`
  } else {
      audio.pause();
      btnPlay.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor"
                    class="bi bi-play-circle-fill mx-2" id="play-icon" viewBox="0 0 16 16">
                    <path
                        d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814z" />
                </svg>`
  } 
});

const rightsidebar = function(song_title, artist, artist_cover, album_title){
  
}

const playsong = function (mp3, title, artist, cover, artist_cover, album_title){
  artistPlayed.innerText = artist
  songPlayed.innerText = title
  imgCurrentAlbum.src = cover
  audio.src = mp3
  audio.play()
  btnPlay.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" class="bi bi-pause-circle-fill" viewBox="0 0 16 16">
                  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M6.25 5C5.56 5 5 5.56 5 6.25v3.5a1.25 1.25 0 1 0 2.5 0v-3.5C7.5 5.56 6.94 5 6.25 5m3.5 0c-.69 0-1.25.56-1.25 1.25v3.5a1.25 1.25 0 1 0 2.5 0v-3.5C11 5.56 10.44 5 9.75 5"/>
                </svg>`  
  const songToPlay = new mySong(mp3, title, artist, cover, artist_cover, album_title)
  localStorage.setItem('listened', JSON.stringify(songToPlay))
  rightsidebar(title, artist, cover, artist_cover, album_title)
}


const writetop = function (top) {
  const songs = top.data
  const topList = document.getElementById("top-list");
  topList.innerHTML = "";
  if(top.total === 0)
    topList.innerHTML = `
  <li class='display-1 text-success'> ARTISTA FALLITO </li>`

  for (let j = 0; j < 5; j++) {
    const li = `
        <li class="d-flex align-items-center mb-3 list-group-item border-0" onclick="playsong('${songs[j].preview}', '${songs[j].title}', '${songs[j].artist.name}', '${songs[j].album.cover_big}', '${songs[j].contributors[0].picture_xl}', '${songs[j].album.title}')">
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


document.getElementById("play-icon").addEventListener("click", function () {
  let currentTimeElement = document.getElementById("current-time"); // Elemento per il tempo corrente
  let playerBarFill = document.querySelector(".player-bar-fill"); // Elemento per la parte riempita della barra
  let duration = 30;
  let currentTime = 0;
  let interval = setInterval(function () {
    // Imposta un intervallo che si ripete ogni secondo
    if (currentTime >= duration) {
      // Se il tempo corrente ha raggiunto la durata totale
      clearInterval(interval); // Ferma l'intervallo
      return;
    }
    currentTime++;
    let minutes = Math.floor(currentTime / 60);
    let seconds = currentTime % 60;
    currentTimeElement.textContent =
      minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
    // incremento dei secondi
    playerBarFill.style.width = (currentTime / duration) * 100 + "%";
    // la sbarra si va riempendo in base al tmepo
  }, 1000); // millisecondi tradotti in secondi
});

window.addEventListener("load", function () {
  init();
});
