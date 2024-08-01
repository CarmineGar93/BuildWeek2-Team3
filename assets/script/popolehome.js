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
};

inith();
