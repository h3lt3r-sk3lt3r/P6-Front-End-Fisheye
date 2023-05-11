import photographerProfileFactory from "../factories/photographerProfile.js";
import photographerMediaFactory from "../factories/photographerMedia.js"

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

async function displayData() {
  const photographersHeader = document.querySelector(".photographer_header");

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const idURL = urlParams.get("id");
  const profile = photographerData.find((e) => e.id == idURL);

  const photographersProfile = photographerProfileFactory(profile);
  const userCardDOM = photographersProfile.getUserCardDOM();
  photographersHeader.appendChild(userCardDOM);
}

async function displayMedia() {
  const photographersPortfolio = document.querySelector(".photographer_portfolio");

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const idURL = urlParams.get("id");
  const portfolio = photographerMedia.filter((e) => e.photographerId == idURL);

  portfolio.forEach((media) => {
    const photographerMedia = photographerMediaFactory(media);
    const mediaCardDOM = photographerMedia.getMediaCardDOM();
    mediaCardDOM.children[0].addEventListener("click", () =>
      clickLightbox(mediaCardDOM.children[0])
    );
    mediaCardDOM.children[0].addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        clickLightbox(mediaCardDOM.children[0]);
      }
    });
    photographersPortfolio.appendChild(mediaCardDOM);
  });

  const lightbox = document.querySelector(".lightbox");
  const lightboxMedia = document.querySelector(".lightboxMedia");
  const lightboxTitle = document.querySelector(".title");
  const main = document.getElementById("main");

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
    lightbox.setAttribute("aria-hidden", "false");
    lightbox.focus();
    main.style.position = "fixed";
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

  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") {
      previous();
    } else if (e.key === "ArrowRight") {
      next();
    } else if (e.key === "Escape") {
      closeLightbox();
    }
  })

  function closeLightbox() {
    main.style.position = null;
    lightbox.style.display = "none";
    lightboxMedia.innerHTML = "";
  }

  document.getElementById("close").addEventListener("click", () => {
    closeLightbox();
  });

  const hearts = document.querySelectorAll(".fa-heart");

  let totalLikes = 0;
  portfolio.map((element) => {
    totalLikes += element.likes;
    return totalLikes;
  });

  const totalLikesBar = document.querySelector(".totalLikes");
  totalLikesBar.textContent = totalLikes;

  const likeFunction = (element) => {
    const numberLike = element.previousSibling;
    const result = numberLike.classList.toggle("hearts");
    if (result) {
      let number = parseInt(numberLike.textContent);
      numberLike.textContent = number += 1;
      totalLikesBar.textContent = totalLikes += 1;
      element.style.color = "#901C1C";
      totalLikes + 1;
    } else {
      let number = parseInt(numberLike.textContent);
      numberLike.textContent = number -= 1;
      totalLikesBar.textContent = totalLikes -= 1;
      element.style.color = "#DB8876";
      totalLikes - 1;
    }
  };

  hearts.forEach((element) => {
    element.addEventListener("click", () => {
      likeFunction(element);
    });
  });

  hearts.forEach((element) => {
    element.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        likeFunction(element);
      }
    });
  });

  const selected = document.getElementById("selected");
  const popularity = document.getElementById("popularity");
  const date = document.getElementById("date");
  const title = document.getElementById("title");
  const listUl = document.querySelector("#list-ul");
  const list = document.querySelector("#list");
  const arrow = document.querySelector("#list-arrow");

  function toggleNavbar() {
    if (
      !listUl.getAttribute("style") ||
      listUl.getAttribute("style") === "display: none;"
    ) {
      listUl.style.display = "block";
      arrow.classList.add("arrow-move");
      list.setAttribute("aria-expanded", "true");
    } else {
      listUl.style.display = "none";
      list.focus();
      arrow.classList.remove("arrow-move");
      list.setAttribute("aria-expanded", "false");
    }
  }

  list.addEventListener("click", (e) => {
    e.preventDefault();
    toggleNavbar();
  });

  const selectedChoiceHidden = () => {
    if (selected.innerHTML == popularity.innerHTML) {
      popularity.classList.remove("list-li");
      popularity.innerHTML = "";
      popularity.removeAttribute("tabindex", "0");
    } else {
      popularity.innerHTML = "Popularité";
      popularity.classList.add("list-li");
      popularity.setAttribute("tabindex", "0");
    }
    if (selected.innerHTML === date.innerHTML) {
      date.classList.remove("list-li");
      date.innerHTML = "";
      popularity.removeAttribute("tabindex", "0");
    } else {
      date.innerHTML = "Date";
      date.classList.add("list-li");
      popularity.setAttribute("tabindex", "0");
    }
    if (selected.innerHTML === title.innerHTML) {
      title.classList.remove("list-li");
      title.innerHTML = "";
      popularity.removeAttribute("tabindex", "0");
    } else {
      title.innerHTML = "Titre";
      title.classList.add("list-li");
      popularity.setAttribute("tabindex", "0");
    }
  };

  function sortByLike() {
    selected.innerHTML = "Popularité";
    selectedChoiceHidden();
    portfolio.sort((a, b) => b.likes - a.likes);
    portfolio.forEach((media) => {
      const mediaCard = document.getElementById(media.id);
      photographersPortfolio.appendChild(mediaCard);
    });
  }

  popularity.addEventListener("click", () => {
    sortByLike();
  });

  popularity.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      sortByLike();
    }
  });

  function sortByDate() {
    selected.innerHTML = "Date";
    selectedChoiceHidden();
    portfolio.sort((a, b) => new Date(b.date) - new Date(a.date));
    portfolio.forEach((media) => {
      const mediaCard = document.getElementById(media.id);
      photographersPortfolio.appendChild(mediaCard);
    });
  }

  date.addEventListener("click", () => {
    sortByDate();
  });

  date.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      sortByDate();
    }
  });

  function sortByTitle() {
    selected.innerHTML = "Titre";

    selectedChoiceHidden();
    function compare(a, b) {
      if (a.title < b.title) {
        return -1;
      }
      if (a.title > b.title) {
        return 1;
      }
      return 0;
    }
    portfolio.sort(compare);

    portfolio.forEach((media) => {
      const mediaCard = document.getElementById(media.id);
      photographersPortfolio.appendChild(mediaCard);
    });
  }

  title.addEventListener("click", () => {
    sortByTitle();
  });

  title.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      sortByTitle();
    }
  });

  sortByLike();
  selectedChoiceHidden();
}

async function init() {
  const { photographers } = await getPhotographers();
  displayData(photographers);
  const { medias } = await getMedias();
  displayMedia(medias);
}

init();
