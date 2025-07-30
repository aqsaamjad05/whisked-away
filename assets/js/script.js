const carousel = document.querySelector(".carousel");
const arrowBtns = document.querySelectorAll(".carousel-wrapper .arrow");
let isDragging = false, startX, startScrollLeft;

// Ensure firstCardWidth is measured *after* cloning logic
let firstCardWidth;
let cardPerView;

window.addEventListener("load", () => {
  const carouselChildren = [...carousel.children].filter(el => el.classList.contains("recipe-card"));

  firstCardWidth = carouselChildren[0].offsetWidth;
  cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

  // Clone last few cards to start
  carouselChildren.slice(-cardPerView).reverse().forEach(card => {
    carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
  });

  // Clone first few cards to end
  carouselChildren.slice(0, cardPerView).forEach(card => {
    carousel.insertAdjacentHTML("beforeend", card.outerHTML);
  });

  // Scroll to first "real" card
  carousel.scrollLeft = firstCardWidth * cardPerView;
});

// Arrow scroll
arrowBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    const direction = btn.id === "left" ? -1 : 1;
    carousel.scrollLeft += firstCardWidth * direction;
  });
});

// Infinite scroll handler
const infiniteScroll = () => {
  if (carousel.scrollLeft === 0) {
    carousel.classList.add("no-transition");
    carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth);
    carousel.classList.remove("no-transition");
  } else if (Math.ceil(carousel.scrollLeft) >= carousel.scrollWidth - carousel.offsetWidth) {
    carousel.classList.add("no-transition");
    carousel.scrollLeft = carousel.offsetWidth;
    carousel.classList.remove("no-transition");
  }
};

carousel.addEventListener("scroll", infiniteScroll);