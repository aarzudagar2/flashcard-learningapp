const decks = {
  "Python Basics": [
    ["What does print() do in Python?", "It displays output on the screen."],
    ["What is a variable?", "A named reference used to store a value."],
    ["What does input() do?", "It reads input from the user as text."],
    ["Why use int()?", "It converts a compatible value into an integer."],
    ["What does len() return?", "The number of items in an object."],
    ["What does a for loop do?", "It repeats code for items in a sequence or range."],
    ["What is a list?", "An ordered, mutable collection of items."],
    ["What does == check?", "Whether two values are equal."],
    ["What is a function?", "A reusable block of code that performs a task."],
    ["What does import random do?", "It makes Python's random module available."]
  ],
  "Web Development": [
    ["What does HTML define?", "The structure and content of a web page."],
    ["What does CSS control?", "The visual styling and layout of a web page."],
    ["What does JavaScript add?", "Interactivity and dynamic behavior to web pages."],
    ["What is an HTML element?", "A page component defined by tags and content."],
    ["What is a CSS selector?", "A pattern used to target elements for styling."],
    ["What does responsive design mean?", "Layouts adapt to different screen sizes."],
    ["What is the DOM?", "The browser's object model of a document."],
    ["What does Git track?", "Changes to files over time."],
    ["What is GitHub?", "A platform for hosting and collaborating on Git repositories."],
    ["What is GitHub Pages?", "A service that hosts static websites from a repository."]
  ],
  "Study Skills": [
    ["What is active recall?", "Retrieving information from memory without looking at the answer."],
    ["What is spaced repetition?", "Reviewing material at increasing intervals over time."],
    ["Why shuffle flashcards?", "To reduce reliance on memorized card order."],
    ["When should you mark a card 'known'?", "When you can answer correctly without checking."],
    ["What is interleaving?", "Mixing related topics or problem types during practice."],
    ["What is a study session goal?", "A specific, measurable result for one study period."],
    ["Why take short breaks?", "They can help maintain attention during longer study periods."],
    ["What is a knowledge gap?", "A concept or skill you cannot yet explain or apply."],
    ["How should you review missed cards?", "Try them again after studying the correct answer."],
    ["What makes a good flashcard?", "One clear question with a concise, accurate answer."]
  ]
};

const categorySelect = document.querySelector("#category-select");
const flashcard = document.querySelector("#flashcard");
const cardText = document.querySelector("#card-text");
const sideLabel = document.querySelector("#side-label");
const cardIcon = document.querySelector("#card-icon");
const topicLabel = document.querySelector("#topic-label");
const cardCategory = document.querySelector("#card-category");
const cardNumber = document.querySelector("#card-number");
const deckCount = document.querySelector("#deck-count");
const progressText = document.querySelector("#progress-text");
const progressBar = document.querySelector("#progress-bar");
const knownCount = document.querySelector("#known-count");
const againCount = document.querySelector("#again-count");
const remainingCount = document.querySelector("#remaining-count");
const flipBtn = document.querySelector("#flip-btn");

let category = categorySelect.value;
let cards = [...decks[category]];
let index = 0;
let flipped = false;
let ratings = {};

function render() {
  const card = cards[index];
  const key = `${category}:${card[0]}`;
  const answer = flipped;
  cardText.textContent = answer ? card[1] : card[0];
  sideLabel.textContent = answer ? "ANSWER" : "QUESTION";
  cardIcon.textContent = answer ? "✓" : "⌘";
  topicLabel.textContent = category.toUpperCase();
  cardCategory.textContent = category.toUpperCase();
  cardNumber.textContent = `CARD ${String(index + 1).padStart(2, "0")}`;
  deckCount.textContent = `${cards.length} cards`;
  progressText.textContent = `${index + 1} / ${cards.length}`;
  progressBar.style.width = `${((index + 1) / cards.length) * 100}%`;
  flashcard.classList.toggle("is-answer", answer);
  flipBtn.textContent = answer ? "Show question" : "Reveal answer";
  document.querySelectorAll(".rating").forEach(btn => {
    btn.classList.toggle("selected", ratings[key] === btn.dataset.rating);
  });
  updateStats();
}

function updateStats() {
  const currentRatings = cards.map(card => ratings[`${category}:${card[0]}`]);
  const known = currentRatings.filter(value => value === "known").length;
  const again = currentRatings.filter(value => value === "again").length;
  knownCount.textContent = known;
  againCount.textContent = again;
  remainingCount.textContent = cards.length - known;
}

function flip() {
  flipped = !flipped;
  render();
}
function move(step) {
  index = (index + step + cards.length) % cards.length;
  flipped = false;
  render();
}

flashcard.addEventListener("click", flip);
flipBtn.addEventListener("click", flip);
document.querySelector("#prev-btn").addEventListener("click", () => move(-1));
document.querySelector("#next-btn").addEventListener("click", () => move(1));

document.querySelectorAll(".rating").forEach(button => {
  button.addEventListener("click", () => {
    if (!flipped) {
      flipped = true;
      render();
      return;
    }
    const card = cards[index];
    ratings[`${category}:${card[0]}`] = button.dataset.rating;
    if (button.dataset.rating === "known" && cards.length > 1) {
      move(1);
    } else {
      render();
    }
  });
});

categorySelect.addEventListener("change", () => {
  category = categorySelect.value;
  cards = [...decks[category]];
  index = 0;
  flipped = false;
  render();
});

document.querySelector("#shuffle-btn").addEventListener("click", () => {
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }
  index = 0;
  flipped = false;
  render();
});

document.querySelector("#reset-btn").addEventListener("click", () => {
  cards = [...decks[category]];
  index = 0;
  flipped = false;
  ratings = Object.fromEntries(Object.entries(ratings).filter(([key]) => !key.startsWith(`${category}:`)));
  render();
});

document.addEventListener("keydown", event => {
  if (event.key === "ArrowRight") move(1);
  if (event.key === "ArrowLeft") move(-1);
  if (event.key === " " && !["BUTTON", "SELECT"].includes(document.activeElement.tagName)) {
    event.preventDefault();
    flip();
  }
});

render();
