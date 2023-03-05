function photographerFactory(data) {
  const { name, portrait, city, country, tagline, price } = data;

  const picture = `assets/photographers/${portrait}`;

  function getUserCardDOM() {
    const article = document.createElement("article");
    const userPortrait = document.createElement("img");
    userPortrait.setAttribute("src", picture);
    const userName = document.createElement("h2");
    const userLocation = document.createElement("p");
    const userTagline = document.createElement("p");
    const userPrice = document.createElement("p");
    userName.textContent = name;
    userLocation.textContent = city + ", " + country;
    userTagline.textContent = tagline;
    userPrice.textContent = price + "€/jour";
    article.appendChild(userPortrait);
    article.appendChild(userName);
    article.appendChild(userLocation);
    article.appendChild(userTagline);
    article.appendChild(userPrice);

    return (article);
  }
  return { name, picture, city, country, tagline, price, getUserCardDOM }
}
