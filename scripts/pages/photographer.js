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
    mediaCardDOM.addEventListener("click", () =>
      showLightbox(mediaCardDOM.children[0])
    );
    photographersPortfolio.appendChild(mediaCardDOM);
  })
}

// Fonction utilitaire pour créer une image ou une vidéo
const createMediaElement = (type, src, id) => {
  const media = document.createElement(type);
  media.setAttribute("src", src);
  media.setAttribute("controls", type === "video" ? "" : null);
  media.dataset.id = id;
  return media;
};

// Récupérer les éléments DOM
const lightbox = document.querySelector(".lightbox");
const lightboxMedia = document.querySelector(".lightboxMedia");
const lightboxTitle = document.querySelector(".title");
const prevButton = document.getElementById("previous");
const nextButton = document.getElementById("next");
const closeButton = document.getElementById("close");

// Fonction pour afficher la lightbox
const showLightbox = (element) => {
  const lightboxTitleLink = element.nextSibling.firstChild;
  lightboxTitle.textContent = lightboxTitleLink.textContent;

  const mediaLightboxLink = element.src;

  if (mediaLightboxLink.includes(".jpg")) {
    const img = createMediaElement(
      "img",
      mediaLightboxLink,
      element.dataset.id
    );
    lightboxMedia.appendChild(img);
  }

  if (mediaLightboxLink.includes(".mp4")) {
    const video = createMediaElement(
      "video",
      mediaLightboxLink,
      element.dataset.id
    );
    lightboxMedia.appendChild(video);
  }

  lightbox.style.display = "flex";
};

// Fonction pour afficher le média précédent
const showPreviousMedia = () => {
  const lightboxMediaChild = lightboxMedia.firstElementChild;
  const currentMedia = portfolio.find(
    (element) => element.id === parseInt(lightboxMediaChild.dataset.id, 10)
  );
  const currentIndex = portfolio.indexOf(currentMedia);
  const prevIndex = currentIndex === 0 ? portfolio.length - 1 : currentIndex - 1;
  const prevMedia = portfolio[prevIndex];

  if (prevMedia.image) {
    const picture = `assets/media/${prevMedia.image}`;
    const img = createMediaElement("img", picture, prevMedia.id);
    lightboxMedia.innerHTML = "";
    lightboxMedia.appendChild(img);
    lightboxTitle.textContent = prevMedia.title;
  }

  if (prevMedia.video) {
    const movie = `assets/media/${prevMedia.video}`;
    const videoDisplay = createMediaElement("video", movie, prevMedia.id);
    lightboxMedia.innerHTML = "";
    lightboxMedia.appendChild(videoDisplay);
  }
};

// Fonction pour afficher le média suivant
const showNextMedia = () => {
  const lightboxMediaChild = lightboxMedia.firstElementChild;
  const currentMedia = portfolio.find(
    (element) => element.id === parseInt(lightboxMediaChild.dataset.id, 10)
  );
  const currentIndex = portfolio.indexOf(currentMedia);
  const nextIndex = currentIndex === portfolio.length - 1 ? 0 : currentIndex + 1;
  const nextMedia = portfolio[nextIndex];

  if (nextMedia.image) {
    const picture = `assets/media/${nextMedia.image}`;
    const img = createMediaElement("img", picture, nextMedia.id);
    lightboxMedia.innerHTML = "";
    lightboxMedia.appendChild(img);
    lightboxTitle.textContent = nextMedia.title;
  }

  if (nextMedia.video) {
    const movie = `assets/media/${nextMedia.video}`;
    const videoDisplay = createMediaElement("video", movie, nextMedia.id);
    lightboxMedia.innerHTML = "";
    lightboxMedia.appendChild(videoDisplay);
  }
};

// Écouter les événements de clic
prevButton.addEventListener("click", showPreviousMedia);
nextButton


async function init() {
  const { photographers } = await getPhotographers();
  displayData(photographers);
  const { medias } = await getMedias();
  displayMedia(medias);
}

init();
