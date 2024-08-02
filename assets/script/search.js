const audio = document.getElementById("audio");
const btnPlay = document.getElementById("playIcon");
const btnPlay2 = document.getElementById("playIcon2");
const artistPlayed = document.getElementById("artistPlayed");
const artistPlayed2 = document.getElementById("artistPlayed2");
const songPlayed = document.getElementById("songPlayed");
const songPlayed2 = document.getElementById("songPlayed2");
let currentTimeElement = document.getElementById("current-time"); // Elemento per il tempo corrente
let playerBarFill = document.querySelectorAll(".player-bar-fill");
const imgCurrentAlbum = document.getElementById("imgCurrentAlbum");
const imgCurrentAlbum2 = document.getElementById("imgCurrentAlbum2");
const listened = JSON.parse(localStorage.getItem("listened"));

class mySong {
    constructor(_src, _title, _artist, _cover, _artist_cover, _album_title) {
      (this.src = _src), (this.title = _title);
      this.artist = _artist;
      this.cover = _cover;
      this.artist_cover = _artist_cover;
      this.album_title = _album_title;
    }
  }

const rightsidebar = function (
  song_title,
  artist,
  album_cover,
  artist_cover,
  album_title
) {
  const albumtitle = document.getElementById("album-title");
  const imgalbum = document.getElementById("album-cover");
  const songtitle = document.getElementById("song-title");
  const artistname = document.getElementById("artist-name");
  const artistname2 = document.getElementById("artist-2");
  const artistcover = document.getElementById("artist-cover");
  artistcover.setAttribute("src", `${artist_cover}`);
  artistname.innerText = artist;
  artistname2.innerText = artist;
  songtitle.innerText = song_title;
  albumtitle.innerText = album_title;
  imgalbum.setAttribute("src", `${album_cover}`);
};

const populatesong = function () {
  imgCurrentAlbum.src = listened.cover;
  imgCurrentAlbum2.src = listened.cover;
  songPlayed.innerText = listened.title;
  songPlayed2.innerText = listened.title;
  artistPlayed.innerText = listened.artist;
  artistPlayed2.innerText = listened.artist;
  audio.src = listened.src;
  rightsidebar(
    listened.title,
    listened.artist,
    listened.cover,
    listened.artist_cover,
    listened.album_title
  );
};
if (listened) {
  populatesong();
}
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
}
audio.addEventListener("timeupdate", () => {
  const progress = (audio.currentTime / audio.duration) * 100;

  for (let z = 0; z < playerBarFill.length; z++) {
    playerBarFill[z].style.width = `${progress}%`;
  }
  currentTimeElement.textContent = formatTime(audio.currentTime);
  if (audio.currentTime === audio.duration) {
    currentTimeElement.textContent = '0:30'
    btnPlay.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor"
                  class="bi bi-play-circle-fill mx-2" id="play-icon" viewBox="0 0 16 16">
                  <path
                      d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814z" />
              </svg>`
              btnPlay2.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor"
              class="bi bi-play mx-2" viewBox="0 0 16 16">
              <path
                  d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393" />
          </svg>`
  }
});

btnPlay.addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
    btnPlay.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" class="bi bi-pause-circle-fill" viewBox="0 0 16 16">
                  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M6.25 5C5.56 5 5 5.56 5 6.25v3.5a1.25 1.25 0 1 0 2.5 0v-3.5C7.5 5.56 6.94 5 6.25 5m3.5 0c-.69 0-1.25.56-1.25 1.25v3.5a1.25 1.25 0 1 0 2.5 0v-3.5C11 5.56 10.44 5 9.75 5"/>
                </svg>`;
    btnPlay2.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" class="bi bi-pause-fill" viewBox="0 0 16 16">
                            <path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5m5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5"/>
                            </svg>`;
  } else {
    audio.pause();
    btnPlay.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor"
                    class="bi bi-play-circle-fill mx-2" id="play-icon" viewBox="0 0 16 16">
                    <path
                        d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814z" />
                </svg>`;
    btnPlay2.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor"
                    class="bi bi-play mx-2" viewBox="0 0 16 16">
                    <path
                        d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393" />
                        </svg>`;
  }
});

btnPlay2.addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
    btnPlay.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" class="bi bi-pause-circle-fill" viewBox="0 0 16 16">
                  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M6.25 5C5.56 5 5 5.56 5 6.25v3.5a1.25 1.25 0 1 0 2.5 0v-3.5C7.5 5.56 6.94 5 6.25 5m3.5 0c-.69 0-1.25.56-1.25 1.25v3.5a1.25 1.25 0 1 0 2.5 0v-3.5C11 5.56 10.44 5 9.75 5"/>
                </svg>`;
    btnPlay2.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" class="bi bi-pause-fill" viewBox="0 0 16 16">
                            <path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5m5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5"/>
                            </svg>`;
  } else {
    audio.pause();
    btnPlay.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor"
                    class="bi bi-play-circle-fill mx-2" id="play-icon" viewBox="0 0 16 16">
                    <path
                        d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814z" />
                </svg>`;
    btnPlay2.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor"
                    class="bi bi-play mx-2" viewBox="0 0 16 16">
                    <path
                        d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393" />
                        </svg>`;
  }
});

