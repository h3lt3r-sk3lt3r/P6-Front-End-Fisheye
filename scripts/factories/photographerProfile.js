function photographerProfileFactory(data) {
  const { name, portrait, city, country, tagline, price } = data;

  const picture = `assets/photographers/${portrait}`;

  function getUserCardDOM() {
    infos = document.querySelector(".photographer_header");
    div = document.createElement("div");

    const userName = document.createElement("h2");
    userName.textContent = name;

    const userLocation = document.createElement("p");
    userLocation.textContent = city + ", " + country;

    const userTagline = document.createElement("p");
    userTagline.textContent = tagline;

    const button = document.createElement("button");
    button.textContent = "Contactez-moi";
    button.setAttribute("class", "contact_button");
    button.setAttribute("onclick", "displayModal()")

    const userPortrait = document.createElement("img");
    userPortrait.setAttribute("src", picture);

    const userPrice = document.createElement("p");
    userPrice.textContent = price + "€/jour";

    infos.appendChild(div);
    div.appendChild(userName);
    div.appendChild(userLocation);
    div.appendChild(userTagline);
    infos.appendChild(button);
    infos.appendChild(userPortrait);

    return infos;
  }
  return { name, picture, city, country, tagline, price, getUserCardDOM }
}
