const apiKey = 'YOUR_SPOONACULAR_KEY';
const searchBtn = document.getElementById('search-btn');
const input = document.getElementById('ingredient-input');
const recipesContainer = document.getElementById('recipes');

searchBtn.addEventListener('click', () => {
    const ingredients = input.value.trim();
    if (ingredients) {
        fetchRecipes(ingredients);
    }
});

async function fetchRecipes(ingredients) {
    recipesContainer.innerHTML = '<p>Loading recipes...</p>';

    try {
        const response = await fetch (
            `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${encodeURIComponent(ingredients)}&number=9&apiKey=${apiKey}`
        );
        const data = await response.json();
        displayRecipes(data);
    } catch (error) {
        console.error('Error fetching recipes:', error);
        recipesContainer.innerHTML = '<p>Failed to load recipes. Please try again.</p>'
    }
}

function displayRecipes(recipes) {
    if (recipes.length === 0) {
        recipesContainer.innerHTML = '<p>No recipes found for the given ingredients.</p>';
        return;
    }

    recipesContainer.innerHTML = '';

    recipes.forEach(recipe => {
        const recipeCard = document.createElement('div');
        recipeCard.classList.add('recipe-card');

        recipeCard.innerHTML = `
          <img src="${recipe.image}" alt="${recipe.title}">
          <h3>${recipe.title}</h3>
          <p>Used ingredients: ${recipe.usedIngredientCount}</p>
          <p>Missed ingredients: ${recipe.missedIngredientCount}</p>
          <a href="https://spoonacular.com/recipes/${recipe.title.replace(/ /g, '-')}-${recipe.id}" target="_blank">View Recipe</a>
        `;

        recipesContainer.appendChild(recipeCard);
    });
}
