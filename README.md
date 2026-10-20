# Recall — Flashcard Learning App

A responsive, interactive flashcard website built with HTML, CSS, and JavaScript. Designed as a beginner-friendly project that can be hosted for free with GitHub Pages.

## Features
- Three decks: Python Basics, Web Development, and Study Skills
- Flip cards to reveal answers
- Previous / next navigation
- Shuffle cards
- Mark cards as **Got it** or **Study again**
- Session progress and review counters
- Keyboard controls: left/right arrows to navigate, Space to flip
- Responsive layout for mobile and desktop

## Run locally
1. Download or clone this repository.
2. Open `index.html` in a web browser.

No dependencies, build tools, or API keys are required.

## Publish with GitHub Pages
1. Create a new repository on GitHub, for example `flashcard-learning-app`.
2. Upload `index.html`, `style.css`, `script.js`, and `README.md` to the repository's root.
3. Open **Settings → Pages**.
4. Under the build/deployment section, select **Deploy from a branch**.
5. Choose branch **main** and folder **/(root)**, then save.
6. Wait for GitHub Pages to publish. The site URL will appear on the Pages settings screen.

## Limitations
- Progress is kept in JavaScript memory for the current browser session and resets when the page is refreshed.
- This is a static website, not a Python backend app.
- No login, cross-device sync, or cloud database is included.

## Ideas for a next version
- Save progress using `localStorage`
- Add custom flashcards
- Add search and deck creation
- Add spaced-repetition scheduling
