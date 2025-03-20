// Lists for subjects, themes, and colors
const subjects = ['cat', 'flower', 'apple', 'chair'];
const themes = ['rainforest', 'steampunk', 'futuristic', 'horror'];
const colors = ['blue', 'red', 'gold', 'lime', 'turquoise', 'violet', 'black'];

function generatePrompt() {
    // Choose item(s) in lists at random
    const subject = subjects[Math.floor(Math.random() * subjects.length)];
    const theme = themes[Math.floor(Math.random() * themes.length)];

    // Shuffle array in a random order, then pick the first three items
    const shuffledColors = colors.sort(() => 0.5 - Math.random());
    const chosenColorPalette = shuffledColors.slice(0, 3);
    const colorPalette = chosenColorPalette.join(', ');

    return { subject, theme, colorPalette };
}

function updateUI() {
    console.log("generatePrompt() output:", generatePrompt()); 
    const { subject, theme, colorPalette } = generatePrompt();

    // Update HTML with new random values
    document.getElementById('subject').textContent = subject;
    document.getElementById('theme').textContent = theme;
    document.getElementById('colorPalette').textContent = colorPalette;
}

document.getElementById('generatorButton').addEventListener('click', updateUI);
