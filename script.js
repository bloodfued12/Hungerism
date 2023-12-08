let menuBtn = document.getElementById("menuBtn")
let sideNav = document.getElementById("sideNav")
let menu = document.getElementById("menu")

sideNav.style.right = "-350px";

menuBtn.onclick = function () {
  if (sideNav.style.right == "-350px") {
    sideNav.style.right = "0";
    menu.src = "images/close.png";
  }
  else {
    sideNav.style.right = "-350px";
    menu.src = "images/menu.png";
  }
}

// ========================  //

////Calling API Suggestic

const apiUrl = 'https://production.suggestic.com/graphql';
const headers = {
  'Content-Type': 'application/json',
  'Authorization': 'Bearer Token e7bdd934c9d30245185fe916e16dfd5c0acc13cc',
  'sg-user': '714cdff4-2b1c-4101-b323-60b9359d99c4'
};

///fleching data

fetch("apiUrl", {
  method: "POST",
  headers: headers,
  body: JSON.stringify({
    query: `
    {
        searchRecipesByIngredients(
          mustIngredients: ["chicken"]
        ) {
          edges {
            node {
              name
              ingredients {
                name
              }
             ingredientLines
            }
          }
        }
      }`,
  }),
})

  .then(response => response.json())
  .then(data => {
    const radmonRecipies = "searchRecipesByIngredients"
  })
  .catch(error => {
    console.error('Error fetching API data:', error);
  });



// ================================================= recipe script//

// Sample recipe data
const recipe1Ingredients = [
  "1 cup cooked chicken, cubed",
  "6 oz pineapple, chopped",
  "1/3 cup halved seedless grapes",
  "2 tbsp mayonnaise",
  "½ tsp curry powder",
  "Fresh cilantro leaves, optional",
  "3 oz whole-grain bread"
];

const recipe2Ingredients = [
  "1 lb ground chicken",
  "3 tbsp olive oil",
  "3 cloves garlic, minced",
  "1 tbsp chili paste",
  "2 tbsp rice vinegar",
  "1 tbsp soy sauce",
  "1 tbsp erythritol",
  "1/2 tsp red pepper flakes",
  "1/4 tsp ground ginger",
  "1/4 tsp black pepper",
  "1/4 tsp sea salt",
  "3 oz lettuce leaves"
];

// Function to create a recipe card
function createRecipeCard(containerId, ingredients) {
  const container = document.querySelector(`.${containerId}`);
  container.innerHTML = ''; // Clear previous content

  const card = document.createElement('div');
  card.className = 'recipe-card';

  const ingredientsList = document.createElement('ul');
  ingredients.forEach(ingredient => {
      const listItem = document.createElement('li');
      listItem.textContent = ingredient;
      ingredientsList.appendChild(listItem);
  });

  card.appendChild(ingredientsList);
  container.appendChild(card);
}

// Function to handle search button click
function handleSearchButtonClick() {
  const searchTerm = document.querySelector('.search-bar').value;

  // Check the search term and update the recipe cards accordingly
  if (searchTerm.toLowerCase() === 'recipe-card') {
      createRecipeCard('recipe', recipe1Ingredients);
  } else if (searchTerm.toLowerCase() === 'recipe-card2') {
      createRecipeCard('recipe2', recipe2Ingredients);
  } else {
      alert('Recipe not found. Please try again.');
  }
}

// Add click event listener to the search button
const searchButton = document.querySelector('.search-bar-main button');
searchButton.addEventListener('click', handleSearchButtonClick);
