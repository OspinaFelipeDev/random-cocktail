const URL = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';

document.getElementById('new-cocktail-button').addEventListener('click', fetchRandomCocktail);

function fetchRandomCocktail() {
    fetch(URL)
        .then(response => response.json())
        .then(data => {
            const cocktail = data.drinks[0];
            const cocktailImage = cocktail.strDrinkThumb;
            const cocktailName = cocktail.strDrink;
            const cocktailInstructions = cocktail.strInstructions;

            // Actualizar contenedor principal
            const img = document.getElementById('cocktail-image');
            const name = document.getElementById('cocktail-name');
            const instructions = document.getElementById('cocktail-instructions');
            const ingredientsList = document.getElementById('cocktail-ingredients');

            img.src = cocktailImage;
            img.alt = cocktailName;
            name.textContent = cocktailName;
            ingredientsList.innerHTML = '';

            for (let i = 1; i <= 15; i++) {
                const ingredient = cocktail[`strIngredient${i}`];
                const measure = cocktail[`strMeasure${i}`];

                if (ingredient) {
                    const li = document.createElement('li');
                    li.textContent = `${measure ? measure : ''} ${ingredient}`;
                    ingredientsList.appendChild(li);
                }
            }

            instructions.textContent = cocktailInstructions;

            // Actualizar también el display-desktop
            const desktopImg = document.querySelector('.desktop-image');
            const desktopInstructions = document.querySelector('.desktop-instructions');
            const desktopIngredients = document.querySelector('.desktop-ingredients');

            if (desktopImg && desktopInstructions && desktopIngredients) {
                desktopImg.src = cocktailImage;
                desktopImg.alt = cocktailName;
                desktopInstructions.textContent = cocktailInstructions;

                // Limpiar y agregar ingredientes
                desktopIngredients.innerHTML = '';
                for (let i = 1; i <= 15; i++) {
                    const ingredient = cocktail[`strIngredient${i}`];
                    const measure = cocktail[`strMeasure${i}`];

                    if (ingredient) {
                        const li = document.createElement('li');
                        li.textContent = `${measure ? measure : ''} ${ingredient}`;
                        desktopIngredients.appendChild(li);
                    }
                }
            }
        })
        .catch(error => console.error('Error fetching the random cocktail:', error));
}

fetchRandomCocktail();
