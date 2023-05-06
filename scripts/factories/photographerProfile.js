export default function photographerProfileFactory(data) {
  const { name, portrait, city, country, tagline, price } = data;

  const picture = `assets/photographers/${portrait}`;

  function getUserCardDOM() {
    const infos = document.createElement("div");
    infos.setAttribute("class", "infos")
    const div = document.createElement("div");

    const userName = document.createElement("h1");
    userName.textContent = name;
    userName.setAttribute("tabindex", "0");

    const description = document.createElement("div");
    description.setAttribute("tabindex", "0");

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
    userPortrait.setAttribute("alt", name);
    userPortrait.setAttribute("tabindex", "0");

    const totalLikesBar = document.querySelector(".totalLikes-bar");
    const userPrice = document.querySelector(".price");
    userPrice.textContent = price + "€ / jour";
    totalLikesBar.appendChild(userPrice);

    infos.appendChild(div);
    div.appendChild(userName);
    div.appendChild(description);
    description.appendChild(userLocation);
    description.appendChild(userTagline);
    infos.appendChild(contactButton);
    infos.appendChild(userPortrait);

    const contact = document.getElementById("contact_me");
    contact.innerHTML = "Contactez-moi<br>" + name;

    return infos;
  }
  return { name, picture, city, country, tagline, price, getUserCardDOM }
}
