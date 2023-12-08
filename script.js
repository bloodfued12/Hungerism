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