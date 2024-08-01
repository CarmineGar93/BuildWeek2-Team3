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

        const bannerhtml = document.getElementById("banner")

        banner = `
        <div class="banner-img">
          <img src="${album.cover_xl}" alt="album" class="img-fluid" />
        </div>
        <div class="d-flex flex-column justify-content-center gap-2">
          <a class="h4 text-decoration-none text-white mb-1" href="album.html?albumId=${album.id}"><h6>${album.title}</h6></a>
          <a id="banner-artist" type="button" class="mb-3 text-decoration-none text-white" href="artisti.html?artistiId=${album.artist.id}">${album.artist.name}</a>
          <div class="d-flex gap-4 align-items-center mt-3">
            <a class="text-decoration-none text-white mb-1" href="album.html?albumId=${album.id}">
            <button id="banner-play" class="btn btn-success rounded-pill text-dark">
            Play
            </button></a>
            <button class="btn btn-outline-light rounded-pill">
              Save
            </button>
            <div>
              <svg data-encore-id="icon" role="img" aria-hidden="true" viewBox="0 0 16 16"
                class="Svg-sc-ytk21e-0 dYnaPI" width="17" height="17" fill="#A7A7A7">
              <path
                d="M3 8a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm6.5 0a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zM16 8a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z">
              </path>
              </svg>
            </div>
          </div>
          </div>`;
      
          bannerhtml.innerHTML = banner

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
