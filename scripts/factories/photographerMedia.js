function photographerMediaFactory(data) {
  const { photographerId, title, image, video, likes } = data;

  const picture = `assets/images/${image}`;
  const movie = `assets/images/${video}`;

  function getMediaCardDOM() {
    media = document.createElement("div");
    media.setAttribute("class", "media");

    details = document.createElement("div");
    details.setAttribute("class", "details")

    if (picture) {
      const mediaContent = document.createElement("img");
      mediaContent.setAttribute("src", picture);
    }

    if (movie) {
      const mediaContent = document.createElement("img");
      mediaContent.setAttribute("src", movie);
    }

    const mediaTitle = document.createElement("h2");
    mediaTitle.textContent = title;

    const mediaLikes = document.createElement("p");
    mediaLikes.innerHTML = likes + " <i class='fa-solid fa-heart'></i>";

    media.appendChild(mediaContent);
    media.appendChild(details);
    details.appendChild(mediaTitle);
    details.appendChild(mediaLikes);

    return media;
  }
  return { photographerId, title, image, video, likes, getMediaCardDOM }
}
