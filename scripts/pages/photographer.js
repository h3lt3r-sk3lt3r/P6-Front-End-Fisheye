//Mettre le code JavaScript lié à la page photographer.html

let photographerData = [];
let photographerMedia = [];

async function getPhotographers() {
  await fetch("./data/photographers.json")
    .then((res) => res.json())
    .then((data) => (photographerData = data.photographers))
    .catch((err) => console.log("Error : " + err));

    return photographerData;
}

async function getMedias() {
  await fetch("./data/photographers.json")
    .then((res) => res.json())
    .then((data) => (photographerMedia = data.media))
    .catch((err) => console.log("Error : " + err));

  return photographerMedia;
}

async function displayData(photographers) {
  const photographersHeader = document.querySelector(".photographer_header");

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const idURL = urlParams.get("id");
  const profile = photographerData.find((e) => e.id == idURL);

  const photographersProfile = photographerProfileFactory(profile);
  const userCardDOM = photographersProfile.getUserCardDOM();
  photographersHeader.appendChild(userCardDOM);
}

async function displayMedia(photographers) {
  const photographersPortfolio = document.querySelector(".photographer_portfolio");

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const idURL = urlParams.get("id");
  const portfolio = photographerMedia.filter((e) => e.photographerId == idURL);

  portfolio.forEach((media) => {
    const photographerMedia = photographerMediaFactory(media);
    const mediaCardDOM = photographerMedia.getMediaCardDOM();
    photographersPortfolio.appendChild(mediaCardDOM);
  })
}

async function init() {
  const { photographers } = await getPhotographers();
  displayData(photographers);
  const { medias } = await getMedias();
  displayMedia(medias);
}

init();
