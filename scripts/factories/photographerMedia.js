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
    media.setAttribute("id", this.id)

    const details = document.createElement("div");
    details.setAttribute("class", "details");

    const mediaContent = this.getMediaContentDOM();
    media.appendChild(mediaContent);

    const mediaTitle = document.createElement("h2");
    mediaTitle.textContent = this.title;

    const blockLikes = document.createElement("p");
    blockLikes.setAttribute("class", "likes");

    const mediaLikes = document.createElement("p");
    mediaLikes.innerHTML = this.likes;

    const heartLikes = document.createElement("i");
    heartLikes.setAttribute("class", "fa-solid fa-heart");

    media.appendChild(details);
    details.appendChild(mediaTitle);
    details.appendChild(blockLikes);

    blockLikes.appendChild(mediaLikes);
    blockLikes.appendChild(heartLikes);

    return media;
  }

  getMediaContentDOM() {
    // Implementé dans les sous-classes
  }
}

class ImageMedia extends Media {
  constructor(data) {
    super(data);
    this.image = `assets/images/${data.image}`;
  }

  getMediaContentDOM() {
    const mediaContent = document.createElement("img");
    mediaContent.setAttribute("src", this.image);
    mediaContent.dataset.id = this.id;
    mediaContent.setAttribute("class", "media-img")
    return mediaContent;
  }
}

class VideoMedia extends Media {
  constructor(data) {
    super(data);
    this.video = `assets/images/${data.video}`;
  }

  getMediaContentDOM() {
    const mediaContent = document.createElement("video");
    mediaContent.setAttribute("src", this.video);
    mediaContent.dataset.id = this.id;
    return mediaContent;
  }
}

function photographerMediaFactory(data) {
  const { photographerId, title, id, image, video, likes } = data;

  if (image) {
    return new ImageMedia(data);
  } else {
    return new VideoMedia(data);
  }
}