const getSearch = function (search) {
  fetch(`https://striveschool-api.herokuapp.com/api/deezer/search?q=${search}}`)  
    .then((resp) => {
      if (resp.ok) return resp.json();  
      else {
        throw new Error("errore nella chiamata della api");  
      }  
    })  
    .then((data) => {
      console.log(data);  
      createCards(data.data);
    })  
    .catch((err) => {});
};    

const playsong = function (
  mp3,  
  title,
  artist_name,
  album_cover,
  artist_pic,
  album_title
) {
    console.log(mp3,
        title,
        artist_name,
        album_cover,
        artist_pic,
        album_title)
  artistPlayed.innerText = artist_name;      
  artistPlayed2.innerText = artist_name;
  songPlayed.innerText = title;
  songPlayed2.innerText = title;
  imgCurrentAlbum.src = album_cover;
  imgCurrentAlbum2.src = album_cover;
  audio.src = mp3;
  audio.play();
  btnPlay.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" class="bi bi-pause-circle-fill" viewBox="0 0 16 16">
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M6.25 5C5.56 5 5 5.56 5 6.25v3.5a1.25 1.25 0 1 0 2.5 0v-3.5C7.5 5.56 6.94 5 6.25 5m3.5 0c-.69 0-1.25.56-1.25 1.25v3.5a1.25 1.25 0 1 0 2.5 0v-3.5C11 5.56 10.44 5 9.75 5"/>
                  </svg>`;  
  btnPlay2.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" class="bi bi-pause-fill" viewBox="0 0 16 16">                
                  <path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5m5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5"/>
                </svg>`;  
  const songToPlay = new mySong(          
    mp3,  
    title,
    artist_name,
    album_cover,
    artist_pic,
    album_title
  );  
  localStorage.setItem("listened", JSON.stringify(songToPlay));
};  

const createCards = function (datasearch) {
  const ciro = document.getElementById("ciro");  
  ciro.innerHTML = "";
  console.log(datasearch.length);

  for (let i = 0; i < datasearch.length; i++) {
    console.log("ciiiiiaoo");  
    let createdcard = `
         <div class="col-6 col-md-4 col-xl-3">
            <div class="card h-100">
              <img src="${datasearch[i].album.cover_big}" class="card-img-top" alt="albumimg" onclick='playsong("${datasearch[i].preview}", "${datasearch[i].title}", "${datasearch[i].artist.name}",  "${datasearch[i].album.cover_big}", "${datasearch[i].artist.picture_big}", "${datasearch[i].album.title}")'>
              <div class="card-body">
                <h5 class="card-title" onclick='playsong("${datasearch[i].preview}", "${datasearch[i].title}", "${datasearch[i].artist.name}",  "${datasearch[i].album.cover_big}", "${datasearch[i].artist.picture_big}", "${datasearch[i].album.title}")'>${datasearch[i].title}</h5>
                <p class="card-text">
                  <a class="text-decoration-none text-white"
                    href="artisti.html?artistiId=${datasearch[i].artist.id}">${datasearch[i].artist.name} </a> </br>
                    <a class="text-decoration-none text-white"
                      href="album.html?albumId=${datasearch[i].album.id}"><small>${datasearch[i].album.title}</small></a>
                </p>      
              </div>  
            </div>  
          </div>`;  

       

    ciro.innerHTML = ciro.innerHTML + createdcard;
  }  
};  

const formHTML = document.getElementById("search-form");
const btns = document.getElementsByClassName("submit-form");
btnarray = Array.from(btns);

for (let l = 0; l < btnarray.length; l++) {
  btns[l].addEventListener("click", function () {
    const oursearch = document.getElementById("searchInput").value;  
    getSearch(oursearch);
  });  
}  

///inizio lato sinistro e destro

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
      if (data.name && data.nb_album < 3) getRand(list, "artist");
      else {
        if (data.title) writeAlbum(data, list);
        // gli do dati di api e la lista per poi scriverci il list-item
        else writeArtist(data, list);
      }
    })
    .catch((err) => {});
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

const init = function () {
  const gennarolist = document.querySelector("ul.list-unstyled");
  gennarolist.innerHTML = "";
  for (let loop = 0; loop < 4; loop++) {
    getRand(gennarolist); // mi serve da mandare nelle funzioni che scrivono le singole list-item
  }
};

window.addEventListener("load", function () {
  init();
});

formHTML.addEventListener("submit", function (e) {
  e.preventDefault();
  const oursearch = document.getElementById("searchInput").value;
  getSearch(oursearch);
});
