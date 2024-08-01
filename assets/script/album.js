const addressBarParameters = new URLSearchParams(location.search);
const albumID = addressBarParameters.get("albumId");
const audio = document.getElementById('audio');
const btnPlay = document.getElementById('playIcon');
const artistPlayed = document.getElementById('artistPlayed')
const songPlayed = document.getElementById('songPlayed')
let currentTimeElement = document.getElementById("current-time"); // Elemento per il tempo corrente
let playerBarFill = document.querySelector(".player-bar-fill")
const imgCurrentAlbum = document.getElementById('imgCurrentAlbum')
let srcCurrentAlbum = ''
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}
class mySong {
  constructor(_src, _title, _artist, _cover) {
    this.src = _src,
    this.title = _title
    this.artist = _artist
    this.cover = _cover
  }
}

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


const playsong = function (mp3, title, artist){
  artistPlayed.innerText = artist
  songPlayed.innerText = title
  imgCurrentAlbum.src = srcCurrentAlbum
  audio.src = mp3
  audio.play()
  btnPlay.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" class="bi bi-pause-circle-fill" viewBox="0 0 16 16">
                  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M6.25 5C5.56 5 5 5.56 5 6.25v3.5a1.25 1.25 0 1 0 2.5 0v-3.5C7.5 5.56 6.94 5 6.25 5m3.5 0c-.69 0-1.25.56-1.25 1.25v3.5a1.25 1.25 0 1 0 2.5 0v-3.5C11 5.56 10.44 5 9.75 5"/>
                </svg>`  
  const songToPlay = new mySong(mp3, title, artist, srcCurrentAlbum)
  localStorage.setItem('listened', JSON.stringify(songToPlay))
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
      srcCurrentAlbum = data.cover_small
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
          <div class="ms-2 me-auto" onclick="playsong('${track.preview}', '${track.title}', '${artist}')">
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
