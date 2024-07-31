const getRandomSong = function (a_b) {
  const id = randomInt(0, 999999);
  fetch(`https://striveschool-api.herokuapp.com/api/deezer/${a_b}/${id}`)
    .then((resp) => {
      if (resp.ok) return resp.json();
      else {
        getRand();
        throw new Error("errore nella chiamata della api");
      }
    })
    .then((data) => {
      if (data.error) getRand();
      else {
        if (data.title) writeAlbum(data);
        else writeArtist(data);
      }
    })
    .catch((err) => {
    });
};

const writeAlbum = function (album) {
  const i = randomInt(0, album.tracks.data.lenght);
  console.log(
    "titolo",
    album.title,
    "album cover",
    album.cover_xl,
    "artist name",
    album.artist.name,
    "artist picture",
    album.artist.picture,
    "tracks",
    album.tracks.data[0]
  );
};

const writeArtist = function (artist) {
  console.log("ALL", artist, "name", artist.name, "picture", artist.picture_xl);
};

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
const getRand = function () {
  let A_B = "";
  if (randomInt(0, 1) === 0) A_B = "album";
  else A_B = "artist";
  getRandomSong(A_B);
};

const init = function () {
    for(let loop = 0; loop < 8 ; loop++){
  getRand();
    }
};

window.addEventListener("load", function () {
  init();
});
