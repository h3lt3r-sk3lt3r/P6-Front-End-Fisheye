class Media {
  constructor(data) {
    this.photographerId = data.photographerId;
    this.id = data.id;
    this.title = data.title;
    this.likes = data.likes;
  }

  getMediaCardDOM() {
    const media = document.createElement("div");
    media.setAttribute("class", "media");

    const details = document.createElement("div");
    details.setAttribute("class", "details");

    // const mediaContent = this.getMediaContentDOM();
    // media.appendChild(mediaContent);

    const mediaTitle = document.createElement("h2");
    mediaTitle.textContent = this.title;
    details.appendChild(mediaTitle);

    const mediaLikes = document.createElement("p");
    mediaLikes.innerHTML = this.likes + " <i class='fa-solid fa-heart'></i>";
    details.appendChild(mediaLikes);

    media.appendChild(details);
    //details.appendChild(mediaTitle);
    //details.appendChild(mediaLikes);

    return media;
  }

  //getMediaContentDOM() {
    // Implementé dans les sous-classe
  // }
}

class ImageMedia extends Media {
  constructor(data) {
    super(data);
    this.image = data.image;
  }

  getMediaContentDOM() {
    const media = super.getMediaContentDOM();

    const picture = `assets/images/${this.image}`;
    const img = document.createElement("img");
    img.setAttribute("src", picture);
    img.dataset.id = this.id;
    img.setAttribute("class", "media-img");
    media.appendChild(img);

    return media;
  }
}

class VideoMedia extends Media {
  constructor(data) {
    super(data);
    this.video = data.video;
  }

  getMediaContentDOM() {
    const media = super.getMediaContentDOM();

    const videotape = `assets/images/${this.video}`;
    const photographerVideo = document.createElement("video");
    photographerVideo.setAttribute("src", videotape);
    media.appendChild(photographerVideo);
    photographerVideo.dataset.id = this.id;

    return media;
  }
}

function createPhotographerMedia(data) {
  if (data.image) {
    return new ImageMedia(data);
  } else if (data.video) {
    return new VideoMedia(data);
  }
}

function photographerMediaFactory(data) {
  const media = createPhotographerMedia(data);
  return media;
}
