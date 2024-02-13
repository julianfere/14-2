function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

function toggleViews(currentView, nextView) {
  return function () {
    console.log(currentView, nextView);
    currentView.style.display = "none";
    nextView.style.display = "block";
  };
}

function warpButton(btn) {
  if (!btn) return;

  let x;
  let y;

  x = getRandomArbitrary(0, window.innerWidth - 100);
  y = getRandomArbitrary(0, window.innerHeight - 100);

  btn.classList.add("absolute");
  btn.style.left = `${x}px`;
  btn.style.top = `${y}px`;
}

function scaleButton(btn, limit = 2) {
  if (!btn) return;

  let scale = btn.getBoundingClientRect().width / btn.offsetWidth;

  scale += 0.3;

  if (scale > limit) scale = limit;

  btn.style.transform = `scale(${scale})`;
}

function createHeart() {
  const hears = [
    "🖤",
    "💜",
    "🩵",
    "💙",
    "💚",
    "❤️",
    "🩷",
    "🧡",
    "💛",
    "❣️",
    "💞",
    "💓",
    "💗",
    "💖",
    "💘",
    "💕",
  ];
  const heart = document.createElement("div");
  heart.classList.add("heart");

  heart.style.left = Math.random() * 100 + "vw";
  heart.style.animationDuration = Math.random() * 2 + 3 + "s";

  heart.innerText = hears[Math.floor(Math.random() * hears.length)];

  document.body.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 5000);
}

window.onload = function () {
  let counter = 0;
  let warp = true;
  const noBtn = document.getElementById("no");
  const yesBtn = document.getElementById("yes");
  const yesView = document.getElementById("yes-view");
  const noView = document.getElementById("no-view");
  const defaultView = document.getElementById("default");

  yesBtn.addEventListener("click", function () {
    toggleViews(defaultView, yesView)();

    setInterval(createHeart, 300);
  });
  noBtn.addEventListener("click", toggleViews(defaultView, noView));

  noBtn.addEventListener("mouseover", () => {
    if (warp) {
      scaleButton(yesBtn);
      warpButton(noBtn);

      counter += 1;
    }

    if (counter >= 4) {
      warp = false;
      noBtn.removeEventListener("click", toggleViews(defaultView, noView));
      noBtn.style.pointerEvents = "none";
      noBtn.classList.add("hinge");

      setTimeout(() => {
        noBtn.style.display = "none";
        yesBtn.classList.add("gelatine");
      }, 2000);
    }
  });
};
