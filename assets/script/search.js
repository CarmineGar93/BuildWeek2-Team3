const getSearch = function (search) {
    fetch(`https://striveschool-api.herokuapp.com/api/deezer/search?q=${search}}`)
      .then((resp) => {
        if (resp.ok) return resp.json();
        else {
          throw new Error("errore nella chiamata della api");
        }
      })
      .then((data) => {
        console.log(data)
      })
      .catch((err) => {});
  };

// const formHTML = document.getElementById("")
// const oursearch = formHTML.value
// formHTML.addEventListener("submit", function(){
//     getSearch(oursearch)
// })
getSearch("caparezza")