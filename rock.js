const searchBtn = document.getElementById("search-btn");

searchBtn.addEventListener("click", () => {
  let getInputTitle = document.getElementById("inputs").value;
  const titleApi = `https://api.lyrics.ovh/suggest/${getInputTitle}`;
  fetch(titleApi)
    .then((response) => response.json())
    .then((json) => displayValue(json));
});

function displayValue(info) {
  console.log(info);
  for (let i = 0; i < 10; i++) {
    removeAllEventListener(`btn${i}`);

    const gets = info.data[i];
    const getTitle = gets.title;
    const getAtristName = gets.artist.name;
    document.getElementById(`Title${i}`).innerText = getTitle;
    document.getElementById(`ArtistName${i}`).innerText = getAtristName;

    showtheLyrics(`btn${i}`, getAtristName, getTitle);
  }
}

function showtheLyrics(id, artistName, titleName) {
  const holds = document.getElementById(id);
  holds.addEventListener("click", function () {
    loadSong(artistName, titleName);
    document.getElementById("show-current-song").innerText = titleName;
    document.getElementById("show-current-artist").innerText = artistName;
  });
}

function loadSong(id1, id2) {
  const fetchUrl = `https://api.lyrics.ovh/v1/${id1}/${id2}`;
  fetch(fetchUrl)
    .then((response) => response.json())
    .then((json) => displayLyrics(json));
}

function displayLyrics(songs) {
  const showLyrics = document.getElementById("lyrics-show");
  const shows = songs.lyrics;

  if (shows) showLyrics.innerText = shows;
  else
    showLyrics.innerText =
      "Unfortunately lyrics wasn't found ! We are working on it.";
}

function removeAllEventListener(element) {
  var old_element = document.getElementById(element);
  var new_element = old_element.cloneNode(true);
  old_element.parentNode.replaceChild(new_element, old_element);
}