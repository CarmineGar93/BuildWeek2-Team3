const addressBarParameters = new URLSearchParams(location.search)
const albumID = addressBarParameters.get('albumId')

const playsong = function (mp3) {
  console.log(mp3)
  const song = new Audio(`${mp3}`)
  song.play()
}

const getAlbum = function () {
  fetch(`https://striveschool-api.herokuapp.com/api/deezer/album/${albumID}`)
    .then((resp) => {
      console.log(resp)
      if (resp.ok) return resp.json()
      else throw new Error('errore nella chiamata della api')
    })
    .then((data) => {
      console.log(data)
      getartistinfo(data)
      getalbuminfo(data)
      getsong(data)
      genDynamicBg()
    })
    .catch((err) => {
      console.log('Error', err)
    })
}

const getartistinfo = function (album) {
  const artistImg = document.getElementById('artist-photo')
  const artistname = document.getElementById('artist-name')
  artistImg.setAttribute('src', `${album.contributors[0].picture}`)
  artistname.innerText = album.contributors[0].name
}

const getalbuminfo = function (album) {
  const albumimg = document.getElementById('album-cover')
  const albumtitle = document.getElementById('album-title')
  const albumyear = document.getElementById('album-year')
  const albumtracks = document.getElementById('n-of-songs')
  const albumduration = document.getElementById('album-duration')
  albumimg.setAttribute('src', `${album.cover_medium}`)
  albumtitle.innerText = album.title
  albumyear.innerText = album.release_date.slice(0, 4)
  albumtracks.innerText = album.nb_tracks
  const hourdur = Math.floor(album.duration / 60)
  const mindur = album.duration - hourdur * 60
  albumduration.innerText = `${hourdur} ore e ${mindur} minutes`
}

const getsong = function (album) {
  const artist = album.contributors[0].name
  album.tracks.data.forEach((track) => {
    console.log(track)
    const createdli = `        
        <li class="list-group-item d-flex justify-content-between align-items-start bg-black border-0">
          <div class="ms-2 me-auto" onclick="playsong('${track.preview}')">
            <div class="fw-bold">${track.title}</div>
            <small class="text-muted">${artist}</small>
          </div> 
        </li>`

    const songlist = document.getElementById('song-list')
    songlist.innerHTML = songlist.innerHTML + createdli
  })
}

// rendo dinamico il bg di album con la libreria color thief

const genDynamicBg = function () {
  const albumimg = document.getElementById('album-cover')

  const colorThief = new ColorThief()

  const dominantColor = colorThief.getColor(albumimg)

  document.documentElement.style.setProperty(
    '--primary-color',
    `rgb(${dominantColor[0]}, ${dominantColor[1]}, ${dominantColor[2]})`)
}

const init = function () {
  getAlbum()
  genDynamicBg()
}

window.addEventListener('load', function () {
  init()
})
