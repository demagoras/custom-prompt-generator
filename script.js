// Add button function
function addButton() {
    const categoriesDiv = document.getElementById('categories');

    // Create category div
    const categoryDiv = document.createElement('div');
    categoryDiv.classList.add('category');

    // Create category name input box
    const categoryNameInput = document.createElement('input');
    categoryNameInput.type = 'text';
    categoryNameInput.placeholder = 'Category name (e.g., Genre, Theme)';
    categoryNameInput.classList.add('categoryName');

    // Create options input box
    const categoryOptionsInput = document.createElement('input');
    categoryOptionsInput.type = 'text';
    categoryOptionsInput.placeholder = 'Enter options (comma-separated)';
    categoryOptionsInput.classList.add('categoryOptions');

    // Append inputs to category div and display them
    categoryDiv.appendChild(categoryNameInput);
    categoryDiv.appendChild(categoryOptionsInput);
    categoriesDiv.appendChild(categoryDiv);
}

// Remove button function
function removeButton() {
    const categoriesDiv = document.getElementById('categories');
    const categoryDivs = document.querySelectorAll('.category');

    // Only removes the last category, if there are any
    if (categoryDivs.length > 0) {
        categoriesDiv.removeChild(categoryDivs[categoryDivs.length - 1]);
    }
}

// Generate new prompt button function
function generateButton() {
    const categoryDivs = document.querySelectorAll('.category');
    const outputDiv = document.getElementById('output');
    outputDiv.innerHTML = ""; // Clear previous output

    // Goes through each category and generates a random choice from the options
    categoryDivs.forEach(categoryDiv => {
        const name = categoryDiv.querySelector('.categoryName').value.trim();
        const options = categoryDiv.querySelector('.categoryOptions').value.trim().split(",");

        if (name && options.length > 0) {
            const randomChoice = options[Math.floor(Math.random() * options.length)].trim();
            outputDiv.innerHTML += `<p><strong>${name}:</strong> ${randomChoice}</p>`;
        }
    });
}

/*
 * Checks for duplicate category entries dynamically while the user is typing.
 * An event listener is added to the document that listens for any input event.
 * A debounced function on the checkDuplicates function is called in order to
 * limit the frequency of checks.
*/
function checkDuplicates(event) {
    const categoryInputs = document.querySelectorAll('.categoryName');

    // Reset border coloring for all inputs
    categoryInputs.forEach(input => {
        input.style.border = '';
    });

    // Loop for duplicates comparing each input box to another
    categoryInputs.forEach(input => {
        categoryInputs.forEach(compareInput => {
            if (input !== compareInput
                && input.value.trim() === compareInput.value.trim()
                && input.value.trim() !== '')
                {
                input.style.border = '4px solid red';
                compareInput.style.border = '4px solid red';
            }
        });
    });
}

// Debounce function to limit the frequency of input checks
function debounce(func, delay) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), delay);
    };
}

// Debounce in milliseconds
const debouncedCheckDuplicates = debounce(checkDuplicates, 500);

// Whenever the user inputs something, check for duplicates everywhere
document.addEventListener('input', function (event) {
    if (event.target.classList.contains('categoryName')) {
        debouncedCheckDuplicates(event);
    }
});
