// Mettre le code JavaScript lié à la page photographer.html

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
      clickLightbox(mediaCardDOM.children[0])
    );
    photographersPortfolio.appendChild(mediaCardDOM);
  });

  const lightbox = document.querySelector(".lightbox");
  const lightboxMedia = document.querySelector(".lightboxMedia");
  const lightboxTitle = document.querySelector(".title");

  const clickLightbox = (element) => {
    const lightboxTitleLink = element.nextSibling.firstChild;
    lightboxTitle.textContent = lightboxTitleLink.textContent;
    const mediaLightboxLink = element.src;

    if (mediaLightboxLink.includes(".jpg")) {
      const img = document.createElement("img");
      img.src = mediaLightboxLink;
      img.dataset.id = element.dataset.id;
      lightboxMedia.appendChild(img);
    } else if (mediaLightboxLink.includes(".mp4")) {
      const video = document.createElement("video");
      video.src = mediaLightboxLink;
      video.controls = true;
      video.dataset.id = element.dataset.id;
      lightboxMedia.appendChild(video);
    }
    lightbox.style.display = "flex";
  };

  const previous = () => {
    const lightboxMedia = document.querySelector(".lightboxMedia");
    const lightboxMediaChild = lightboxMedia.firstElementChild;
    const currentMediaId = parseInt(lightboxMediaChild.dataset.id, 10);
    const currentMediaIndex = portfolio.findIndex((element) => element.id === currentMediaId);
    const previousMediaIndex = (currentMediaIndex + portfolio.length - 1) % portfolio.length;
    const previousMedia = portfolio[previousMediaIndex];

    if (previousMedia.image) {
      const newImage = previousMedia.image;
      const picture = `assets/images/${newImage}`;
      const img = document.createElement("img");
      img.src = picture;
      img.dataset.id = previousMedia.id;

      lightboxMedia.innerHTML = "";
      lightboxMedia.appendChild(img);
      lightboxTitle.textContent = previousMedia.title;
    } else if (previousMedia.video) {
      const newVideo = previousMedia.video;
      const movie = `assets/images/${newVideo}`;
      const video = document.createElement("video");
      video.src = movie;
      video.setAttribute("controls", "");
      video.dataset.id = previousMedia.id;

      lightboxMedia.innerHTML = "";
      lightboxMedia.appendChild(video);
      lightboxTitle.textContent = previousMedia.title;
    }
  };

  const next = () => {
    const lightboxMedia = document.querySelector(".lightboxMedia");
    const lightboxMediaChild = lightboxMedia.firstElementChild;

    const result = portfolio.find(
      (element) => element.id === parseInt(lightboxMediaChild.dataset.id, 10)
    );

    let i = portfolio.indexOf(result);

    if (i === portfolio.length - 1) {
      i = -1;
    }
    const nextMedia = portfolio[i + 1];

    if (nextMedia.image) {
      const newImage = nextMedia.image;
      const picture = `assets/images/${newImage}`;
      const img = document.createElement("img");
      img.setAttribute("src", picture);
      img.dataset.id = portfolio[i + 1].id;

      lightboxMedia.innerHTML = "";
      lightboxMedia.appendChild(img);
      lightboxTitle.textContent = nextMedia.title;
    } else if (nextMedia.video) {
      const newVideo = nextMedia.video;
      const movie = `assets/images/${newVideo}`;
      const videoDisplay = document.createElement("video");
      videoDisplay.setAttribute("src", movie);
      videoDisplay.setAttribute("controls", "");
      videoDisplay.dataset.id = portfolio[i + 1].id;

      lightboxMedia.innerHTML = "";
      lightboxMedia.appendChild(videoDisplay);
    }

    lightboxMediaChild =
      document.querySelector(".lightboxMedia").firstElementChild;
  };

  document.getElementById("previous").addEventListener("click", () => {
    previous();
  });

  document.getElementById("next").addEventListener("click", () => {
    next();
  });

  function closeLightbox() {
    lightbox.style.display = "none";
    lightboxMedia.innerHTML = "";
  }

  document.getElementById("close").addEventListener("click", () => {
    closeLightbox();
  });
}

async function init() {
  const { photographers } = await getPhotographers();
  displayData(photographers);
  const { medias } = await getMedias();
  displayMedia(medias);
}

init();
