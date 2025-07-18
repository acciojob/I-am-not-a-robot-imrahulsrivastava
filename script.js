const imageGrid = document.getElementById("image-grid");
const resetBtn = document.getElementById("reset");
const verifyBtn = document.getElementById("verify");
const message = document.getElementById("para");

const imageUrls = [
  "https://picsum.photos/id/237/200/300",
  "https://picsum.photos/seed/picsum/200/300",
  "https://picsum.photos/200/300?grayscale",
  "https://picsum.photos/id/238/200/300",
  "https://picsum.photos/id/239/200/300",
];

let images = [];
let selectedImages = [];

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function renderImages() {
  imageGrid.innerHTML = "";
  selectedImages = [];

  // Duplicate one image
  const duplicateIndex = Math.floor(Math.random() * imageUrls.length);
  const duplicateImage = imageUrls[duplicateIndex];

  images = shuffle([...imageUrls, duplicateImage]);

  images.forEach((src, index) => {
    const img = document.createElement("img");
    img.src = src;
    img.dataset.index = index;
    img.alt = "verification tile";
    img.addEventListener("click", handleImageClick);
    imageGrid.appendChild(img);
  });
}

function handleImageClick(e) {
  const img = e.target;

  if (selectedImages.includes(img)) return;

  if (selectedImages.length === 2) return;

  img.classList.add("selected");
  selectedImages.push(img);

  if (selectedImages.length > 0) {
    resetBtn.hidden = false;
  }

  if (selectedImages.length === 2) {
    verifyBtn.hidden = false;
  }
}

function resetSelection() {
  selectedImages.forEach((img) => img.classList.remove("selected"));
  selectedImages = [];
  resetBtn.hidden = true;
  verifyBtn.hidden = true;
  message.textContent = "";
}

function verifySelection() {
  if (selectedImages.length !== 2) return;

  const [img1, img2] = selectedImages;

  if (img1.src === img2.src) {
    message.textContent = "You are a human. Congratulations!";
  } else {
    message.textContent =
      "We can't verify you as a human. You selected the non-identical tiles.";
  }

  verifyBtn.hidden = true;
}

resetBtn.addEventListener("click", () => {
  resetSelection();
  renderImages();
});

verifyBtn.addEventListener("click", () => {
  verifySelection();
});

// Initialize
renderImages();
