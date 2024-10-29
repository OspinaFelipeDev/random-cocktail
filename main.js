const URL = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';

document.getElementById('new-cocktail-button').addEventListener('click', fetchRandomCocktail);

function fetchRandomCocktail() {
    fetch(URL)
        .then(response => response.json())
        .then(data => {
            const cocktail = data.drinks[0];
            const cocktailImage = cocktail.strDrinkThumb;
            const cocktailName = cocktail.strDrink;
            const cocktailInstructions = cocktail.strInstructions; // Obtener instrucciones

            const img = document.getElementById('cocktail-image');
            const name = document.getElementById('cocktail-name');
            const instructions = document.getElementById('cocktail-instructions');
            const ingredientsList = document.getElementById('cocktail-ingredients');
            
            // Actualizar imagen y nombre
            img.src = cocktailImage;
            img.alt = cocktailName;
            name.textContent = cocktailName;

            // Limpiar lista de ingredientes antes de agregar nuevos
            ingredientsList.innerHTML = '';

            // Recorrer y agregar ingredientes a la lista
            for (let i = 1; i <= 15; i++) {
                const ingredient = cocktail[`strIngredient${i}`];
                const measure = cocktail[`strMeasure${i}`];
                
                if (ingredient) {
                    const li = document.createElement('li');
                    li.textContent = `${measure ? measure : ''} ${ingredient}`;
                    ingredientsList.appendChild(li);
                }
            }

            // Mostrar las instrucciones
            instructions.textContent = cocktailInstructions;
        })
        .catch(error => console.error('Error fetching the random cocktail:', error));
}

// Fetch a random cocktail image when the page loads
fetchRandomCocktail();
