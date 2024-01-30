const cards = document.querySelectorAll(".card");

let catImages = [
  "https://i.ibb.co/Jy4QQzW/FM4-Mcg-Nak-AIpr-p.jpg",
  "https://i.ibb.co/DCW9xDx/FJ-l-Ge-OWUAE1p-JH.jpg",
  "https://i.ibb.co/4FG6Xwz/FMTBac-FX0-AEZc-w.jpg",
  "https://i.ibb.co/pLBMSDX/FKada-J9-XMAIHop-V.png",
  "https://i.ibb.co/6JDRmG6/FNXermi-X0-AAKnxz.jpg",
  "https://i.ibb.co/zFNCz9V/FMz-C4-Lqa-UAE1s-Hj.jpg",
];

let nftImages = [
  "https://lh3.googleusercontent.com/zhFr8-qv3xoWoThql6YOIU78NvvsW9Z53cYLwkqi2d8byQ6ZcbEEi1o-iEggovaKZp-4DGMIpWg0fyFzZIDFiixHqsFbm78dfmsTbw=w286",
  "https://lh3.googleusercontent.com/E0nMzXGostz6Wle6KVS8YLrFo3ZWuKjUahmBOq4LJIR4ovSfVASoNvgnPLJzS81WNu4iQ8hySloTat9GzsEHypSrEaoQbpJRMTaPTA=w286",
  "https://lh3.googleusercontent.com/EE4wtZaiUGD01e9O1S34q403G9zlJ4ByPspsTFn5G85yx0iwWbv3fGRbfqMs2yorB3OjFqKvTL6rTtP3mkrOSVRixYvhyAlV3ikBRQ=w286",
  "https://lh3.googleusercontent.com/dM68UVc9Q81h35JokSsZpzYd4jkT_Ua4uMXFQLk9AQK7MJccMIOYULKXPdU7gUB8Ew3TxCb0B3XXyrrKkkp4dcIbQjWhfVxP_LyFuA4=w286",
  "https://lh3.googleusercontent.com/uGgb-oxSPVMfA24ABajQKpqe_dZ_iBb003tuJpOB6QeqdjwiEK-Z0eIOcy-3a0WPYWtx6yIXGJrLsrht7h6tWWf7yu6f6vh1gjH9=w286",
  "https://lh3.googleusercontent.com/v0e7115wfTJDOaVkBNibxWn0_pS4HuNl00pzFpXzFyzA7MeZcJrMIaldNgIvyWXTUngYHOW9hCBojk5x-8rz3LWaIw-_ZkDDia8vKgw=w286",
];

let animeImages = [
  "https://i.pinimg.com/originals/15/2c/86/152c86196f4b6e5e4a6b501fa542f2a5.png",
  "http://i64.servimg.com/u/f64/14/74/94/27/12472610.jpg",
  "https://i.pinimg.com/736x/fd/67/07/fd6707fd4f0eef932ffb4024842d9874.jpg",
  "https://w0.peakpx.com/wallpaper/745/905/HD-wallpaper-ken-kaneki-art-tokyo-ghoul-anime.jpg",
  "https://media.comicbook.com/2021/01/one-piece-wano-luffy-cosplay-1252700.jpeg?auto=webp&width=1200&height=627&crop=1200:627,smart",
  "https://discoverdiary.com/wp-content/uploads/2018/05/maxresdefault-38.jpg",
];

let foodImages = [
  "https://i.ibb.co/vj5qFrV/gd-Donuts-Choco-mars2020.jpg",
  "https://bluewebs.gr/wp-content/uploads/2021/09/disease-resistant-banana_opengraph.jpg",
  "https://hr-infos.fr/wp-content/uploads/2020/02/BOMBA-SEXY_200K-Copie.jpg",
  "https://img.cuisineaz.com/660x660/2015/01/21/i73339-merveilleux.jpg",
  "https://img.cuisineaz.com/660x660/2018/12/30/i145407-ramen-au-poulet.jpeg",
  "https://img-3.journaldesfemmes.fr/r19xN3J12nIEOlRLgSpnwv0YRq8=/1500x/smart/07e886f7245740e588e429ef10d260aa/ccmcms-jdf/28567079.jpg",
];

let hasFlippedCard = false;
let lockBoard = false;
let firstClick = false;
let count = 0;
let firstCard, secondCard;

function flipCard() {
  if (!firstClick) {
    firstClick = true;
    document.querySelector("#reset").style.display = "block";
  }
  if (lockBoard) {
    return;
  }
  if (this === firstCard) {
    return;
  }

  this.classList.toggle("flip");

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
  } else {
    secondCard = this;
    count++;
    counter();
    checkForMatch();
  }
}

function checkForMatch() {
  let isMatch = firstCard.dataset.card === secondCard.dataset.card;
  isMatch ? disableCards() : unflipCards();
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");

    resetBoard();
  }, 1500);
}

function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);

  resetBoard();
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

function reset() {
  [hasFlippedCard, lockBoard, firstClick] = [false, false, false];
  [firstCard, secondCard] = [null, null];
  count = 0;
  document.querySelector("#counter").textContent = `${count} moves`;
  cards.forEach((card) => card.classList.remove("flip"));
  document.querySelector("#reset").style.display = "none";
  cards.forEach((card) => card.removeEventListener("click", flipCard));
  document.querySelector("#cat").disabled = true;
  document.querySelector("#nft").disabled = true;
  setTimeout(() => {
    document.querySelector("#cat").disabled = false;
    document.querySelector("#nft").disabled = false;
    shuffle();
    cards.forEach((card) => card.addEventListener("click", flipCard));
  }, 1500);
}

function shuffle() {
  cards.forEach((card) => {
    let randomPosition = Math.floor(Math.random() * 12);
    card.style.order = randomPosition;
  });
}

function setCardsImages(images) {
  reset();

  setTimeout(() => {
    cards.forEach((card) => {
      if (card.dataset.card == 1) {
        card.querySelector(
          ".front"
        ).style.backgroundImage = `url(${images[0]})`;
      } else if (card.dataset.card == 2) {
        card.querySelector(
          ".front"
        ).style.backgroundImage = `url(${images[1]})`;
      } else if (card.dataset.card == 3) {
        card.querySelector(
          ".front"
        ).style.backgroundImage = `url(${images[2]})`;
      } else if (card.dataset.card == 4) {
        card.querySelector(
          ".front"
        ).style.backgroundImage = `url(${images[3]})`;
      } else if (card.dataset.card == 5) {
        card.querySelector(
          ".front"
        ).style.backgroundImage = `url(${images[4]})`;
      } else if (card.dataset.card == 6) {
        card.querySelector(
          ".front"
        ).style.backgroundImage = `url(${images[5]})`;
      }
    });
  }, 1500);
}

function counter() {
  document.querySelector("#counter").textContent = `${count} moves`;
}

setCardsImages(catImages);
cards.forEach((card) => card.addEventListener("click", flipCard));
document.querySelector("#reset").addEventListener("click", reset);
document.querySelector("#cat").addEventListener("click", function () {
  setCardsImages(catImages);
});
document.querySelector("#nft").addEventListener("click", function () {
  setCardsImages(nftImages);
});
document.querySelector("#anime").addEventListener("click", function () {
  setCardsImages(animeImages);
});
document.querySelector("#food").addEventListener("click", function () {
  setCardsImages(foodImages);
});
