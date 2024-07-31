const getRandomSong = function (a_b, list) {
    const id = randomInt(0, 999999);
    fetch(`https://striveschool-api.herokuapp.com/api/deezer/${a_b}/${id}`)
        .then((resp) => {
            if (resp.ok) return resp.json();
            else {
                getRand();// se la risposta non è ok allora richiama la funzione
                throw new Error("errore nella chiamata della api");
            }
        })
        .then((data) => {
            if (data.error) getRand(); // se l'id cercato non esiste richiama la funzione 
            else {
                if (data.title) writeAlbum(data, list); // gli do dati di api e la lista per poi scriverci il list-item
                else writeArtist(data, list);
            }
        })
        .catch((err) => { 
            alert(err)
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

const init = function () {
    const gennarolist = document.querySelector("ul.list-unstyled");
    gennarolist.innerHTML = "";
    for (let loop = 0; loop < 25; loop++) {
        getRand(gennarolist); // mi serve da mandare nelle funzioni che scrivono le singole list-item
    }
};

window.addEventListener("load", function () {
    init();
});
