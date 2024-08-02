const getalbum = function (card) {
  const id = randomInt(0, 999999);
  fetch(`https://striveschool-api.herokuapp.com/api/deezer/album/${id}`)
    .then((resp) => {
      if (resp.ok) return resp.json();
      else {
        getalbum(card); // se la risposta non è ok allora richiama la funzione
        throw new Error("errore nella chiamata della api");
      }
    })
    .then((data) => {
      if (data.error) getalbum(card);
      else writecard(data, card);    
       
    })
    .catch((err) => {});
};

const getArtist = function (section) {
  const id = randomInt(0, 9999);
  fetch(`https://striveschool-api.herokuapp.com/api/deezer/artist/${id}`)
    .then((resp) => {
      if (resp.ok) return resp.json();
      else {
        getArtist(); // se la risposta non è ok allora richiama la funzione
        throw new Error("errore nella chiamata della api");
      }
    })
    .then((data) => {
      if (data.error) getArtist(section);{
      if (data.name && data.nb_album < 3) getArtist(section);
      else writeartistcards(data, section);    
      }
    })
    .catch((err) => {});
};

const writeartistcards = function(artist, day){
  const newCard = `
  <div class="col-12 col-md-6 rounded-3 rounded-3 p-1 col-xl-4 d-none d-md-block">
    <div class="gradient-footer d-flex align-items-center p-0 gap-2 rounded-2">
      <div class="day-img flex-shrink-0">
        <a class="text-decoration-none text-secondary" href="artisti.html?artistiId=${artist.id}">
        <img src="${artist.picture_xl}" alt="" class="rounded-start" /></a>
      </div>
      <div>
        <a class="text-decoration-none text-muted" href="artisti.html?artistiId=${artist.id}">
        <p class="m-0">${artist.name}</p></a>
      </div>
    </div>
  </div> `

  day.innerHTML = day.innerHTML + newCard
}


const writecard = function(album, card){
    const newCard = `
    <img class="card-img-top"
        src="${album.cover_big}"
             alt="album-img" />
        <div class="card-body d-flex flex-column ps-2 artist-title">
            <a class="card-title text-decoration-none h6 line-clamp-1"
            href="album.html?albumId=${album.id}">${album.title}</a>
            <a class="card-title text-decoration-none text-muted h6 line-clamp-1"
            href="artisti.html?artistiId=${album.artist.id}">${album.artist.name}</a>
        </div>`

    card.innerHTML = newCard
}

const inith = function () {
  const album_card = document.getElementsByClassName("card-album");
  const album_cards_array = Array.from(album_card);
  album_cards_array.forEach((card) => {
    getalbum(card);
  });
  const day = document.getElementById("day")
  day.innerHTML = '<h2 class="ps-0 mb-3 d-none d-md-block">Good Evening</h2>'
  for(let f = 0; f < 6; f++){
    getArtist(day)
  }
};

inith();
