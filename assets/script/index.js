const getRandomSong = function (a_b, list) {
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
        if (data.title) writeAlbum(data, list);
        else writeArtist(data, list);
      }
    })
    .catch((err) => {});
};

const writeAlbum = function (album, list) {
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
    album.tracks.data[0],
    list
  );
  const gennarolist_item = `
  <li class="my-2 fs-6 d-flex align-content-center">
      <img src="${album.cover_small}" class="mx-2 rounded-1" alt="" />
      <p>${album.title} <br/> <small class='text-muted'>Album</small></p>
  </li>`;
list.innerHTML = list.innerHTML + gennarolist_item

};

const writeArtist = function (artist, list) {
  console.log(
    "ALL",
    artist,
    "name",
    artist.name,
    "picture",
    artist.picture_xl,
    list
  );

  const name = artist.name.substring(0, artist.name.indexOf(' ') + 1)

  const gennarolist_item = `
    <li class="my-2 fs-6 d-flex align-content-center">
        <img src="${artist.picture_big}" class="mx-2 rounded-circle" alt="" /> 
      <p>${name} <br/> <small class='text-muted'>Artist</small></p>
    </li>`;
  list.innerHTML = list.innerHTML + gennarolist_item
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

const init = function () {
  const gennaro = document.querySelectorAll("li.my-2");
  const gennarolist = document.querySelector("ul.list-unstyled");
  gennarolist.innerHTML = ''
  for (let loop = 0; loop < gennaro.length; loop++) {
    getRand(gennarolist);
  }
};

window.addEventListener("load", function () {
  init();
});
