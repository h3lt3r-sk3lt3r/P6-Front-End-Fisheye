function photographerProfileFactory(data) {
  const { name, portrait, city, country, tagline, price } = data;

  const picture = `assets/photographers/${portrait}`;

  function getUserCardDOM() {
    infos = document.createElement("div");
    infos.setAttribute("class", "infos")
    div = document.createElement("div");

    const userName = document.createElement("h2");
    userName.textContent = name;

    const userLocation = document.createElement("p");
    userLocation.textContent = city + ", " + country;

    const userTagline = document.createElement("p");
    userTagline.textContent = tagline;

    const contactButton = document.createElement("button");
    contactButton.textContent = "Contactez-moi";
    contactButton.setAttribute("class", "contact_button");
    contactButton.setAttribute("onclick", "displayModal()")

    const userPortrait = document.createElement("img");
    userPortrait.setAttribute("src", picture);

    totalLikesBar = document.querySelector(".totalLikes-bar");
    const userPrice = document.querySelector(".price");
    userPrice.textContent = price + "€ / jour";
    totalLikesBar.appendChild(userPrice);

    infos.appendChild(div);
    div.appendChild(userName);
    div.appendChild(userLocation);
    div.appendChild(userTagline);
    infos.appendChild(contactButton);
    infos.appendChild(userPortrait);

    const contact = document.getElementById("contact_me");
    contact.innerHTML = "Contactez-moi<br>" + name;

    return infos;
  }
  return { name, picture, city, country, tagline, price, getUserCardDOM }
}
