function photographerFactory(data) {
  const { name, portrait, city, country, tagline, price, id } = data;

  const picture = `assets/photographers/${portrait}`;

  function getUserCardDOM() {
    const article = document.createElement("article");

    const link = document.createElement("a");
    link.setAttribute("href", "./photographer.html?id=" + id);

    const userPortrait = document.createElement("img");
    userPortrait.setAttribute("src", picture);

    const userName = document.createElement("h2");
    userName.textContent = name;

    const userLocation = document.createElement("p");
    userLocation.textContent = city + ", " + country;

    const userTagline = document.createElement("p");
    userTagline.textContent = tagline;

    const userPrice = document.createElement("p");
    userPrice.textContent = price + "€/jour";

    article.appendChild(link);
    link.appendChild(userPortrait);
    link.appendChild(userName);
    article.appendChild(userLocation);
    article.appendChild(userTagline);
    article.appendChild(userPrice);

    return article;
  }
  return { name, picture, city, country, tagline, price, getUserCardDOM }
}
