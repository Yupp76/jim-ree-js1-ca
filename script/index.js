const apiBaseURL = "https://cat-fact.herokuapp.com/facts/";

const cardsContainer = document.querySelector(".cards__container");

async function fetchCatFacts(url) {
  try {
    let results = await fetch(url);
    let catFacts = await results.json();

    return catFacts;
  } catch (error) {
    console.error(error);
  }
}

function renderCard(_createdAt, _text, _id, _user = false) {
  const cardWrapper = document.createElement("li");
  cardWrapper.className = "card__wrapper";

  const cardCover = document.createElement("div");
  cardCover.className = "card__cover";

  const cardContent = document.createElement("div");
  cardContent.className = "card__content";

  const cardAnchor = document.createElement("a");
  cardAnchor.href = `/details.html?id=${_id}`;

  const createdAt = document.createElement("h4");
  createdAt.innerText = `created at: ${_createdAt.slice(0, 10)}`;

  const text = document.createElement("p");
  text.innerText = _text;

  if (_user !== false) {
    const authorName = document.createElement("h4");
    authorName.innerHTML = `Quoted by: ${_user.name.first} ${_user.name.last}`;

    cardWrapper.classList.add("--details");
    cardCover.style.backgroundImage = `url(${_user.photo})`;

    cardWrapper.appendChild(cardCover);

    cardContent.appendChild(authorName);
    cardContent.appendChild(createdAt);
    cardContent.appendChild(text);

    cardWrapper.appendChild(cardContent);
    cardsContainer.appendChild(cardWrapper);
  } else {
    cardContent.appendChild(createdAt);
    cardContent.appendChild(text);

    cardAnchor.appendChild(cardContent);
    cardWrapper.appendChild(cardAnchor);
    cardsContainer.appendChild(cardWrapper);
  }

}

if (window.location.pathname.includes("index.html")) {
  cardsContainer.innerHTML = "<span>Loading...</span>";

  fetchCatFacts(
    "https://cat-fact.herokuapp.com/facts/random?animal_type=cat&amount=50"
  )
    .then((res) => {
      cardsContainer.innerHTML = "";
      for (let item of res) renderCard(item.createdAt, item.text, item._id);
    })
    .catch((err) => {
      cardsContainer.innerHTML =
        "<span>Something went wrong, please refresh the page!</span>";
    });
} else if (window.location.pathname.includes("details.html")) {
  const queryString = window.location.search;
  const params = new URLSearchParams(queryString);
  const query = params.get("id");

  cardsContainer.innerHTML = "<span>Loading...</span>";

  fetchCatFacts(apiBaseURL + query)
    .then((res) => {
      cardsContainer.innerHTML = "";
      
      renderCard(res.createdAt, res.text, res._id, res.user);
    })
    .catch((err) => {
      console.error(err)
      cardsContainer.innerHTML =
        "<span>Something went wrong, please refresh the page!</span>";
    });
}
